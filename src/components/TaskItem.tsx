import React, { useState } from 'react';
import { Task } from "@/libs/types";
import { API_URL } from '@/libs/utils';
import { DocumentSection } from '@/libs/types';
import axios from 'axios';

const TaskItem = ({ task, setResponses }: { task: Task, setResponses: React.Dispatch<React.SetStateAction<DocumentSection[]>> }) => {
  const [isIngesting, setIsIngesting] = useState(false);
  const [hasIngested, setHasIngested] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUrl = async () => {
    if (task.res_key) {
      setIsLoading(true);
      try {
        const { data: resp } = await axios.post(API_URL + 'getRes', {
          res_key: task.res_key
        })
        console.log(JSON.parse(resp.message))
        setResponses(JSON.parse(resp.message))
      } catch (error) {
        console.error('Query error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleIngest = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isIngesting || hasIngested) return;
    setIsIngesting(true);
    try {
      const { data } = await axios.post(API_URL + 'ingest', {
        blob_key: task.blob_key
      });
      console.log(data);
      setHasIngested(true);
    } catch (error) {
      console.error('Ingest error:', error);
    } finally {
      setIsIngesting(false);
    }
  };

  return (
    <>
      <div 
        onClick={handleUrl} 
        className="w-[98%] mx-auto p-6 border-2 border-black rounded-sm flex justify-between items-center bg-white hover:bg-gray-100"
      >
        <span className="text-lg">{task.name}</span>
        {isLoading && (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            <span>Loading...</span>
          </div>
        )}
        {(task.status === 'completed' || task.status === 'pending') && !isLoading && (
          <span className={`text-[25px] ${task.status === 'completed' ? 'text-green-500' : 'text-red-500'}`}>
            {task.status === 'completed' ? 'Completed' : 'Pending'}
          </span>
        )}
        {task.status === 'none' && !isLoading && (
          <button
            onClick={handleIngest}
            disabled={isIngesting || hasIngested}
            className={`px-4 py-2 rounded-md text-white font-medium transition-colors
              ${isIngesting || hasIngested
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-black hover:bg-black-600'
              }`}
          >
            {isIngesting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Ingesting...</span>
              </div>
            ) : hasIngested ? (
              'Ingested'
            ) : (
              'Ingest'
            )}
          </button>
        )}
      </div>
    </>
  );
};

export default TaskItem;
