// frontend/components/DataComponent.tsx
import React, { useEffect, useState } from 'react';
import { fetchData, DataType } from '../../../public/fetchData';

const DataComponent: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchData('/api');
        setData(result);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Data List</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name} - {item.location} / {item.date}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataComponent;
