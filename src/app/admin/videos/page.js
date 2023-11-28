'use client'

import QuoteForm from "@/components/quote-form";
import VideoCard from "@/components/video-card";
import { useState, useRef, useEffect } from "react";
import moment from "moment";

// export const metadata = {
//     title: 'Admin panel',
//     description: 'Admin panel',
// }


export default function Videos() {

    const pageRef = useRef();
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        fetch('/api/v1/video').then(res => res.json()).then(res => {
            console.log(res);
            setVideos(res.payload.data)
        });
    }, [])


    return (
        <div className="w-full h-full flex flex-col">
            <div className="font-bold text-[1.5rem]">Videos</div>
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
                    <div className="font-bold text-[1.1rem]">Videos list</div>
                    <div className="w-full h-full overflow-y-auto flex flex-col gap-2">
                        {
                            videos.map((video, index) => {
                                return ( <VideoCard key={index} video={video}/> )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}




