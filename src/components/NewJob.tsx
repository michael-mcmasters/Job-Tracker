import React, { useRef, useState } from 'react';
import { setSyntheticLeadingComments } from 'typescript';
import Job from '../models/Job';

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


const NewJob = (props: Props) => {
  
  const [appliedDate, setAppliedDate] = useState<string>(new Date().toISOString().substring(0, 10));    // Today's date
  const userInput = useRef<UserInput>({
    company: '',
    resume: '',
    applied: appliedDate,
    appUrl: '',
    reason: ''
  });

  function handleSubmit() {
    // ToDo: Validate input. If Successful, then submit
    const newJob: Job = {
      key: Math.random(),
      company: userInput.current.company,
      resume: userInput.current.resume,
      applied: formatDate(appliedDate),
      reason: userInput.current.reason,
      appUrl: userInput.current.appUrl
    };
    props.addJob(newJob);
  }
  
  // Date comes in fomratted as 2022-04-11, this returns it formatted as 4.11.222
  function formatDate(date: string): string {
    const arr = date.split("-");
    const month = parseInt(arr[1]);   // parseInt removes '0' at beginning of string
    const day = parseInt(arr[2]);
    const last2DigitsOfYear = arr[0].charAt(2) + arr[0].charAt(3);
    return `${month}.${day}.${last2DigitsOfYear}`;
  }
  
  return (
    <>
      <form className="p-4 m-6 border-2 bg-amber-500 rounded-2xl border-amber-600">
        
        <div className="flex">
          <div className="w-full px-3">
            <label className="block mb-1 text-xs font-bold text-gray-700" htmlFor="company">
              COMPANY
            </label>
            <input className="block w-full px-4 py-2 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white"
              id="company" type="text" placeholder="Zillow" onChange={e => userInput.current.company = e.target.value} />
          </div>
          <div className="w-full px-3">
            <label className="block mb-1 text-xs font-bold text-gray-700" htmlFor="applied">
              APPLIED
            </label>
            <input className="block w-full px-4 py-2 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white"
              id="applied" type="date" value={appliedDate} onChange={(e) => setAppliedDate(e.target.value)}/>
          </div>
          <div className="w-full px-3">
            <label className="block mb-1 text-xs font-bold text-gray-700" htmlFor="resume">
              RESUME
            </label>
            <input className="block w-full px-4 py-2 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white"
              id="resume" type="text" placeholder="4.11.2022" onChange={e => userInput.current.resume = e.target.value} />
          </div>
        </div>
        
        <div className="flex mt-3">
          <div className="w-full px-3">
            <label className="block mb-1 text-xs font-bold text-gray-700" htmlFor="app-url">
              APPLICATION URL
            </label>
            <input className="block w-full px-4 py-2 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white"
              id="app-url" type="text" placeholder="abc.com/jobs" onChange={e => userInput.current.appUrl = e.target.value} />
          </div>
        </div>
        
        <div className="flex mt-3">
          <div className="w-full px-3">
            <label className="block mb-1 text-xs font-bold text-gray-700" htmlFor="reason-applied">
              REASON APPLIED
            </label>
            <input className="block w-full px-4 py-2 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white"
              id="reason-applied" type="text" placeholder="Exciting culture, perfect tech stack, healthy work life balance" onChange={e => userInput.current.reason = e.target.value} />
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

export default NewJob;