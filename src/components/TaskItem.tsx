import React from 'react';
import { Task } from "@/libs/types";

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  return (
    <div className="w-[98%] mx-auto p-6 border-2 border-black rounded-sm flex justify-between items-center bg-white">
      <span className="text-lg">{task.title}</span>
      <span className={`text-[25px] ${task.status ? 'text-green-500' : 'text-red-500'}`}>
        {task.status ? 'Completed' : 'Pending'}
      </span>
    </div>
  );
};

export default TaskItem;
