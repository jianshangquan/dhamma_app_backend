'use client'

import AudioForm from "@/components/audio-form";
import Page, { ChildPage } from "@/components/common/Page";
import MantraCard from "@/components/mantra-card";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from '@icon-park/react';
import shortid from "shortid";

// export const metadata = {
//     title: 'Admin panel',
//     description: 'Admin panel',
// }


export default function Audios() {


    const pageRef = useRef();
    const [selectedMantra, setSelectedMantra] = useState(null);

    useEffect(() => {
        console.log(selectedMantra)
        if (selectedMantra == null) pageRef.current.prev();
        else pageRef.current.next();
    }, [selectedMantra])

    return (
        <div className="w-full h-full flex flex-col">
            <div className="font-bold text-[1.5rem]">Mantra</div>
            <div className="w-full h-full flex gap-10 overflow-hidden">
                <div className="w-full h-full flex flex-col overflow-hidden">
                    <div className="w-full h-full overflow-y-auto">
                        <AudioForm />
                    </div>
                    <div className="py-2 flex justify-end">
                        <button className="bg-gray-100 px-3 py-2 rounded-md">Save</button>
                    </div>
                </div>
                <Page ref={pageRef} className="w-full h-full">
                    <ChildPage key={1} preRender={true} className="min-w-full min-h-full flex flex-col gap-2 overflow-hidden">
                        <div className="font-bold text-[1.1rem]">Mantra list</div>
                        <div className="w-full h-full overflow-y-auto flex flex-col gap-2">
                            {
                                [1, 2, 3, 4, 5, 6].map((audios, index) => {
                                    return (<MantraCard key={index} onClick={() => setSelectedMantra(shortid())} />)
                                })
                            }
                        </div>
                    </ChildPage>
                    <ChildPage key={2} className="min-w-full min-h-full flex flex-col overflow-hidden">
                        <div className="font-bold text-[1.1rem] flex gap-2 items-center py-2">
                            <div className="rounded-full bg-white p-3 cursor-pointer border border-transparent hover:border-gray-100" onClick={() => setSelectedMantra(null)}><ArrowLeft theme="outline" size="21" strokeWidth={3} /></div>
                            Mantra List
                        </div>
                        <MantraCard.Detail/>
                    </ChildPage>
                </Page>
            </div>
        </div>
    )
}




