"use client"

import { useState } from "react"

export default function AudioForm() {

    const [audio, setAudio] = useState({
        id: null,
        title: '',
        description: '',
        mantra: '',
        description: '',
        url: '',
        coverUrl: '',
        thumbnail: '',
        createdDate: new Date()
    })

    return (
        <div className="w-full h-full flex flex-col gap-2">
            <div className="flex flex-col gap-1">
                <span className="capitalize">Title</span>
                <input type="text" className="bg-gray-100 rounded-md p-2" />
            </div>
            <div className="flex flex-col gap-1">
                <span className="capitalize">Description</span>
                <textarea type="text" className="bg-gray-100 rounded-md p-2" />
            </div>
            <div className="flex flex-col gap-1">
                <span className="capitalize">Mantra</span>
                <textarea type="text" className="bg-gray-100 rounded-md p-2 min-h-[10rem]" />
            </div>
            <div className="flex flex-col gap-1">
                <span className="capitalize">Mantra Defination</span>
                <textarea type="text" className="bg-gray-100 rounded-md p-2 min-h-[20rem]" />
            </div>
            <div className="flex flex-col gap-1">
                <span className="capitalize">Audio</span>
                <input type="file" className="bg-gray-100 rounded-md p-2" />
            </div>
            <div className="flex flex-col gap-1">
                <span className="capitalize">Image cover</span>
                <input type="file" className="bg-gray-100 rounded-md p-2" />
            </div>
        </div>
    )
}