import { TopUI, SideUI } from "@/Components/UI";
import "@/styles/globals.css";
import { getToken } from "@/utils/cookies";
import { redirect } from "next/navigation";
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	let accessToken = await getToken("access");
	if (!accessToken) {
		redirect("/register");
	}
	return (
		<>
			<div className="page">
				<TopUI />
				<div className="header-after">
					<SideUI />
					<div className="side-after">
						<div className="feed">{children}</div>
					</div>
				</div>
			</div>
		</>
	);
}
