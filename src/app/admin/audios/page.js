import AudioCard from "@/components/audio-card";
import QuoteForm from "@/components/quote-form";
import moment from "moment";

export const metadata = {
    title: 'Admin panel',
    description: 'Admin panel',
}


export default function Quotes() {
    return (
        <div className="w-full h-full flex flex-col">
            <div className="font-bold text-[1.5rem]">Audios</div>
            <div className="w-full h-full flex gap-10 overflow-hidden">
                <div className="w-full h-full flex flex-col overflow-hidden">
                    <div className="w-full h-full overflow-y-auto">
                        <QuoteForm/>
                    </div>
                    <div className="py-2 flex justify-end">
                        <button className="bg-gray-100 px-3 py-2 rounded-md">Save</button>
                    </div>
                </div>
                <div className="w-full h-full flex flex-col gap-2">
                    <div className="font-bold text-[1.1rem]">Audio list</div>
                    <div className="w-full h-full overflow-y-auto flex flex-col gap-2">
                        {
                            [1, 2, 3, 4, 5, 6].map((audios, index) => {
                                return (
                                    <AudioCard/>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}




