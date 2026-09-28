import { Suspense } from "react";

import ChatPage from "@/components/ClientChat";
import { catalogAsCategoryMap, catalogAsFileList } from "@/lib/registry";

export default function Page() {
	return (
		<Suspense fallback={<span>Loading</span>}>
			<ChatPage files={catalogAsFileList()} categories={catalogAsCategoryMap()} />
		</Suspense>
	);
}
