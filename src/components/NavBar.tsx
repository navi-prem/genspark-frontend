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
				className={`fixed top-0 right-0 h-screen bg-white z-20 ${toggleState ? "w-1/5" : "w-16"} shadow-lg`}
				initial={{ width: toggleState ? "4rem" : "20%" }}
				animate={{ width: toggleState ? "20%" : "4rem" }}
				transition={{ duration: 0.3 }}
			>
				<div className="p-4 cursor-pointer text-black" onClick={handleToggle}>
					{toggleState ? (
						<span className="text-3xl">&#8594;</span>
					) : (
						<span className="text-3xl">&#8592;</span>
					)}
				</div>

				{toggleState && (
					<ul className="text-[75px] gap-10 flex flex-col font-bold text-center mt-10">
						<li className="hover:underline">
							<Link href="/dashboard/kb">KB</Link>
						</li>
						<li className="hover:underline">
							<Link href="/dashboard/rag">RAG</Link>
						</li>
						<li className="hover:underline">
							<Link href="/query">QUERY</Link>
						</li>
						<li className="hover:underline">
							<Link href="/ingest">INGEST</Link>
						</li>
					</ul>
				)}
			</motion.nav>
		</div>
	);
};

export default NavBar;
