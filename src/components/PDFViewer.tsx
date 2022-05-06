import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useJobsAPI from '../hooks/useJobsAPI';

interface Props {
  getResumeFromS3(fileName: string): Promise<string | void>;
}

// Fetches resume PDF from s3, creates Object URL for it, then redirects to that URL.
const PDFViewer = (props: Props) => {
  const { resumeFileName } = useParams();
  const [ resumeObjectURL, setResumeObjectURL ] = useState<string>();
  const [ error, setError ] = useState<string>("");
  const anchorRef = useRef<any>();
  
  
  useEffect(() => {
    (async function fetchResumePDF() {
      try {
        const resume = await props.getResumeFromS3(String(resumeFileName));
        if (resume !== undefined && resume !== "") {
          setResumeObjectURL(String(resume));
        } else {
          setError("Error retrieving resume from server");
        }
      } catch(e: unknown) {
        setError("Error retrieving resume from server");
      }
    })()
  }, [])
  
  
  useEffect(() => {
    (function redirectToPDFPage() {
      anchorRef.current?.click();
    })()
  }, [resumeObjectURL])
  
  
  return (error.length > 0
    ? <h3>{error}</h3>
    : <a ref={anchorRef} href={resumeObjectURL} rel="noreferrer">Fetching...</a>
  )
};

export default PDFViewer;