import React, { useRef } from 'react';
import { setSyntheticLeadingComments } from 'typescript';
import Job from '../models/Job';
import styles from "../styles/NewJob.module.css";

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
    <div className="px-4 m-4 bg-orange-500 rounded-2xl">
      <div className="flex justify-start">
        <input type="text" placeholder="Company" onChange={e => userInput.current.company = e.target.value}></input>
        <input type="text" placeholder="Resume" onChange={e => userInput.current.resume = e.target.value}></input>
        <input type="text" placeholder="Applied" onChange={e => userInput.current.applied = e.target.value}></input>
        <input type="text" placeholder="App URL" onChange={e => userInput.current.appUrl = e.target.value}></input>
      </div>
      <div>
        <input type="text" className="reason" placeholder="Reason" onChange={e => userInput.current.reason = e.target.value}></input>
      </div>
      <button onClick={() => userInputToJob(userInput.current)}>Add</button>
    </div>
  );
};

export default NewJob;