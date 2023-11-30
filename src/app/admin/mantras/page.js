'use client'

import UniversalForm, { FormType } from "@/components/universal-form";
import Page, { ChildPage } from "@/components/common/Page";
import MantraCard from "@/components/mantra-card";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from '@icon-park/react';
import shortid from "shortid";
import Mantra from "@/model/mantra-model";
import Utils from "@/utils/Utils";

// export const metadata = {
//     title: 'Admin panel',
//     description: 'Admin panel',
// }


export const config = {
    runtime: 'nodejs', // or "edge"
}

export default function Mantras() {

    const pageRef = useRef();
    const [mantras, setMantras] = useState([]);
    const [selectedMantra, setSelectedMantra] = useState(null);
    const [mantra, setMantra] = useState({
        id: null,
        title: 'fdsafdas',
        description: 'fdsfdasfsafdsfa',
        mantra: 'cxvdscvcsvsddsfsd',
        defination: 'fnkjsdahfkdsjafklds',
        coverUrl: '',
        thumbnail: '',
        createdDate: new Date()
    })

    useEffect(() => {
        fetch('/api/v1/mantra').then(res => res.json()).then(res => {
            console.log(res);
            setMantras(res.payload.data)
        });
    }, [])

    useEffect(() => {
        console.log(selectedMantra)
        if (selectedMantra == null) pageRef.current.prev();
        else pageRef.current.next();
    }, [selectedMantra]);




    const onSave = async () => {
        const tag = 'mantra';
        const fileResponse = await Utils.uploadFile({ tag, data: mantra }).then(res => res.json());
        if (fileResponse.success) {
            const files = fileResponse.payload.data.files.reduce((prev, cur) => {
                prev[cur.name] = cur.file;
                return prev;
            }, {});
            Object.entries(files).map(([name, file]) => {
                mantra[name] = `${tag}-${file}`;
            })

            const response = await fetch('/api/v1/mantra', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(mantra),
            }).then(res => res.json());

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
                    <div className="py-2 flex justify-end">
                        <button className="bg-gray-100 px-3 py-2 rounded-md" onClick={onSave}>Save</button>
                    </div>
                </div>
                <Page ref={pageRef} className="w-full h-full">
                    <ChildPage key={1} preRender={true} className="min-w-full min-h-full flex flex-col gap-2 overflow-hidden">
                        <div className="font-bold text-[1.1rem]">Mantra list</div>
                        <div className="w-full h-full overflow-y-auto flex flex-col gap-2">
                            {
                                mantras.map((mantra, index) => {
                                    return (<MantraCard key={index} onClick={() => setSelectedMantra(shortid())} mantra={mantra} />)
                                })
                            }
                        </div>
                    </ChildPage>
                    <ChildPage key={2} className="min-w-full min-h-full flex flex-col overflow-hidden">
                        <div className="font-bold text-[1.1rem] flex gap-2 items-center py-2">
                            <div className="rounded-full bg-white p-3 cursor-pointer border border-transparent hover:border-gray-100" onClick={() => setSelectedMantra(null)}>
                                <ArrowLeft theme="outline" size="21" strokeWidth={3} />
                            </div>
                            Mantra List
                        </div>
                        <MantraCard.Detail />
                    </ChildPage>
                </Page>
            </div>
        </div>
    )
}

