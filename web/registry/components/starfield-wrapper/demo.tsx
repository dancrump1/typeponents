import StarfieldWarp from './component';
import React from 'react';
import { IoChevronForward } from "react-icons/io5";


const App = () => {
	return (
		<StarfieldWarp>
			<div
				className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center max-w-[700px] mx-auto px-5 py-10 md:py-0 lg:lg:px-0 text-white">
				<button
					className="py-1.5 pl-5 backdrop-blur-md pr-6 border-gray-600 rounded-full text-[0.9rem] border mb-4">
					✨ Introducing ZenUI v2.3
				</button>

				<h1
					className="text-[2rem] lg:text-[3rem] font-bold leading-[40px] lg:leading-[50px]">
					Open-Source UI Components & Templates Library
				</h1>

				<p
					className="text-white/80 max-w-[700px] mt-3">
					ZenUI Library is an Tailwind CSS components library for any needs. Comes with UI examples &
					blocks,
					templates, Icons, Color Palette and more.
				</p>

				<div
					className="flex items-center flex-col md:flex-row gap-3 justify-center 425px:gap-6 mt-10 md:mt-12">
					<button
						className="bg-[#0FABCA] pl-5 pr-4 border border-[#0FABCA] rounded-lg py-3 flex items-center gap-2 text-[1rem] group"
					>
						Browse Components
						<IoChevronForward className="group-hover:ml-1 transition-all duration-200" />
					</button>
					<button
						className="border-2 border-[#0FABCA] pl-5 pr-4 rounded-lg py-3 flex items-center gap-2 text-[1rem] group">
						Browse Templates
						<IoChevronForward className="group-hover:ml-1 transition-all duration-200" />
					</button>
				</div>
			</div>
		</StarfieldWarp>
	);
};

export default App;
