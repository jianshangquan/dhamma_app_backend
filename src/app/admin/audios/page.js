'use client';

import AudioCard from "@/components/audio-card";
import Page, { ChildPage } from "@/components/common/Page";
import QuoteForm from "@/components/quote-form";
import UniversalForm, { FormType } from "@/components/universal-form";
import useComponentPigmengation from "@/hook/useComponentPigmengation";
import useFetchState, { FetchState } from "@/hook/useFetchState";
import Utils from "@/utils/Utils";
import { ArrowLeft } from '@icon-park/react';
import moment from "moment";
import { useState, useRef, useEffect } from "react";
import withQuery from 'with-query';

// export const metadata = {
//     title: 'Admin panel',
//     description: 'Admin panel',
// }


export default function Quotes() {


    const pageRef = useRef();
    const scrollDiv = useRef();
    const fetchStatus = useFetchState();
    const [audios, setAudios] = useState([]);
    const [selectedAudio, setSelectedAudio] = useState(null);
    const [audio, setAudio] = useState({
        id: null,
        title: '',
        description: '',
        mantra: '',
        defination: '',
        url: '',
        coverUrl: '',
        thumbnail: '',
        bishop: '',
        createdDate: new Date()
    })

    const { pause, start } = useComponentPigmengation(scrollDiv, () => {
        fetchData({ skip: audios.length });
    }, { threshold: 0.95, dependicies: [audios] });


    useEffect(() => fetchData(), [])

    const fetchData = ({ skip = audios.length, limit = 10 } = {}) => {
        pause();
        fetch(withQuery('/api/v1/audio', { skip, limit })).then(res => res.json()).then(res => {
            console.log(res);
            start();
            setAudios(a => [...a, ...res.payload.data])
        });
    }


    const onSave = async () => {
        const tag = 'audio';
        fetchStatus.loading();
        const fileResponse = await Utils.uploadFile({
            tag, data: audio, onUploadProgress: (progressEvent) => {
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
                audio[key] = `${tag}-${groupId}/${file.name}`;
                if (key == 'url') {
                    audio.duration = file.duration;
                }
            })

            fetchStatus.loading(null);
            const response = await fetch('/api/v1/audio', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(audio),
            }).then(res => res.json()).then(res => {
                if (res.success) {
                    setAudios(a => [res.payload.data, ...a]);
                }
            });
            fetchStatus.completed();

            setTimeout(() => {
                fetchStatus.notInitialize();
            }, 1000)

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
                <Page ref={pageRef} className="w-full h-full">
                    <ChildPage preRender={true} className="min-w-full min-h-full flex flex-col gap-2">
                        <div className="font-bold text-[1.1rem]">Audio list</div>
                        <div className="w-full h-full overflow-y-auto flex flex-col gap-2" ref={scrollDiv}>
                            {
                                audios.map((audio, index) => {
                                    return (
                                        <AudioCard key={index} audio={audio} onClick={() => {
                                            setSelectedAudio(audio);
                                            pageRef.current.next();
                                        }} onDelete={() => {
                                            setAudios(a => {
                                                const newAudios = [...a];
                                                newAudios.splice(index, 1);
                                                return newAudios;
                                            })
                                        }}/>
                                    )
                                })
                            }
                        </div>
                    </ChildPage>
                    <ChildPage key={2} className="min-w-full min-h-full flex flex-col overflow-hidden">
                        <div className="font-bold text-[1.1rem] flex gap-2 items-center py-2">
                            <div className="rounded-full bg-white p-3 cursor-pointer border border-transparent hover:border-gray-100" onClick={() => pageRef.current.prev()}>
                                <ArrowLeft theme="outline" size="21" strokeWidth={3} />
                            </div>
                            {selectedAudio?.title}
                        </div>
                        <AudioCard.Detail audio={selectedAudio} />
                    </ChildPage>
                </Page>
            </div>
        </div>
    )
}




