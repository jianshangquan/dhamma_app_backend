'use client'

import QuoteCard from "@/components/quote-card";
import QuoteForm from "@/components/quote-form";
import useFetchState, { FetchState } from "@/hook/useFetchState";
import { useState, useRef, useEffect } from "react";

// export const metadata = {
//     title: 'Admin panel',
//     description: 'Admin panel',
// }


export default function Quotes() {


    const pageRef = useRef();
    const fetchState = useFetchState();
    const [quotes, setQuotes] = useState([]);
    const [quote, setQuote] = useState({
        quote: '',
        author: {
            name: 'Phyo sweet'
        },
        createdDate: new Date()
    })
    const [selectedQuote, setSelectedQuote] = useState(null);

    useEffect(() => {
        fetch('/api/v1/quote').then(res => res.json()).then(res => {
            setQuotes(res.payload.data)
        });
    }, []);

    const onSave = () => {
        fetchState.loading();
        fetch('/api/v1/quote', {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(quote)
        }).then(res => res.json()).then(res => {
            if(res.success){
                fetchState.completed(res.payload.data);
                setQuotes(qs => [ res.payload.data, ...qs])
            }
            setTimeout(() => {
                fetchState.notInitialize();
            }, 1000)
        }).catch(e => fetchState.error(e))
    }

    return (
        <div className="w-full h-full flex flex-col">
            <div className="font-bold text-[1.5rem]">Quote</div>
            <div className="w-full h-full flex gap-10 overflow-hidden">
                <div className="w-full h-full flex flex-col overflow-hidden">
                    <div className="w-full h-full overflow-y-auto">
                        <QuoteForm quote={quote} setQuote={setQuote}/>
                    </div>
                    <div className="py-2 flex justify-end items-center gap-2">
                        <div className="text-[0.8rem]">{(() => {
                            if(fetchState.status.status == FetchState.LOADING){
                                return 'Saving...'
                            }
                            if(fetchState.status.status == FetchState.COMPLETED){
                                return 'Completed'
                            }
                            if(fetchState.status.status == FetchState.ERROR){
                                return fetchState.status.error;
                            }
                        })()}</div>
                        <button className="bg-gray-100 px-3 py-2 rounded-md" onClick={onSave}>Save</button>
                    </div>
                </div>
                <div className="w-full h-full flex flex-col gap-2">
                    <div className="font-bold text-[1.1rem]">Quote list</div>
                    <div className="w-full h-full overflow-y-auto flex flex-col gap-2">
                        {
                            quotes.map((quote, index) => {
                                return ( <QuoteCard key={index} quote={quote}/> )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}




