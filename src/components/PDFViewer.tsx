import React, { useState } from 'react';
import useJobsAPI from '../hooks/useJobsAPI';

const PDFViewer = () => {
  const { getResumeFromS3 } = useJobsAPI();
  const [resume, setResume] = useState<any>();

  async function handleGetResume() {
    const r = await getResumeFromS3();
    console.log(r)
    setResume(r);
  }
  
  return (
    <div>
      hi there
    </div>
  );
};

export default PDFViewer;