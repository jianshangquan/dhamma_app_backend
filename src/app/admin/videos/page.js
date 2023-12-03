'use client'

import QuoteForm from "@/components/quote-form";
import VideoCard from "@/components/video-card";
import { useState, useRef, useEffect } from "react";
import moment from "moment";
import UniversalForm, { FormType } from "@/components/universal-form";
import Utils from "@/utils/Utils";
import useFetchState, { FetchState } from "@/hook/useFetchState";

// export const metadata = {
//     title: 'Admin panel',
//     description: 'Admin panel',
// }


export default function Videos() {

    const pageRef = useRef();
    const fetchStatus = useFetchState();
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [video, setVideo] = useState({
        id: null,
        title: 'fdsafdas',
        description: 'fdsfdasfsafdsfa',
        mantra: 'cxvdscvcsvsddsfsd',
        defination: 'fnkjsdahfkdsjafklds',
        url: '',
        coverUrl: '',
        thumbnail: '',
        bishop: '',
        createdDate: new Date()
    })

    useEffect(() => {
        fetch('/api/v1/video').then(res => res.json()).then(res => {
            console.log(res);
            setVideos(res.payload.data)
        });
    }, [])


    const onSave = async () => {
        const tag = 'video'
        fetchStatus.loading();
        const fileResponse = await Utils.uploadFile({
            tag, data: video, onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                let percent = Math.floor((loaded * 100) / total);
                fetchStatus.loading(percent);
            }
        });
        if (fileResponse.success) {
            fetchStatus.completed({ message: 'Upload file completed' });
            const files = fileResponse.payload.data.files.reduce((prev, cur) => {
                prev[cur.name] = {
                    name: cur.file,
                    duration: cur.duration
                };
                return prev;
            }, {});
            const { groupId } = fileResponse.payload.data;
            Object.entries(files).map(([key, file]) => {
                video[key] = `${tag}-${groupId}/${file.name}`;
                if (key == 'url') {
                    video.duration = file.duration;
                }
            })

            fetchStatus.loading(null);
            const response = await fetch('/api/v1/video', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(video),
            }).then(res => res.json());
            fetchStatus.completed();

            setTimeout(() => {
                fetchStatus.notInitialize();
            }, 1000)

            console.log(fileResponse);
            console.log(response);
        }
    }

    return (
        <div className="w-full h-full flex flex-col">
            <div className="font-bold text-[1.5rem]">Videos</div>
            <div className="w-full h-full flex gap-10 overflow-hidden">
                <div className="w-full h-full flex flex-col overflow-hidden">
                    <div className="w-full h-full overflow-y-auto">
                        <UniversalForm type={FormType.Video} setFormData={setVideo} formData={video} />
                    </div>
                    <div className="py-2 flex justify-end items-center gap-2">
                        <div className="text-[0.8rem]">{(() => {
                            if (fetchStatus.status.status == FetchState.LOADING && fetchStatus.status.progress == null) {
                                return `Saving...`;
                            }
                            if (fetchStatus.status.status == FetchState.LOADING) {
                                return `Saving... ${fetchStatus.status.progress}%`;
                            }
                            if (fetchStatus.status.status == FetchState.COMPLETED) {
                                return 'Completed'
                            }
                            if (fetchStatus.status.status == FetchState.ERROR) {
                                return fetchStatus.status.error;
                            }
                        })()}</div>
                        <button className="bg-gray-100 px-3 py-2 rounded-md" onClick={onSave}>Save</button>
                    </div>
                </div>
                <div className="w-full h-full flex flex-col gap-2">
                    <div className="font-bold text-[1.1rem]">Videos list</div>
                    <div className="w-full h-full overflow-y-auto flex flex-col gap-2">
                        {
                            videos.map((video, index) => {
                                return (<VideoCard key={index} video={video} />)
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}




