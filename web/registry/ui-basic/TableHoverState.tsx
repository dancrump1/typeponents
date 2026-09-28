import React from "react";

export default function TableHoverState() {
	return (
		<>
			{/*<!-- Component: Table with hover state --> */}
			<div className="w-full overflow-x-auto">
				<table
					className="w-full text-left border border-separate rounded border-slate-200"
					cellSpacing="0"
				>
					<tbody>
						<tr>
							<th
								scope="col"
								className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
							>
								Name
							</th>
							<th
								scope="col"
								className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
							>
								Title
							</th>
							<th
								scope="col"
								className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
							>
								Company
							</th>
							<th
								scope="col"
								className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
							>
								Role
							</th>
							<th
								scope="col"
								className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
							>
								Username
							</th>
						</tr>
						<tr className="transition-colors duration-300 hover:bg-slate-50">
							<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
								Ayub Salas
							</td>
							<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
								Designer
							</td>
							<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
								Carroll Group
							</td>
							<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
								Member
							</td>
							<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
								salas_a
							</td>
						</tr>
						<tr className="transition-colors duration-300 hover:bg-slate-50">
							<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
								Agnes Sherman
							</td>
							<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
								Developer
							</td>
							<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
								Apple
							</td>
							<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
								Admin
							</td>
							<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
								shermanagnes
							</td>
						</tr>
						<tr className="transition-colors duration-300 hover:bg-slate-50">
							<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
								Jemma Cummings
							</td>
							<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
								Senior Designer
							</td>
							<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
								20goto10
							</td>
							<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
								Member
							</td>
							<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
								jemmaC
							</td>
						</tr>
						<tr className="transition-colors duration-300 hover:bg-slate-50">
							<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
								Jimi Cardenas
							</td>
							<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
								Copywriter
							</td>
							<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
								Wind-UI
							</td>
							<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
								Owner
							</td>
							<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
								cardenasji
							</td>
						</tr>
						<tr className="transition-colors duration-300 hover:bg-slate-50">
							<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
								Mateusz Tucker
							</td>
							<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
								Project Manager
							</td>
							<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
								Tailwindui
							</td>
							<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
								Member
							</td>
							<td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
								mt
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			{/*<!-- End Table with hover state --> */}
		</>
	);
}
