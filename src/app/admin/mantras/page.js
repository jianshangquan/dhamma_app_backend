'use client'

import UniversalForm, { FormType } from "@/components/universal-form";
import Page, { ChildPage } from "@/components/common/Page";
import MantraCard from "@/components/mantra-card";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from '@icon-park/react';
import shortid from "shortid";
import Mantra from "@/model/mantra-operation";
import Utils from "@/utils/Utils";
import useFetchState, { FetchState } from "@/hook/useFetchState";
import useComponentPigmengation from "@/hook/useComponentPigmengation";
import withQuery from 'with-query'

// export const metadata = {
//     title: 'Admin panel',
//     description: 'Admin panel',
// }


export const runtime = 'nodejs';

export default function Mantras() {

    const pageRef = useRef();
    const scrollDiv = useRef();
    const fetchStatus = useFetchState();
    const [mantras, setMantras] = useState([]);
    const [selectedMantra, setSelectedMantra] = useState(null);
    const [mantra, setMantra] = useState({
        id: null,
        title: '',
        description: '',
        mantra: '',
        defination: '',
        coverUrl: '',
        thumbnail: '',
        bishop: '',
        createdDate: new Date()
    })

    const { pause, start } = useComponentPigmengation(scrollDiv, () => {
        fetchData({ skip: mantras.length });
    }, { threshold: 0.95, dependicies: [mantras] });

    useEffect(() => {
        fetchData();
    }, [])

    // useEffect(() => {
    //     console.log(selectedMantra)
    //     if (selectedMantra == null) pageRef.current.prev();
    //     else pageRef.current.next();
    // }, [selectedMantra]);



    const fetchData = ({ skip = mantras.length, limit = 10 } = {}) => {
        pause();
        fetch(withQuery('/api/v1/mantra', { skip, limit })).then(res => res.json()).then(res => {
            console.log(res);
            start();
            setMantras(m => [...m, ...res.payload.data])
        });
    }


    const onSave = async () => {
        const tag = 'mantra';
        fetchStatus.loading();
        const fileResponse = await Utils.uploadFile({
            tag, data: mantra, onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                let percent = Math.floor((loaded * 100) / total);
                fetchStatus.loading(percent);
            }
        });
        if (fileResponse.success) {
            fetchStatus.completed({ message: 'Upload file completed' });
            const files = fileResponse.payload.data.files.reduce((prev, cur) => {
                prev[cur.name] = cur.file;
                return prev;
            }, {});
            const { groupId } = fileResponse.payload.data;
            Object.entries(files).map(([name, file]) => {
                mantra[name] = `${tag}-${groupId}/${file}`;
            })

            fetchStatus.loading(null);
            const response = await fetch('/api/v1/mantra', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(mantra),
            }).then(res => res.json()).then(res => {
                if (res.success) {
                    setMantras(m => [res.payload.data, ...m]);
                }
            });;
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
            <div className="font-bold text-[1.5rem]">Mantra</div>
            <div className="w-full h-full flex gap-10 overflow-hidden">
                <div className="w-full h-full flex flex-col overflow-hidden">
                    <div className="w-full h-full overflow-y-auto">
                        <UniversalForm type={FormType.Mantra} setFormData={setMantra} formData={mantra} />
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
                    <ChildPage key={1} preRender={true} className="min-w-full min-h-full flex flex-col gap-2 overflow-hidden">
                        <div className="font-bold text-[1.1rem]">Mantra list</div>
                        <div className="w-full h-full overflow-y-auto flex flex-col gap-2" ref={scrollDiv}>
                            {
                                mantras.map((mantra, index) => {
                                    return (
                                        <MantraCard key={index} mantra={mantra} onClick={() => {
                                            setSelectedMantra(mantra);
                                            pageRef.current.next();
                                        }} onDelete={() => {
                                            setMantras(a => {
                                                const newMantras = [...a];
                                                newMantras.splice(index, 1);
                                                return newMantras;
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
                            {selectedMantra?.title}
                        </div>
                        <MantraCard.Detail mantra={selectedMantra} />
                    </ChildPage>
                </Page>
            </div>
        </div>
    )
}

