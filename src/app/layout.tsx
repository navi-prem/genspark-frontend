import type { Metadata } from "next";
import "./globals.css";
import { ubu } from "@/libs/fonts";
import { NavBar } from "@/components";

export const metadata: Metadata = {
	title: "TUSK",
	description: "I currently have no idea what to write here [ P.S. SOMEONE FIX THIS ].",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${ubu.variable}`}
			>
				<NavBar />
				{children}
			</body>
		</html>
	);
}
