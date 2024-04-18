"use client";
import { Status } from "@prisma/client";
import {useRouter, usePathname} from "next/navigation"
import { FormEvent, useState } from "react";
import Modal from 'react-modal'
import Select from 'react-select'


export default function EditDelete({params, leaders}: {params:{
    id: string;
    name: string;
    description: string;
    
    leaders: {
        id: string;
        name: string;
        email: string;
        admin: boolean;
        password: string;
    }[];
    status: Status
}, leaders: {
    
        id: string;
        name: string;
        email: string;
        admin: boolean;
        password: string;
    }[]
}){
    
    const [modalOpen, setModalOpen] = useState(false)
    const router = useRouter()
    const pathName = usePathname()
    const init_type = pathName.split("/")[1]
    const initLeaderNames = params.leaders.map((leader) => {return {...leader, value: leader.name, label: leader.name }})
    const allLeaderNames = leaders.map((leader) => {return {...leader, value: leader.name, label: leader.name }})
    const [inputFields, setInputFields] = useState(initLeaderNames)
    const statusOptions = [
        {label: "Planning", value: "PLANNING"}, 
        {label: "In Progress", value: "IN_PROGRESS"}, 
        {label: "On Hold", value: "ON_HOLD"},
        {label: "Completed", value: "COMPLETED"}
    ]


    const remove = (idx: number) => {
        console.log(idx)
        let data = [...inputFields];
        console.log(data)
        data.splice(idx, 1)
        setInputFields(data)
    }

    const submitEdit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const response = await fetch(`/api/${init_type}/${params.id}`, {method: "POST", body: formData})
        const data = response.status
        if(data == 200){
            setModalOpen(false)
            router.push(`/${init_type}/${params.id}`)
            router.refresh()
        } else {}
    }

    const submitDelete = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const response = await fetch(`/api/${init_type}/${params.id}`, {method: "DELETE"})
        const data = response.status
        if(data == 200){

            router.push(`/${init_type}`)
            router.refresh()
        }
    }

    return (
        <>
        <div className="flex space-x-8 items-center">
            <button onClick={(e) => {
                e.preventDefault()
                setModalOpen(true)
            }}>Edit</button>
            <button onClick={submitDelete}>Delete</button>
          </div>
          <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} contentLabel="Edit an Initiative" ariaHideApp={false} style={{content: {width: "50vw", height: '60vh'}}}>
            
            <button onClick={() => setModalOpen(false)} className="text-black">X</button>
            <h2 className="text-black">Edit {params.name}</h2>
            <form onSubmit={submitEdit} className="flex flex-col space-y-5">
              <div>
              <label className="text-black">Initiative Name:</label>
              <input type='text' id="name" name="name" className="border border-2 rounded-lg text-black" defaultValue={params.name}/>
              </div>
              <div>
              <label className="text-black">Initiative Description:</label>
              <textarea id="desc" name="desc" className="border border-2 rounded-lg text-black" defaultValue={params.description}/>
              </div>
              <div>
              <label className="text-black">Initiative Leaders:</label>
              {inputFields.map((e, idx) => (
                  <div key={idx}>
                      <Select id={"leader" + idx} name={"leader" + idx} options={allLeaderNames} styles={{input: (base) => ({...base, color: "black"}), option: (base) => ({...base, color: "black"})}} defaultValue={e}/>
                      {idx != 0 && (<button className="border border-2 rounded-lg text-black" onClick={(e) => {
                          e.preventDefault()
                          remove(idx)
                      }}>Remove</button>)}

                  </div>
              ))}
              
              <button className="border border-2 rounded-lg text-black" onClick={(e) => {
                  e.preventDefault()
                  setInputFields([...inputFields, {id: "", name: "", email: "", admin: false, password: "", label: "", value: ""}])
              }}>Add an Initiative Leader</button>
              </div>
              <div>
              <label className="text-black">Initiative Status:</label>
              <Select id="status" name="status" options={statusOptions} styles={{input: (base) => ({...base, color: "black"}), option: (base) => ({...base, color: "black"})}} value={{value: params.status as string, label: params.status as string}}/>
              </div>
              <input className="border border-2 rounded-lg text-black" type='submit' value="Update"/>

            </form>
          </Modal>
          
          </>
    )
}