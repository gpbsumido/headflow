'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import GoalItem from './GoalItem';

export default function GoalList() {

  const [items,setItems] = useState<any>();
  const [newGoalName,setNewGoalName] = useState<string>('');
  
  async function getGoals(){
    axios.get('/api/goals').then(response =>{
      console.log(response.data)
      setItems(response.data);
    });
  }

  async function handleAddGoalClick(title:string) {
    axios.post('/api/goals',{
      params: {
        title: title
      }
    }).then(response =>{
      setItems((prevState:any[]) => {
        let newGoals = {
          title: title,
          tasks: []
        };
        if (!prevState) return [newGoals];
        return prevState.concat(newGoals);
      });
      setNewGoalName('');
    });
  }

  useEffect(()=>{
    getGoals();
  },[])

  return (
    <div>
      <ol>
        {
          items
            ?
              items.map( (item:any,index:number) =>{
                return(
                  <GoalItem
                    key={index}
                    goal={item}
                    index={index}
                    setItems={setItems}
                  />
                );
              })
            :
              <div />
        }
      </ol>
      <div className='flex flex-col mt-5'>
        <input
          className='border border-black px-2 rounded-md'
          type='text'
          value={newGoalName}
          placeholder='New Goal Name'
          onChange={(e)=>{
            setNewGoalName(e.target.value.trim())
          }}
        />
        <button
          className='border border-black rounded-md w-min px-5 mx-auto mt-2'
          onClick={()=>handleAddGoalClick(newGoalName)}
        >
          Add
        </button>
      </div>
    </div>
  )
}
