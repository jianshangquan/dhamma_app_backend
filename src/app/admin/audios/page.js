'use client';

import AudioCard from "@/components/audio-card";
import QuoteForm from "@/components/quote-form";
import moment from "moment";
import { useState, useRef, useEffect } from "react";

// export const metadata = {
//     title: 'Admin panel',
//     description: 'Admin panel',
// }


export default function Quotes() {


    const pageRef = useRef();
    const [audios, setAudios] = useState([]);
    const [selectedAudio, setSelectedAudio] = useState(null);

    useEffect(() => {
        fetch('/api/v1/audio').then(res => res.json()).then(res => {
            console.log(res);
            setAudios(res.payload.data)
        });
    }, [])

    return (
        <div className="w-full h-full flex flex-col">
            <div className="font-bold text-[1.5rem]">Audios</div>
            <div className="w-full h-full flex gap-10 overflow-hidden">
                <div className="w-full h-full flex flex-col overflow-hidden">
                    <div className="w-full h-full overflow-y-auto">
                        {/* <QuoteForm/> */}
                    </div>
                    <div className="py-2 flex justify-end">
                        <button className="bg-gray-100 px-3 py-2 rounded-md">Save</button>
                    </div>
                </div>
                <div className="w-full h-full flex flex-col gap-2">
                    <div className="font-bold text-[1.1rem]">Audio list</div>
                    <div className="w-full h-full overflow-y-auto flex flex-col gap-2">
                        {
                            audios.map((audio, index) => {
                                return (
                                    <AudioCard key={index} audio={audio}/>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}




