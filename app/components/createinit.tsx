"use client";

import { useState } from "react";
import Select from 'react-select'
import Modal from 'react-modal'
import {useRouter, usePathname, redirect} from "next/navigation"
import LeaderModal from "./leadermodal";

type FormProps = {
    leaders: {
        id: number;
        name: string;
        contact: string;
    }[]
}


export default function InitForm({leaders}: FormProps){
    const [inputFields, setInputFields] = useState([{name: '', contact: ''}])
    const [modalOpen, setModalOpen] = useState(false)
    const [leadersState, setLeadersState] = useState(leaders)
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
    const leaderNames = leadersState.map((leader) => {return {...leader, value: leader.name, label: leader.name }})
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
            console.log(formData)
            const response = await fetch(`/api/${init_type}`, {method: "POST", body: formData})
            const data = await response.status
            if(data == 200){
                
                router.push(`/${init_type}`)
                router.refresh()
            }

          }}>
            <label>Initiative Name:</label>
            <input type='text' id="name" name="name" className='text-black' />
            <label>Initiative Description:</label>
            <textarea id="desc" name="desc" className='text-black'/>
            <label>Initiative Leaders:</label>
            {inputFields.map((e, idx) => (
                <div key={idx}>
                    <Select id={"leader" + idx} name={"leader" + idx} options={leaderNames} styles={{input: (base) => ({...base, color: "black"}), option: (base) => ({...base, color: "black"})}}/>
                    <button onClick={(e) => {
                        e.preventDefault()
                        setModalOpen(true)}}>Not on the List?</button>
                    {idx != 0 && (<button onClick={(e) => {
                        e.preventDefault()
                        remove(idx)
                    }}>Remove</button>)}
                    
                </div>
            ))}
            <button onClick={(e) => {
                e.preventDefault()
                setInputFields([...inputFields, {name: "", contact: ""}])
            }}>Add an Initiative Leader</button>
            <label>Status:</label>
            <Select id="status" name="status" options={statusOptions} styles={{input: (base) => ({...base, color: "black"}), option: (base) => ({...base, color: "black"})}}/>
            <input type='submit' value="Create"/>

          </form>
          <LeaderModal leaderModalOpen={modalOpen} setLeaderModalOpen={setModalOpen} leaderState={leadersState} setLeaderState={setLeadersState}/>
          
          </>
    )
}