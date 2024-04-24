"use client";

import { useState } from "react";
import Select from 'react-select'
import {useRouter, usePathname} from "next/navigation"
import { user } from "@prisma/client";


export default function InitForm({leaders}: {leaders: user[]}){
  const [inputFields, setInputFields] = useState([{name: '', contact: ''}])
  const router = useRouter()
  const pathName = usePathname()
  const init_type = pathName.split("/")[1]
  const remove = (idx: number) => {
    console.log(idx)
    let data = [...inputFields];
    console.log(data)
    data.splice(idx, 1)
    setInputFields(data)
  }
  const leaderNames = leaders?.map((leader) => {
    return {...leader, value: `${leader.name} (id:${leader.id})`, label: `${leader.name} (id:${leader.id})` }
  })
  const statusOptions = [
      {label: "Planning", value: "PLANNING"}, 
      {label: "In Progress", value: "IN_PROGRESS"}, 
      {label: "On Hold", value: "ON_HOLD"},
      {label: "Completed", value: "COMPLETED"}
  ]
  
  return (
    <>
      <form className='flex flex-col space-y-4' onSubmit={async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const response = await fetch(`/api/${init_type}`, {method: "POST", body: formData})
        const data = response.status
        if(data == 200){
          router.push(`/${init_type}`)
          router.refresh()
        }
      }}>
        <label>Initiative Name:</label>
        <input required type='text' id="name" name="name" className='text-black' />
        <label>Initiative Description:</label>
        <textarea required id="desc" name="desc" className='text-black'/>
        <label>Initiative Leaders:</label>
        {inputFields.map((e, idx) => (
          <div key={idx}>
            <Select 
            required 
            id={"leader" + idx} 
            name={"leader" + idx} 
            options={leaderNames} 
            styles={{input: (base) => ({...base, color: "black"}), 
            option: (base) => ({...base, color: "black"})}}
            />
            {idx != 0 && (<button onClick={(e) => {
                e.preventDefault()
                remove(idx)
            }}>Remove</button>)}
          </div>
        ))}
        <button onClick={(e) => {
          e.preventDefault()
          setInputFields([...inputFields, {name: "", contact: ""}])
        }}>
          Add an Initiative Leader
        </button>
        <label>Status:</label>
        <Select 
        required 
        id="status" 
        name="status" 
        options={statusOptions} 
        styles={{input: (base) => ({...base, color: "black"}), 
        option: (base) => ({...base, color: "black"})}}
        />
        <input type='submit' value="Create"/>
      </form>
    </>
  )
}