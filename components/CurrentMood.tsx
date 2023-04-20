'use client'

import React, { useState } from 'react';

export default function CurrentMood({
  setStatus
}:{
  setStatus: any
}) {
  
  const [mood,setMood] = useState<number>(50);

  return(
    <div className='headflow-blue mx-auto p-5 border border-black/50 m-2 w-min whitespace-nowrap rounded-lg shadow-lg flex flex-col gap-y-2'>
      <p>How are you feeling today?</p>
      <div className='flex flex-row gap-x-3'>
        <p>Bad</p>
        <input
          type="range"
          min="0"
          max="100"
          value={mood}
          onChange={(e)=>{
            setMood(Number(e.target.value));
          }}
        />
        <p>Good</p>
      </div>
      <button
        className='px-2 rounded-lg border border-black/50 w-min mx-auto'
        onClick={()=> {
          setStatus("Mood Set");
        }}
      >
        Set Mood
      </button>
    </div>
  );
}
