import React, { useRef } from 'react';
import { setSyntheticLeadingComments } from 'typescript';
import Job from '../models/Job';

interface Props {
  addJob(job: Job): void;
}

class UserInput {
  company: string = '';
  resume: string = '';
  applied: string = '';
  appUrl: string = '';
  reason: string = '';
}


const NewJob = (props: Props) => {

  const userInput = useRef<UserInput>(new UserInput());

  function userInputToJob(userInput: UserInput) {
    const newJob: Job = {
      key: Math.random(),
      company: userInput.company,
      resume: userInput.resume,
      applied: userInput.applied,
      reason: userInput.reason,
      appUrl: userInput.appUrl
    };
    props.addJob(newJob);
  }

  return (
    <>
      {/* <div className="px-4 m-4 bg-orange-500 rounded-2xl">
       <div className="flex justify-start">
         <input type="text" className="input-label" placeholder="Company" onChange={e => userInput.current.company = e.target.value}></input>
         <input type="text" placeholder="Resume" onChange={e => userInput.current.resume = e.target.value}></input>
         <input type="text" placeholder="Applied" onChange={e => userInput.current.applied = e.target.value}></input>
         <input type="text" placeholder="App URL" onChange={e => userInput.current.appUrl = e.target.value}></input>
       </div> */}

      {/* <div className="p-4 m-4 bg-orange-500 rounded-2xl">
        <div className="flex">
          <input type="text" className="w-1/2 h-12" placeholder="Company" onChange={e => userInput.current.company = e.target.value}></input>
          <div className="w-1/2 h-12 bg-gray-500"></div>
        </div>

        <div className="flex mt-4">
          <div className="w-1/3 h-12 bg-gray-400"></div>
          <div className="w-1/3 h-12 bg-gray-500"></div>
          <div className="w-1/3 h-12 bg-gray-400"></div>
        </div>
      </div> */}

      <div className="p-4 m-4 bg-orange-500 rounded-2xl">
        <div className="flex">
          <div className="w-full px-3">
            <label className="block mb-1 text-xs font-bold text-gray-700" htmlFor="company">
              COMPANY
            </label>
            <input className="block w-full px-4 py-2 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white" id="company" type="text" placeholder="Zillow" />
          </div>
          <div className="w-full px-3">
            <label className="block mb-1 text-xs font-bold text-gray-700" htmlFor="applied">
              APPLIED
            </label>
            <input className="block w-full px-4 py-2 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white" id="applied" type="text" placeholder="4/11/2022" />
          </div>
          <div className="w-full px-3">
            <label className="block mb-1 text-xs font-bold text-gray-700" htmlFor="resume">
              RESUME
            </label>
            <input className="block w-full px-4 py-2 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white" id="resume" type="text" placeholder="4.11.2022" />
          </div>
        </div>
        
        <div className="flex mt-3">
          <div className="w-full px-3">
            <label className="block mb-1 text-xs font-bold text-gray-700" htmlFor="app-url">
              APPLICATION URL
            </label>
            <input className="block w-full px-4 py-2 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white" id="app-url" type="text" placeholder="abc.com/jobs" />
          </div>
        </div>
        
        <div className="flex mt-3">
          <div className="w-full px-3">
            <label className="block mb-1 text-xs font-bold text-gray-700" htmlFor="reason-applied">
              REASON APPLIED
            </label>
            <input className="block w-full px-4 py-2 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white" id="reason-applied" type="text" placeholder="Exciting culture, perfect tech stack, healthy work life balance" />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewJob;