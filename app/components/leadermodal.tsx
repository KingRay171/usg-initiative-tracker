"use client";

import { Dispatch, SetStateAction } from 'react';
import Modal from 'react-modal'

type Leader = {
    id: number;
    name: string;
    contact: string;
}

export default function LeaderModal(
    {leaderModalOpen, setLeaderModalOpen, leaderState, setLeaderState}: 
    {
        leaderModalOpen: boolean, 
        setLeaderModalOpen: Dispatch<SetStateAction<boolean>>, 
        leaderState: Leader[], 
        setLeaderState: Dispatch<SetStateAction<Leader[]>>
    }){
    return (
        <Modal isOpen={leaderModalOpen} onRequestClose={() => setLeaderModalOpen(false)} contentLabel="Add a Leader" ariaHideApp={false} style={{content: {width: "50vw", height: '50vh'}}}>
          <h2 className="text-black">Hello</h2>
          <button onClick={() => setLeaderModalOpen(false)} className="text-black">close</button>
          <div className="text-black">I am a modal</div>
          <form onSubmit={async (e) => {
            e.preventDefault()
            const formData = new FormData(e.target as HTMLFormElement)
            const response = await fetch("/api/leaders", {method: "POST", body: formData})
            const data = response.status
            if(data == 200){
                setLeaderModalOpen(false)
                setLeaderState([...leaderState, {id: leaderState.length, name: formData.get("name") as string, contact: formData.get("contact") as string}])
               
            } else {

            }
            }}>
            <label className="text-black">Name:</label>
            <input type='text' id="name" name="name" className="border border-2 rounded-lg text-black"/>
            <label className="text-black">Contact:</label>
            <input type='text' id="contact" name="contact"  className="border border-2 rounded-lg text-black"/>
            <input type="submit" value={"Add"} className="text-black"/>
          </form>
        </Modal>
    )
}