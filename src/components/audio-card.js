'use client'
import Utils from '@/utils/Utils';
import { ArrowRight, DeleteFour } from '@icon-park/react';
import moment from 'moment';
import Image from 'next/image';








export default function AudioCard({ audio, onClick, onDelete }) {


    const onPlay = (event) => {

    }


    const onDel = (event) => {
        event.stopPropagation();
        fetch(`/api/v1/audio/${audio._id}`, { method: 'DELETE' }).then(res => res.json()).then(res => {
            onDelete && onDelete();
        });
    }


    return (
        <div onClick={onClick} className="bg-gray-100 w-full p-4 flex gap-3 rounded-md items-start group cursor-pointer">
            <div className="w-[35%] aspect-square bg-gray-200 rounded-md relative overflow-hidden group-hover:shadow-xl transition-all">
                <Image src={`/file/${audio?.coverUrl}`} fill={true} objectFit='cover' alt='image' />
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                    <div className="">{audio.title}</div>
                    <div className="text-[0.8rem]">{audio.subtitle}</div>
                </div>
                <div className=" font-extralight text-[0.8rem]">
                    {audio.mantra}
                </div>

                <div className="flex flex-col text-[0.75rem] opacity-60">
                    <div>{'ဆရာတော် : '}{audio.bishop}</div>
                    <div>{'Created date : '}{moment(audio.createdDate).format('YYYY-DD-MM hh:mm A')}</div>
                    <div>{'Duration : '}{Utils.convertSecondsToHoursMinutesAndSeconds(audio.duration)}</div>
                </div>
                <audio controls className='bg-gray-200 rounded-full shadow-md' src={`/file/${audio.url}`}></audio>

            </div>
            <div className='flex flex-col justify-between h-full items-center'>
                <ArrowRight theme="outline" size="21" strokeWidth={3} className='group-hover:translate-x-[0%] group-hover:opacity-100 opacity-0 transition-all translate-x-[-50%]' />
                <div className='p-3 border rounded-full' onClick={onDel}><DeleteFour theme="outline" size="21" fill="#333" strokeWidth={3}/></div>
            </div>
        </div>
    )
}





AudioCard.Detail = function AudioDetail({ audio }) {


    return (
        <div className="w-full h-full overflow-y-auto flex flex-col gap-2 px-2">
            <div className="flex flex-col gap-1 text-[0.9rem]">
                <div className="w-[30%] aspect-square bg-gray-200 rounded-md relative">
                    <Image src={`/file/${audio.coverUrl}`} fill style={{ objectFit: 'cover' }} alt=''/>
                </div>
                <span className='opacity-60'>{'ဆရာတော်: '}</span>
                <div className='opacity-60'>{'Created date : '}{moment(new Date()).format('YYYY-DD-MM hh:mm A')}</div>
            </div>
            <audio controls className='bg-gray-200 rounded-full shadow-md min-h-[2rem]' src={`/file/${audio.url}`}></audio>
            <div className="flex flex-col gap-1">
                <div className="font-bold">Mantra</div>
                <div className="whitespace-pre-wrap font-light text-[0.9rem]">
                    { audio.mantra }
                    {/* {'သမ္ဗုဒ္ဓေ အဋ္ဌဝီသဉ္စ ဒွါဒသဉ္စ သဟဿကေ၊ ပဉ္စသတ သဟဿာနိ နမာမိ သိရသာမဟံ အပ္ပကာ ဝါဠုကာ ဂင်္ဂါ၊ အနန္တာ နိဗ္ဗုတာ ဇိနာ၊ တေသံ ဓမ္မဉ္စ သံဃဉ္စ၊ အာဒရေန နမာမဟံ၊ နမ    က္ကာရာ’နုဘာဝေန၊ ဟိတွာ သဗ္ဗေ ဥပဒ္ဒေဝေ၊ အနေကာ အန္တရာယာပိ၊ ဝိနဿန္တု အသေသတော။'} */}
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <div className="font-bold">Mantra defination</div>
                <div className="whitespace-pre-wrap font-light text-[0.9rem]">
                    { audio.defination }
                    {/* {'အဋ္ဌဝီသံ – သုံးပါးဘဝ သုံးလောကတွင် ဉာဏ ရောင်ဖိတ် အောင်ဘိသိက်နှင့် နှစ်ကျိပ်ရှစ်ဆူကုန်သော၊ သမ္ဗုဒ္ဓေ စ – တန်ဆောင်ပမာ ဉာဏ်ရောင်ဝါဖြင့် သစ္စာပွင့်လင်း တရားမင်းတို့ကို လည်းကောင်း၊ ဒွါဒသဉ္စ သဟဿကေ – နိဗ္ဗာန်ကိန်းအောင်း စက် မွေ့လျောင်းသည့် တစ်သောင်းနှစ်ထောင်ကုန်သော၊ သမ္ဗုဒ္ဓေစ – လရောင်ပမာ ဉာဏ်ရောင်ဝါဖြင့် သစ္စာလင်းပြောင် မြတ်ဘုန်းခေါင်တို့ကိုလည်းကောင်း၊ ပဉ္စသတ သဟဿာနိ – သောင်းထိုက်စကြဝဠာ ဂုဏ်ဝါရောင်ရှိန်း ငါးသိန်းကုန်သော၊ သမ္ဗုဒ္ဓေစ – နေရောင်ပမာ ဉာဏ်ရောင်ဝါဖြင့် သစ္စာလင်းထိန် မြတ်မုနိန်တို့ကိုလည်းကောင်း၊ အဟံ – အကျွန်ုပ်သည်၊ သိရသာ – ဦးခေါင်းရတနာ မြတ်အင်္ဂါဖြင့်၊ နမာမိ – ရိုသေညွတ်ကျိုး လက်စုံမိုး၍ ရှိခိုးပါ၏။ ဂင်္ဂါ – ဂင်္ဂါယ – ဂင်္ဂါမြစ်တွင်း၌၊ ဝါဠုကာ – ရှိကြကုန်သော သဲတို့သည် အပ္ပကာ – နည်းကြကုန်သေး၏ နိဗ္ဗုတာ – ဘုံဇာတ်သိမ်း၍ ငြိမ်းအေးတော်မူကြကုန်ပြီးသော၊ ဇိနာ – နှောင့်ယှက်ဖန်လာ မာရ်ငါးဖြာကို အရိယာမဂ် ဘုန်းရောင်စက်ဖြင့် ချိုးဖျက်လွယ်ကူ အောင်တော်မူသော ဘုရားရှင်အပေါင်းတို့ကား၊ အနန္တာ – သင်္ချာဂဏန်း ရေတွက် မှန်းလည်း ဆုံးခန်းတိုင်မြောက် မရောက်နိုင်ကြကုန်၊ တေ ဇိနေစ – ထိုဘုရားရှင်တို့ကိုလည်းကောင်း၊ တေသံ – ထိုငါးသိန်းတစ်သောင်းနှစ်ထောင်နှစ်ကျိတ်ရှစ်ဆူကုန်သော ဘုရားရှင်၊ မရေမတွက်နိုင်သော ဘုရားရှင်တို့၏၊ ဓမ္မဉ္စ – တရားတော်မြတ်ကိုလည်းကောင်း၊ သံဃဉ္စ – တပည့်သား သံဃာတော်မြတ်ကိုလည်းကောင်း၊ အဟံ – အကျွန်ုပ်သည်၊ အာဒရေန – အာဒရံ – ရိုသေစွာ၊ နမာမိ – ရှိခိုးပါ၏။ နမက္ကာရာနုဘာဝေန – ဤသို့ရှိခိုးပူဇော် ဖူးမြော်မာန်လျော့ ကန်တော့ရသော ပဏာမကုသိုလ် စေတနာကြောင့်၊ သဗ္ဗေ – ခပ်သိမ်းကုန်သော၊ ဥပဒ္ဒဝေ – ဘေးရန်တို့ကို၊ ဟိတွာ – ပယ်ဖျောက်၍၊ အနေကာ အန္တရာယာပိ – တစ်ပါးမက များလှသွယ်သွယ် အန္တရာယ်တို့သည်လည်း၊ အသေသတော – အကြွင်းအကျန်မရှိသော အားဖြင့်၊ ဝိနဿန္တု – ပျောက်ပျက်ပါစေသတည်း။"'} */}
                </div>
            </div>
        </div>
    )
}