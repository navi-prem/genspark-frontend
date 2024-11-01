'use client'

import { DocumentSection, TaskArray } from "@/libs/types";
import TaskItem from "./TaskItem";
import { useState } from 'react';
import { QueryComponent } from '@/components';

const DashboardComponent = ({ data }: { data: TaskArray }) => {
	const [responses, setResponses] = useState<DocumentSection[]>([]);

	const handleReset = () => setResponses([])

	return (
		<main className="relative flex min-h-screen flex-col bg-[#f9fbfa] p-4">
			<h1 className="text-[35px] font-bold mb-4 mx-auto mt-4">PDF's Ingested:</h1>
			<div className="flex flex-col gap-4 my-4 overflow-y-auto">
				{data.map((task, index) => (
					<TaskItem key={index} task={task} setResponses={setResponses} />
				))}
			</div>
			{responses.length > 0 && (
				<QueryComponent responses={responses} handleReset={handleReset} />
			)}
		</main>
	);
}

export default DashboardComponent;
