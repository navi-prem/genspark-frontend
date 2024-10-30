import { useState, useEffect } from 'react';

const useDashboard = (url: string) => {
  const [data, setData] = useState<{ title: string; status: boolean }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const fetchData = async () => {
    //   const response = await fetch(url);
    //   const result = await response.json();
    //   setData(result);
    //   setLoading(false);
    // };

    const fetchData = async () => {
      setLoading(true);
      setTimeout(() => {
        const dummyData = [
            { title: "Property Document", status: true },
            { title: "Income Tax Document", status: false },
            { title: "Birth Certificate", status: true },
        ];
        setData(dummyData);
        setLoading(false);
      }, 2000);
    }

    fetchData();
  }, [url]);

  return { data, loading };
};

export default useDashboard;
