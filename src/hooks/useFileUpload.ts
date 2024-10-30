import { useState } from 'react';

const useFileUpload = () => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const resetFile = () => {
    setFileName('');
  };

  return { fileName, handleFileChange, resetFile };
};

export default useFileUpload;
