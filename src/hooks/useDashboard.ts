import { API_URL } from '@/libs/utils';
import axios from 'axios';
import { useState, useEffect } from 'react';

const useDashboard = (key: string) => {
  const [data, setData] = useState<{ blob_key: string, name: string, res_key: string | null, status: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { message: { data } } } = await axios.get(API_URL + `getAll?key=${key}`);
      setData(data);
      setLoading(false);
    };

    fetchData();
  });

  return { data, loading };
};

export default useDashboard;
