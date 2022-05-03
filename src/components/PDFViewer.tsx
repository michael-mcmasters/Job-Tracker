import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useJobsAPI from '../hooks/useJobsAPI';

// Fetches resume from s3 and then redirects to its ObjectURL.
const PDFViewer = (props: any) => {
  const anchorRef = useRef<any>();
  const { resumeFileName } = useParams();
  const { getResumeFromS3 } = useJobsAPI();   // Pass resumeName to getResumeFromS3 to get the specific resume.
  const [ resumeObjectURL, setResumeObjectURL ] = useState<string>();
  
  useEffect(() => {
    async function fetchResume() {
      const resume = await getResumeFromS3();
      setResumeObjectURL(String(resume));
    }
    fetchResume();
  }, [])
  
  useEffect(() => {
    function redirectToPDFPage() {
      anchorRef.current?.click();
    }
    redirectToPDFPage();
  }, [resumeObjectURL])
  
  return (
    <a ref={anchorRef} href={resumeObjectURL} rel="noreferrer">Fetching...</a>
  )
};

export default PDFViewer;