"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const NavBar = () => {
	const [toggleState, setToggleState] = useState(false);

	const handleToggle = () => {
		setToggleState(!toggleState);
	};

	return (
		<div>
			{toggleState && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-10"
					onClick={handleToggle}
				></div>
			)}

			<motion.nav
				className={`fixed top-0 right-0 h-screen bg-white z-20 ${toggleState ? "w-1/5 shadow-lg" : "w-16 bg-opacity-0"}`}
				initial={{ width: toggleState ? "4rem" : "20%" }}
				animate={{ width: toggleState ? "20%" : "4rem" }}
				transition={{ duration: 0.3 }}
			>
				<div className="p-4 cursor-pointer text-black" onClick={handleToggle}>
					{toggleState ? (
						<span className="text-3xl font-bold">☰</span>
					) : (
						<span className="text-3xl font-bold">☰</span>
					)}
				</div>

				{toggleState && (
					<ul className="text-[50px] gap-10 flex flex-col font-bold text-center mt-10">
                        <li className="hover:underline">
                            <Link href="/">HOME</Link>
                        </li>
						<li className="hover:underline">
							<Link href="/ingest">KB UPLOAD</Link>
						</li>
						<li className="hover:underline">
							<Link href="/dashboard/kb">KB INGESTION</Link>
						</li>
						<li className="hover:underline">
							<Link href="/dashboard/rag">VALIDATION DOC UPLOAD</Link>
						</li>
						<li className="hover:underline">
							<Link href="/query">START VALIDATION</Link>
						</li>
					</ul>
				)}
			</motion.nav>
		</div>
	);
};

export default NavBar;
