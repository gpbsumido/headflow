'use client'

import React, { useState } from 'react';
import axios from 'axios';

export default function GoalItem({
  goal,
  index,
  setItems
}:{
  goal: any,
  index: number,
  setItems: any
}) {

  const [newTaskName,setNewTaskName] = useState<string>('');
  const [selected,setSelected] = useState<boolean>(false);

  async function handleClick() {
    setSelected((prevState) => { return !prevState })
  }

  async function addTask(goalId:string,title:string) {
    const params = {
      title: title,
      goalId: goalId
    };
    axios.post('/api/tasks',{
      params: params
    }).then(response =>{
      setItems((prevState:any) => {
        if (!prevState) return [];
        return prevState.map((goal:any) => {
          if (goal._id !== goalId) return goal;
          let newGoal = goal;
          newGoal.tasks = newGoal.tasks.concat({
            _id: response.data.insertedId,
            title: title
          });
          return newGoal;
        });
      });
    });
  }

  if (selected) {
    return(
      <li
        onClick={handleClick}
      >
        <p>{goal.title ? goal.title : ' - No Title -'}</p>
        <div>
          <ul>
            {
              goal.tasks && goal.tasks.length > 0
                ?
                  goal.tasks.map((task:any, taskIndex:number) => {
                    return(
                      <li
                        className='p-1'
                        key={`${index}_${taskIndex}`}
                      >
                        {task.title}
                      </li>
                    );
                  })
                : null
            }
            <li>
              <div className='flex flex-col gap-x-2'>
                <input
                  onClick={(e)=>{
                    e.stopPropagation()
                  }}
                  className='border border-black px-2 rounded-md'
                  type='text'
                  value={newTaskName}
                  placeholder='New Task Name'
                  onChange={(e)=>{
                    setNewTaskName(e.target.value.trim())
                  }}
                />
                <button
                  onClick={(e)=>{
                    e.stopPropagation();
                    addTask(goal._id, newTaskName).then(()=>{
                      setNewTaskName('');
                    });
                  }}
                  className='my-1 mx-auto px-1 border border-black rounded-lg whitespace-nowrap'
                >
                  Add Task
                </button>
              </div>
            </li>
          </ul>
        </div>
      </li>
    );
  } else {
    return(
      <li
        className='whitespace-nowrap'
        onClick={handleClick}
      >
        {goal.title}
      </li>
    );
  }

}
