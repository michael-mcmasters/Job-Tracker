import React, { useRef, useState } from 'react';
import Job from '../models/Job';
import { v4 as uuidv4 } from 'uuid';
import useJobsAPI from '../hooks/useJobsAPI';

interface Props {
  addJob(job: Job): void;
}

interface UserInput {
  company: string;
  resume: string;
  applied: string;
  appUrl: string;
  reason: string;
}

const todaysDate = new Date().toISOString().substring(0, 10);

const initialUserInput: UserInput = {
  company: '',
  resume: '',
  applied: todaysDate,
  appUrl: '',
  reason: ''
}


const NewJobForm = (props: Props) => {
  
  const [userInput, setUserInput] = useState<UserInput>(initialUserInput);
  const fileRef = useRef<File>();
  const [returnedFile, setReturnedFile] = useState<any>();
  
  // TODO: Move this to App.tex
  const { jobsArr, fetchJobs, addJob, postResumeToS3, getResumeFromS3 } = useJobsAPI();

  // ToDo: Validate input. If Successful, then submit
  function handleSubmit() {
    props.addJob({
      key: uuidv4(),
      company: userInput.company,
      resume: userInput.resume,
      applied: formatDate(userInput.applied),
      reason: userInput.reason,
      appUrl: userInput.appUrl
    });
    setUserInput(resetUserInput(userInput));
  }
  
  return (
    <>
      {/* <button onClick={getFromS3}>Get Image</button> */}
      {/* <button onClick={() => setReturnedFile(getResumeFromS3)}>Get Image</button> */}
      <button onClick={() => getResumeFromS3().then((res) => setReturnedFile(res))}>Get Image</button>
      <img src={returnedFile} />
      <embed
        src={returnedFile}
        type="application/pdf"
        height="200%"
        width="100%"
      ></embed>
      
      {/* <iframe
        src={returnedFile}
        frameBorder="0"
        scrolling="auto"
        height="100%"
        width="100%"
      ></iframe> */}
      
      <br />
      <input type="file" onChange={(e) => {
        if (!e.target.files) return;
        
        fileRef.current = e.target.files[0];
        // postToS3();
        postResumeToS3(fileRef.current);
        
      }} />
    
      <form className="p-4 m-6 border-2 bg-amber-400 rounded-2xl border-amber-600">
        
        <div className="flex">
          <div className="w-full px-3">
            <label className="block mb-1 text-xs font-bold text-gray-700" htmlFor="company">
              COMPANY
            </label>
            <input className="block w-full px-4 py-2 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white"
              id="company" type="text" placeholder="Zillow" value={userInput.company} onChange={e => {setUserInput({...userInput, company: e.target.value})}} />
          </div>
          <div className="w-full px-3">
            <label className="block mb-1 text-xs font-bold text-gray-700" htmlFor="applied">
              APPLIED
            </label>
            <input className="block w-full px-4 py-2 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white"
              id="applied" type="date" value={userInput.applied} onChange={e => { setUserInput({ ...userInput, applied: e.target.value }) }}/>
          </div>
          <div className="w-full px-3">
            <label className="block mb-1 text-xs font-bold text-gray-700" htmlFor="resume">
              RESUME
            </label>
            <input className="block w-full px-4 py-2 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white"
              id="resume" type="text" placeholder="4.11.2022" value={userInput.resume} onChange={e => { setUserInput({ ...userInput, resume: e.target.value }) }} />
          </div>
        </div>
        
        <div className="flex mt-3">
          <div className="w-full px-3">
            <label className="block mb-1 text-xs font-bold text-gray-700" htmlFor="app-url">
              APPLICATION URL
            </label>
            <input className="block w-full px-4 py-2 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white"
              id="app-url" type="text" placeholder="abc.com/jobs" value={userInput.appUrl} onChange={e => { setUserInput({ ...userInput, appUrl: e.target.value }) }} />
          </div>
        </div>
        
        <div className="flex mt-3">
          <div className="w-full px-3">
            <label className="block mb-1 text-xs font-bold text-gray-700" htmlFor="reason-applied">
              REASON APPLIED
            </label>
            <textarea className="block w-full px-4 py-2 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white"
              id="reason-applied" placeholder="Exciting culture, perfect tech stack, healthy work life balance" value={userInput.reason} onChange={e => { setUserInput({ ...userInput, reason: e.target.value }) }} />
          </div>
        </div>

        <div className="flex mt-3">
          <button onClick={handleSubmit} className="px-8 py-2 mx-auto font-bold text-white bg-blue-500 rounded shadow hover:bg-blue-400 focus:shadow-outline focus:outline-none" type="button">
            Submit
          </button>
        </div>
        
      </form>
    </>
  );
};


// Date comes in formatted as 2022-04-11, this returns it formatted as 4.11.22
function formatDate(date: string): string {
  const dateArr = date.split("-");
  const month = parseInt(dateArr[1]);   // parseInt removes '0' at beginning of string
  const day = parseInt(dateArr[2]);
  const last2DigitsOfYear = dateArr[0].charAt(2) + dateArr[0].charAt(3);
  return `${month}.${day}.${last2DigitsOfYear}`;
}

function resetUserInput(userInput: UserInput): UserInput {
  return {
    ...initialUserInput,
    applied: userInput.applied
  };
}

export default NewJobForm
;