import { Suspense } from "react";

import V0Chat from "@/components/V0Chat";
import { catalogAsCategoryMap, catalogAsFileList } from "@/lib/registry";

export default function Page() {
	return (
		<Suspense fallback={<span>Loading</span>}>
			<V0Chat files={catalogAsFileList()} categories={catalogAsCategoryMap()} />
		</Suspense>
	);
}
