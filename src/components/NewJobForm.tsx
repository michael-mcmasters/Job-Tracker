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
  resumeFile: File | null;
}

const todaysDate = new Date().toISOString().substring(0, 10);
const initialUserInput: UserInput = {
  company: '',
  resume: '',
  applied: todaysDate,
  appUrl: '',
  reason: '',
  resumeFile: null
}

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
  
  const [userInput, setUserInput] = useState<UserInput>(initialUserInput);
  const { postResumeToS3 } = useJobsAPI();
  

  useEffect(() => {
    if (userInput.resume.length > 0) return;
    
    console.log("u is " + userInput.resume.length);
    setUserInput({
      ...userInput,
      resume: getMostRecentResumeName()
    })
    
  }, [props.jobsArr])
  
  
  // TODO: Function doesn't actually return most recent resume. Fix.
  function getMostRecentResumeName(): string {
    if (props.jobsArr.length === 0) return "";
    
    const resumes: string[] = props.jobsArr.map(j => j.resume);
    const sortedResumes = resumes.sort((resumeA, resumeB) => {
      if (Number(resumeA) < Number(resumeB)) return 1;
      return -1;
    });
    console.log(sortedResumes[0]);
    return sortedResumes[0];
  }
  

  function handleUploadResume(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const resumeFile = e.target.files[0];
    setUserInput({
      ...userInput,
      resume: '',
      resumeFile: resumeFile
    })
    postResumeToS3(resumeFile).then(() => console.log("success"))
  }

  
  function handleSubmit() {
    const userAttachedFileAndDidntNameIt = userInput.resumeFile != null && userInput.resume.length == 0;
    if (userAttachedFileAndDidntNameIt) {
      console.error("You must enter the resume name before submitting.")
      return;
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
              id="resume" type="text" placeholder="" value={userInput.resume} onChange={e => { setUserInput({ ...userInput, resume: e.target.value }) }} />
            <input type="file" onChange={handleUploadResume}/>
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
    resume: userInput.resume,
    applied: userInput.applied
  };
}

export default NewJobForm
;