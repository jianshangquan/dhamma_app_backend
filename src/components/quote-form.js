"use client"

import { useState } from "react"

export default function QuoteForm({ quote, setQuote }) {

    return (
        <div className="w-full h-full flex flex-col gap-2">
            <div className="flex flex-col gap-1">
                <span className="capitalize">Quote</span>
                <textarea type="text" className="bg-gray-100 min-h-[10rem] rounded-md p-2" value={quote.quote} onChange={({target}) => setQuote(q => ({...q, quote: target.value}))}/>
            </div>
            <div className="flex flex-col gap-1">
                <span className="capitalize">Author</span>
                <input type="text" className="bg-gray-100 rounded-md p-2" value={quote.author.name} onChange={({target}) => setQuote(q => ({...q, author: {name: target.value }}))}/>
            </div>
        </div>
    )
}