import React, { useRef, useState } from 'react';
import Job from '../models/Job';
import { v4 as uuidv4 } from 'uuid';

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
  const fileRef = useRef<any>();

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
  
  function postToS3() {
    // const myHeaders = new Headers();
    // myHeaders.append("Content-Type", "text/plain");

    // const requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: JSON.stringify(job)
    // };

    // fetch("https://wlxw76ft60.execute-api.us-east-1.amazonaws.com/prod/job-tracker-resumes/first-file.pdf", requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log("API Result is " + result))
    //   .catch(error => console.log('error', error));
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/pdf");

    var file = fileRef.current;

    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: file
    };
    // redirect: 'follow'

    fetch("https://wlxw76ft60.execute-api.us-east-1.amazonaws.com/prod/job-tracker-resumes/first-file.pdf", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  
  return (
    <>
      <input type="file" onChange={(e) => {
        if (!e.target.files) return;
        
        fileRef.current = e.target.files[0];
        postToS3();
        
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