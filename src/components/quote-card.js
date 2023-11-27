import moment from "moment";

export default function QuoteCard() {
    return (
        <div className="bg-gray-100 w-full p-4 flex flex-col rounded-md gap-2">
            <span className="font-light text-[0.9rem]">
                You'd think a sociopath assassin wouldn't have a fan following but he does.
                All the tools and engines on earth are only extensions of man's limbs and senses.
                The most beautiful fig may contain a worm.
            </span>
            <div className="flex flex-col opacity-60">
                <span className="text-[0.75rem]">Phyo Sweet</span>
                <span className="text-[0.7rem] font-light">{moment(new Date()).format('YYYY-MM-DD hh:mm:ss A')}</span>
            </div>
        </div>
    )
}
