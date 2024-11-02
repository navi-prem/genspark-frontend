'use client'
import { DashboardComponent } from "@/components";
import useDashboard from "@/hooks/useDashboard";
import { TaskArray } from "@/libs/types";
import { useState, useEffect } from 'react';

const Dashboard = () => {
    const { data, loading }: { data: TaskArray; loading: boolean } = useDashboard('rag');
    const [loader, setLoader] = useState("Loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoader(prev => {
        if (prev.length < 10) {
          return prev + ".";
        }
        return "Loading";
      });
    }, 500);

    return () => clearInterval(interval);
  });

    if (loading) return (
        <main className="relative justify-center flex min-h-screen flex-col bg-[#f9fbfa] p-4">
            <h1 className="text-[35px] font-bold mb-4 mx-auto mt-4">{ loader }</h1>
        </main>
    ); else return <DashboardComponent data={ data }/>;
}

export default Dashboard;
