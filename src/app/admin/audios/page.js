'use client';

import AudioCard from "@/components/audio-card";
import QuoteForm from "@/components/quote-form";
import UniversalForm, { FormType } from "@/components/universal-form";
import Utils from "@/utils/Utils";
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
    const [audio, setAudio] = useState({
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
        fetch('/api/v1/audio').then(res => res.json()).then(res => {
            console.log(res);
            setAudios(res.payload.data)
        });
    }, [])


    useEffect(() => {
        // Utils.uploadFile({ tag: 'audio', data: audio }).then(res => {
        //     console.log(res)
        // })
    }, [audio])


    const onSave = async () => {
        const tag = 'audio';
        const fileResponse = await Utils.uploadFile({ tag, data: audio }).then(res => res.json());
        if (fileResponse.success) {
            const files = fileResponse.payload.data.files.reduce((prev, cur) => {
                prev[cur.name] = {
                    name: cur.file,
                    duration: cur.duration
                };
                return prev;
            }, {});
            const { groupId } = fileResponse.payload.data;
            Object.entries(files).map(([key, file]) => {
                audio[key] = `${tag}-${groupId}/${file.name}`;
                if(key == 'url'){
                    audio.duration = file.duration;
                }
            })

            const response = await fetch('/api/v1/audio', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(audio),
            }).then(res => res.json());
            
            console.log(fileResponse);
            console.log(response);
        }
    }

    const reset = () => {
        setAudio({
            id: null,
            title: '',
            description: '',
            mantra: '',
            description: '',
            url: '',
            coverUrl: '',
            bishop: '',
            thumbnail: '',
            createdDate: new Date()
        })
    }

    return (
        <div className="w-full h-full flex flex-col">
            <div className="font-bold text-[1.5rem]">Audios</div>
            <div className="w-full h-full flex gap-10 overflow-hidden">
                <div className="w-full h-full flex flex-col overflow-hidden">
                    <div className="w-full h-full overflow-y-auto">
                        <UniversalForm type={FormType.Audio} formData={audio} setFormData={setAudio} />
                    </div>
                    <div className="py-2 flex justify-end">
                        <button className="bg-gray-100 px-3 py-2 rounded-md" onClick={onSave}>Save</button>
                    </div>
                </div>
                <div className="w-full h-full flex flex-col gap-2">
                    <div className="font-bold text-[1.1rem]">Audio list</div>
                    <div className="w-full h-full overflow-y-auto flex flex-col gap-2">
                        {
                            audios.map((audio, index) => {
                                return (
                                    <AudioCard key={index} audio={audio} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}




