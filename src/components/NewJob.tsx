import React, { Consumer } from 'react';
import styles from "../styles/NewJob.module.css";

interface Props {
  message: string;
  num: number;
}

const NewJob = (props: Props) => {
  // Will take in a function to add a new job
  
  return (
    <div className={styles.background}>
      <div className="input-container">
        <input type="text" placeholder="Company"></input>
        <input type="text" placeholder="Resume"></input>
        <input type="text" placeholder="Applied"></input>
        <input type="text" placeholder="App URL"></input>
      </div>
      <div>
        <input type="text" className="reason" placeholder="Reason"></input>
      </div>
      <button>Add</button>
    </div>
  );
};

export default NewJob;