import moment from "moment";

export default function QuoteCard({ quote }) {
    return (
        <div className="bg-gray-100 w-full p-4 flex flex-col rounded-md gap-2">
            <span className="font-light text-[0.9rem]">{quote.quote}</span>
            <div className="flex flex-col opacity-60">
                <span className="text-[0.75rem]">{quote.author.name}</span>
                <span className="text-[0.7rem] font-light">{moment(quote.createdDate).format('YYYY-MM-DD hh:mm:ss A')}</span>
            </div>
        </div>
    )
}
