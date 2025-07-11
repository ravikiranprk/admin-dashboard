"use client";
import Link from "next/link";
import React, { useState } from "react";


const Table = ({ data }) => {
    const headings = ["Sl.No", "Name", "Age", "Email", "Address", "Actions"];

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;
    const lastIndex = currentPage * itemsPerPage;
    const startIndex = lastIndex - itemsPerPage;
    const numPages = Math.ceil(data.length / itemsPerPage);
    const currentPageItems = data.slice(startIndex, lastIndex);

    const previousPage = () => {
        if (currentPage != 1) setCurrentPage(prev => prev - 1)
    }
    const nextPage = () => {
        if (currentPage != numPages) setCurrentPage(prev => prev + 1)
    }

    const changeApprove = (status) => {
        const existingStatus = data.find(user => user.approvalStatus === status);
        existingStatus.approvalStatus = status==="approved" ? "pending" : "approved";
    }
    const changeReject = (status) => {
        const existingStatus = data.find(user => user.approvalStatus === status);
        existingStatus.approvalStatus = status==="rejected" ? "pending" : "rejected";
    }

    return (
        <div className="p-10 m-6">
            <h1 className="text-center text-[3rem] font-semibold py-6">Admin Dashboard - Car Rental System</h1>
            <table className="w-full overflow-x-scroll border border-gray-800 rounded-2xl">
                <thead>
                    <tr>
                        {headings.map((heading, index) => (
                            <th key={index} className="bg-amber-300 py-3 capitalize">
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentPageItems.map((user, index) => (
                        <tr key={index} className={`${index % 2 !== 0 && 'bg-cyan-300'} ${index % 2 === 0 && 'bg-orange-100'} text-center capitalize`}>
                            <td>{startIndex + index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.age}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td className="flex flex-col gap-2 items-center">
                                <button 
                                    onClick={() => changeApprove(user.approvalStatus)}
                                    className="bg-green-500 rounded-sm font-semibold p-2 cursor-pointer w-[6rem] mt-4"
                                >
                                    {user.approvalStatus === "approved" ? "Approved" : "Approve"}
                                </button>
                                <button 
                                    onClick={() => changeReject(user.approvalStatus)}
                                    className="bg-red-500 rounded-sm font-semibold p-2 cursor-pointer w-[6rem]"
                                >
                                    {user.approvalStatus === "rejected" ? "Rejected" : "Reject"}
                                </button>
                                <Link 
                                    href={`/edit/${user._id}`}
                                    className="bg-cyan-500 rounded-sm font-semibold p-2 cursor-pointer w-[6rem] mb-4"
                                >
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="w-full flex flex-row items-center p-6">
                <div className="flex flex-row items-center gap-5">
                    <span className="font-semibold cursor-pointer" onClick={() => previousPage()}>
                        Prev
                    </span>
                    <div className="flex flex-row items-center">
                        <span>{currentPage}</span>
                        <span> - </span>
                        <span>{numPages}</span>
                    </div>
                    <span className="font-semibold cursor-pointer" onClick={() => nextPage()}>
                        Next
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Table;