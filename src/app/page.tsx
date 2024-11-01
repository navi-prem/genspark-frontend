export default function Home() {
	return (
		<div className="h-screen">
			<div className="h-1/2 flex flex-col items-center justify-center">
				<div className="text-[500px] font-black">TUSK</div>
			</div>
			<div className="bg-[#3c78d8ff] h-1/2 gap-6 flex flex-col items-center justify-center">
				<div className="hover:underline transition-all ease-in-out text-[50px] italic text-center font-serif w-1/2">&quot; Trusted Utility for Statutory Knowledge &quot;</div>
				<div className="text-[50px] text-center font-serif w-1/2">
					An innovative legal tech solution developed to streamline the compliance verification process for corporate legal documents.
				</div>
			</div>
		</div>
	);
}
