import React, { useEffect, useRef, useState } from 'react';
import Job from '../models/Job';
import { v4 as uuidv4 } from 'uuid';
import useJobsAPI from '../hooks/useJobsAPI';

interface Props {
  addJob(job: Job): void;
  jobsArr: Array<Job>;
}

interface UserInput {
  company: string;
  resume: string;
  applied: string;
  appUrl: string;
  reason: string;
  resumeFile?: File;
}

const todaysDate = new Date().toISOString().substring(0, 10);


// Problem: Can't get value from resume, because resume is named "Michael McMasters Resume", not its date.
// -
// On app load:
// Resume Text field has most recent resume name
// -
// On upload resume
// Resume Text field goes blank
// -
// On submit, get error if you didn't put text in text field.

const NewJobForm = (props: Props) => {
  
  const [userInput, setUserInput] = useState<UserInput>({
    company: '',
    resume: '',
    applied: todaysDate,
    appUrl: '',
    reason: '',
    resumeFile: undefined
  });
  const { postResumeToS3 } = useJobsAPI();
  const fileUploadRef = useRef<any>();
  const [error, setError] = useState<string>("");
  

  useEffect(() => {
    (function setResumeFieldToMostRecentResume() {
      if (userInput.resume.length > 0) return;
      
      setUserInput({
        ...userInput,
        resume: findMostRecentResume(props.jobsArr)
      })
    })()
  }, [props.jobsArr])
  
  
  function handleAttachResume(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const resumeFile = e.target.files[0];
    setUserInput({
      ...userInput,
      resume: '',
      resumeFile: resumeFile
    })
  }

  
  async function handleSubmit() {
    const userAttachedFileAndDidntNameIt = userInput.resumeFile != null && userInput.resume.length == 0;
    if (userAttachedFileAndDidntNameIt) {
      setError("You must enter the resume name before submitting.")
      return;
    }
    
    if (userInput.resumeFile != undefined) {
      try {
        await postResumeToS3(userInput.resumeFile)
        console.log("New resume successfully uploaded");
      } catch(e: unknown) {
        console.error("Failed to upload resume. Error: " + e);
        setError("Failed to upload resume to server")
        throw new Error();
      }
    }
    
    // ToDo: Validate all input. If Successful, then submit
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
      <div className="p-4 m-6 border-2 bg-amber-400 rounded-2xl border-amber-600">
        
        {error && <h5>{error}</h5>}
        
        <div className="flex flex-col md:flex-row">
          <div className="w-full px-3">
            <label className="block mb-1 text-xs font-bold text-gray-700" htmlFor="company">
              COMPANY
            </label>
            <input className="block w-full px-4 py-2 mb-3 text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white"
              id="company" type="text" placeholder="Zillow" value={userInput.company} onChange={e => {setUserInput({...userInput, company: e.target.value})}} />
          </div>
          <div className="w-full px-3">
            <label className="block mb-1 text-xs font-bold text-gray-700" htmlFor="applied">
              APPLIED
            </label>
            <input className="block w-full px-4 py-2 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white"
              id="applied" type="date" value={userInput.applied} onChange={e => { setUserInput({ ...userInput, applied: e.target.value }) }}/>
          </div>
          <div className="flex-auto w-full p-0 px-3">
            <label className="block mb-1 text-xs font-bold text-gray-700" htmlFor="resume">
              RESUME
            </label>
            <div className="">
              {/* <input type="file"> is hidden because it can't be easily styled. Instead a button is shown which presses this input */}
              <input ref={fileUploadRef} type="file" style={{ display: 'none' }} />
              <input className="w-full px-4 py-2 pr-10 text-gray-700 bg-gray-200 border border-r-0 border-red-500 rounded-l appearance-none focus:outline-none focus:bg-white" />
              <button className="absolute p-2 px-4 font-bold text-gray-800 bg-gray-300 border border-l-0 border-yellow-500 rounded-r right-12"
                onClick={() => fileUploadRef.current.click()}>U</button>
            </div>
          </div>
        </div>
        
        <div className="flex mt-3">
          <div className="w-full px-3">
            <label className="block mb-1 text-xs font-bold text-gray-700" htmlFor="app-url">
              APPLICATION URL
            </label>
            <input className="block w-full px-4 py-2 mb-3 text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white"
              id="app-url" type="text" placeholder="abc.com/jobs" value={userInput.appUrl} onChange={e => { setUserInput({ ...userInput, appUrl: e.target.value }) }} />
          </div>
        </div>
        
        <div className="flex mt-3">
          <div className="w-full px-3">
            <label className="block mb-1 text-xs font-bold text-gray-700" htmlFor="reason-applied">
              REASON APPLIED
            </label>
            <textarea className="block w-full px-4 py-2 mb-3 text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white"
              id="reason-applied" placeholder="Exciting culture, perfect tech stack, healthy work life balance" value={userInput.reason} onChange={e => { setUserInput({ ...userInput, reason: e.target.value }) }} />
          </div>
        </div>

        <div className="flex mt-3">
          <button onClick={handleSubmit} className="px-8 py-2 mx-auto font-bold text-white bg-blue-500 rounded shadow hover:bg-blue-400 focus:shadow-outline focus:outline-none" type="button">
            Submit
          </button>
        </div>
        
      </div>
    </>
  );
};


// TODO: FIX - Function doesn't actually return most recent resume.
function findMostRecentResume(jobsArr: Array<Job>): string {
  if (jobsArr.length === 0) return "";

  const resumes: string[] = jobsArr.map(j => j.resume);
  const sortedResumes = resumes.sort((resumeA, resumeB) => {
    if (Number(resumeA) < Number(resumeB)) return 1;
    return -1;
  });
  return sortedResumes[0];
}


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
    company: '',
    resume: userInput.resume,
    applied: userInput.applied,
    appUrl: '',
    reason: '',
    resumeFile: undefined
  }
}


export default NewJobForm;