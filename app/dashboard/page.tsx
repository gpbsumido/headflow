'use client'

import CurrentMood from "@/components/CurrentMood";
import DateInputBox from "@/components/DateInputBox";
import { useState } from "react";

export default function Health() {

  const [status,setStatus] = useState<string>("Unset");

  return (
    <div className='h-full w-full'>
      <CurrentMood
        setStatus={setStatus}
      />
      <DateInputBox
        status={status}
        setStatus={setStatus}
      />
    </div>
  )
}
