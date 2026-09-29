/**
 * Durable work queue for rebuilding the site after a designer imports a
 * component. The Next server publishes. `npm run host` consumes.
 *
 * A failed build is published onto the retry queue, which waits and then
 * dead-letters back onto the work queue. After MAX_ATTEMPTS the job is
 * acknowledged and copied onto the dead-letter queue.
 */
import amqp from "amqplib";

export const RABBITMQ_URL = process.env.RABBITMQ_URL ?? "amqp://127.0.0.1:5672";

export const WORK_EXCHANGE = "site.publish";
export const RETRY_EXCHANGE = "site.publish.retry";
export const DLQ_EXCHANGE = "site.publish.dlq";
export const WORK_QUEUE = "site.publish";
export const RETRY_QUEUE = "site.publish.retry";
export const DLQ = "site.publish.dlq";
export const MAX_ATTEMPTS = 3;
export const RETRY_TTL_MS = 15_000;

export async function assertPublishTopology(channel) {
	await channel.assertExchange(WORK_EXCHANGE, "direct", { durable: true });
	await channel.assertExchange(RETRY_EXCHANGE, "direct", { durable: true });
	await channel.assertExchange(DLQ_EXCHANGE, "direct", { durable: true });

	await channel.assertQueue(WORK_QUEUE, { durable: true });
	await channel.bindQueue(WORK_QUEUE, WORK_EXCHANGE, WORK_QUEUE);

	await channel.assertQueue(RETRY_QUEUE, {
		durable: true,
		arguments: {
			"x-message-ttl": RETRY_TTL_MS,
			"x-dead-letter-exchange": WORK_EXCHANGE,
			"x-dead-letter-routing-key": WORK_QUEUE,
		},
	});
	await channel.bindQueue(RETRY_QUEUE, RETRY_EXCHANGE, RETRY_QUEUE);

	await channel.assertQueue(DLQ, { durable: true });
	await channel.bindQueue(DLQ, DLQ_EXCHANGE, DLQ);
}

export function jobFromMessage(message) {
	let body = {};
	try {
		body = JSON.parse(message.content.toString());
	} catch {
		body = {};
	}
	const attempt = Number(body.attempt);
	return {
		slug: typeof body.slug === "string" ? body.slug : "",
		attempt: Number.isInteger(attempt) && attempt > 0 ? attempt : 1,
	};
}

/** First attempt goes straight to the work queue. Later attempts wait on the retry queue. */
export async function enqueueJob(channel, job) {
	const attempt = job.attempt ?? 1;
	const exchange = attempt === 1 ? WORK_EXCHANGE : RETRY_EXCHANGE;
	const routingKey = attempt === 1 ? WORK_QUEUE : RETRY_QUEUE;
	channel.publish(
		exchange,
		routingKey,
		Buffer.from(JSON.stringify({ slug: job.slug ?? "", attempt })),
		{ persistent: true, contentType: "application/json" }
	);
	if (typeof channel.waitForConfirms === "function") {
		await channel.waitForConfirms();
	}
}

export async function enqueueDeadLetter(channel, job, error) {
	channel.publish(
		DLQ_EXCHANGE,
		DLQ,
		Buffer.from(
			JSON.stringify({
				slug: job.slug ?? "",
				attempt: job.attempt ?? 1,
				error,
			})
		),
		{ persistent: true, contentType: "application/json" }
	);
	if (typeof channel.waitForConfirms === "function") {
		await channel.waitForConfirms();
	}
}

/** Opens a short-lived connection. Used by the Next server after intake. */
export async function publishSiteRebuild(job) {
	const connection = await amqp.connect(RABBITMQ_URL);
	try {
		const channel = await connection.createConfirmChannel();
		await assertPublishTopology(channel);
		await enqueueJob(channel, { slug: job.slug ?? "", attempt: job.attempt ?? 1 });
	} finally {
		await connection.close();
	}
}
