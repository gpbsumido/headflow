'use client'

import React, { useState } from 'react';

export default function DateInputBox({
  status,
  setStatus
}:{
  status: string,
  setStatus: any
}) {
  
  const [date,setDate] = useState<string>(new Date().toString());

  if (status === 'Unset') return null;

  return(
    <div className='headflow-blue mx-auto p-5 border border-black/50 m-2 w-min whitespace-nowrap rounded-lg shadow-lg flex flex-col gap-y-2'>
      <p className='mx-auto w-min'>When was this?</p>
      <input
        type="datetime-local"
        value={date}
        onChange={(e)=>{
          setDate(e.target.value);
        }}
      />
      <button
        className='px-2 rounded-lg border border-black/50 w-min mx-auto'
        onClick={()=> setStatus("Time Set")}
      >
        Set Time
      </button>
    </div>
  );
}
