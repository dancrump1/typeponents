"use client";

import { Sidebar, SidebarBody, SidebarLink } from "./component";
import { Home, Settings, User } from "lucide-react";

const links = [
	{ label: "Home", href: "#", icon: <Home className="h-5 w-5" /> },
	{ label: "Profile", href: "#", icon: <User className="h-5 w-5" /> },
	{ label: "Settings", href: "#", icon: <Settings className="h-5 w-5" /> },
];

export default function Usage() {
	return (
		<div className="flex h-[400px] w-full rounded-xl border">
			<Sidebar>
				<SidebarBody className="justify-between gap-10">
					<div className="flex flex-col gap-2">
						{links.map((link) => (
							<SidebarLink key={link.label} link={link} />
						))}
					</div>
				</SidebarBody>
			</Sidebar>
		</div>
	);
}
