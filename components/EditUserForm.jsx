"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditUserForm({ id, name, age, email, address, approvalStatus }) {
    const [newName, setNewName] = useState(name);
    const [newAge, setNewAge] = useState(age);
    const [newEmail, setNewEmail] = useState(email);
    const [newAddress, setNewAddress] = useState(address);
    const [newApprovalStatus, setNewApprovalStatus] = useState(approvalStatus);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            const res = await fetch(`http://localhost:3000/api/users/${id}`,{
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ newName, newAge, newEmail, newAddress, newApprovalStatus })
            });

            if(!res.ok){
                throw new Error("Failed to edit.");
            }

            router.refresh();
            router.push("/");
        }catch(error) {
            console.log(error);
        }
    }


    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                type="text" 
                className="border border-slate-600 px-8 py-3"
                placeholder="Name"
                required
            />
            <input 
                value={newAge}
                onChange={(e) => setNewAge(e.target.value)}
                type="number" 
                className="border border-slate-600 px-8 py-3"
                placeholder="Age"
                required
            />
            <input 
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                type="email" 
                className="border border-slate-600 px-8 py-3"
                placeholder="Email"
                required
            />
            <input 
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                type="text" 
                className="border border-slate-600 px-8 py-3"
                placeholder="Address"
                required
            />
            <input 
                value={newApprovalStatus}
                onChange={(e) => setNewApprovalStatus(e.target.value)}
                type="text" 
                className="border border-slate-600 px-8 py-3"
                placeholder="Approval Status"
                required
            />

            <button type="submit" className="cursor-pointer font-bold bg-green-500 text-white py-3 px-6 w-fit">Update</button>
        </form>
    )
}