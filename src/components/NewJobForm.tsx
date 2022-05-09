import React, { useEffect, useRef, useState } from 'react';
import Job from '../models/Job';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  postJob(job: Job): void;
  postResumeToS3(file: File, fileName: string): Promise<string | void>;
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


const NewJobForm = (props: Props) => {
  
  const [ userInput, setUserInput ] = useState<UserInput>({
    company: '',
    resume: '',
    applied: todaysDate,
    appUrl: '',
    reason: '',
    resumeFile: undefined
  });
  const fileUploadRef = useRef<any>();
  const resumeFieldRef = useRef<any>();
  const [ error, setError ] = useState<string>("");
  

  useEffect(() => {
    (function setResumeField() {
      if (userInput.resume.length !== 0) return;
      
      setUserInput({
        ...userInput,
        resume: findMostRecentResume(props.jobsArr.map(j => j.resume))
      })
    })()
  }, [props.jobsArr])
  
  
  function handleAttachResume(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const resumeFile = e.target.files[0];
    setUserInput({
      ...userInput,
      resume: formatDate(todaysDate),
      resumeFile: resumeFile
    });

    resumeFieldRef.current.focus();
    setTimeout(() => resumeFieldRef.current.select());
  }

  
  async function handleSubmit() {
    if (userInput.company === "" || userInput.applied === "" || userInput.appUrl === "" || userInput.reason === "") {
      setError("You must fill out all fields before submitting.")
      return;
    }
    const didntNameAttachedResume = userInput.resumeFile != null && userInput.resume.length == 0;
    if (didntNameAttachedResume) {
      setError("You must give the resume a name before submitting.")
      return;
    }
    
    if (userInput.resumeFile != undefined) {
      try {
        await props.postResumeToS3(userInput.resumeFile, userInput.resume)
      } catch(e: unknown) {
        setError("Failed to upload resume to server")
        throw new Error();
      }
    }
    
    // ToDo: Validate all input. If Successful, then submit
    props.postJob({
      key: uuidv4(),
      company: userInput.company,
      resume: userInput.resume,
      applied: formatDate(userInput.applied),
      reason: userInput.reason,
      appUrl: userInput.appUrl
    });
    
    setUserInput(resetUserInput(userInput));
    setError("");
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
              <input ref={fileUploadRef} type="file" onChange={handleAttachResume} style={{ display: 'none' }} />
              <input ref={resumeFieldRef} className="w-full px-4 py-2 pr-10 text-gray-700 bg-gray-200 border border-r-0 border-red-500 rounded-l appearance-none focus:outline-none focus:bg-white"
                id="resume" type="text" placeholder="Companies/5.10.22-Amazon" value={userInput.resume} onChange={e => { setUserInput({ ...userInput, resume: e.target.value }) }} />
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


function findMostRecentResume(resumes: Array<string>): string {
  if (resumes.length === 0) return "";

  // Only returns resumes that contain nums and periods (such as 5.28.22).
  const resumeNameIsADate = (resume: string) => {
    for (let char of resume) {
      if (char !== "." && !parseInt(char)) {
        return false;
      }
    }
    return true;
  }
  const greatestToLowest = (resA: string, resB: string) => {
    const toNumber = (r: string) => Number(r.replaceAll(".", ""));
    if (toNumber(resA) < toNumber(resB)) return 1;
    else return -1;
  }

  const sortedResumes = resumes.filter(resumeNameIsADate).sort((greatestToLowest));
  return sortedResumes[0];
}


// Date comes in formatted as 2022-04-11, this returns it formatted as 4.11.22
function formatDate(date: string): string {
  if (!date.includes("-")) return date;
  
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