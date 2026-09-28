"use client";

import DialogForm from "./component";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BadgeCheck, Bug } from "lucide-react";

export default function Usage() {
	return (
		<div className="flex min-h-120 w-full items-center justify-center p-8">
			<DialogForm
				icon={<Bug size={16} />}
				label="Report a Bug"
				successIcon={<BadgeCheck size={40} />}
				successText="Reported Successfully"
				childComponent={
					<div className="flex flex-col gap-3">
						<div className="grid grid-cols-2 gap-3">
							<Input placeholder="Name" className="border-white/10 bg-black" />
							<Input placeholder="Email" className="border-white/10 bg-black" />
						</div>
						<Textarea
							placeholder="Provide details about the issue..."
							className="border-white/10 bg-black"
							rows={5}
						/>
					</div>
				}
				onSubmit={async () => {
					await new Promise((resolve) => setTimeout(resolve, 800));
					return { success: true, message: "Form submitted successfully" };
				}}
			/>
		</div>
	);
}
