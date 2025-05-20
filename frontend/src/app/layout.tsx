import "@/styles/globals.css";
import { getToken } from "@/utils/cookies";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
