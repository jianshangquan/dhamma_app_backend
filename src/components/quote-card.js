import moment from "moment";
import { DeleteFour } from '@icon-park/react';

export default function QuoteCard({ quote, onDelete }) {


    const onDel = (event) => {
        event.stopPropagation();
        fetch(`/api/v1/quote/${quote._id}`, { method: 'DELETE' }).then(res => res.json()).then(res => {
            onDelete && onDelete();
        });
    }


    return (
        <div className="bg-gray-100 w-full p-4 flex flex-col rounded-md gap-2">
            <span className="font-light text-[0.9rem]">{quote.quote}</span>
            <div className="flex flex-col opacity-60">
                <span className="text-[0.75rem]">{quote.author.name}</span>
                <span className="text-[0.7rem] font-light">{moment(quote.createdDate).format('YYYY-MM-DD hh:mm:ss A')}</span>
            </div>
            <div className="flex items-start">
                <div className='p-3 border rounded-full cursor-pointer' onClick={onDel}><DeleteFour theme="outline" size="21" strokeWidth={3}/></div>
            </div>
        </div>
    )
}
