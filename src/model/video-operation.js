
import { firestore } from "@/db/firebase"
import connectDB from "@/db/mongodb";
import Utils from "@/utils/Utils";
import { Timestamp, collection, deleteDoc, doc, endAt, getDoc, getDocs, limit, orderBy, query, serverTimestamp, setDoc, startAt } from "firebase/firestore"
import shortid from "shortid"
import VideoModel from "./mongoose-model/video-mongodb-model";



const COLLECTION_NAME = 'videos';
export default function Video({
    id= shortid(),
    title= 'သမ္ဗုဒ္ဓေ',
    subtitle= '',
    mantra= 'သမ္ဗုဒ္ဓေ အဋ္ဌဝီသဉ္စ ဒွါဒသဉ္စ သဟဿကေ၊ ပဉ္စသတ သဟဿာနိ နမာမိ သိရသာမဟံ အပ္ပကာ ဝါဠုကာ ဂင်္ဂါ၊ အနန္တာ နိဗ္ဗုတာ ဇိနာ၊ တေသံ ဓမ္မဉ္စ သံဃဉ္စ၊ အာဒရေန နမာမဟံ၊ နမ    က္ကာရာ’နုဘာဝေန၊ ဟိတွာ သဗ္ဗေ ဥပဒ္ဒေဝေ၊ အနေကာ အန္တရာယာပိ၊ ဝိနဿန္တု အသေသတော။',
    defination= 'အဋ္ဌဝီသံ – သုံးပါးဘဝ သုံးလောကတွင် ဉာဏ ရောင်ဖိတ် အောင်ဘိသိက်နှင့် နှစ်ကျိပ်ရှစ်ဆူကုန်သော၊ သမ္ဗုဒ္ဓေ စ – တန်ဆောင်ပမာ ဉာဏ်ရောင်ဝါဖြင့် သစ္စာပွင့်လင်း တရားမင်းတို့ကို လည်းကောင်း၊ ဒွါဒသဉ္စ သဟဿကေ – နိဗ္ဗာန်ကိန်းအောင်း စက် မွေ့လျောင်းသည့် တစ်သောင်းနှစ်ထောင်ကုန်သော၊ သမ္ဗုဒ္ဓေစ – လရောင်ပမာ ဉာဏ်ရောင်ဝါဖြင့် သစ္စာလင်းပြောင် မြတ်ဘုန်းခေါင်တို့ကိုလည်းကောင်း၊ ပဉ္စသတ သဟဿာနိ – သောင်းထိုက်စကြဝဠာ ဂုဏ်ဝါရောင်ရှိန်း ငါးသိန်းကုန်သော၊ သမ္ဗုဒ္ဓေစ – နေရောင်ပမာ ဉာဏ်ရောင်ဝါဖြင့် သစ္စာလင်းထိန် မြတ်မုနိန်တို့ကိုလည်းကောင်း၊ အဟံ – အကျွန်ုပ်သည်၊ သိရသာ – ဦးခေါင်းရတနာ မြတ်အင်္ဂါဖြင့်၊ နမာမိ – ရိုသေညွတ်ကျိုး လက်စုံမိုး၍ ရှိခိုးပါ၏။ ဂင်္ဂါ – ဂင်္ဂါယ – ဂင်္ဂါမြစ်တွင်း၌၊ ဝါဠုကာ – ရှိကြကုန်သော သဲတို့သည် အပ္ပကာ – နည်းကြကုန်သေး၏ နိဗ္ဗုတာ – ဘုံဇာတ်သိမ်း၍ ငြိမ်းအေးတော်မူကြကုန်ပြီးသော၊ ဇိနာ – နှောင့်ယှက်ဖန်လာ မာရ်ငါးဖြာကို အရိယာမဂ် ဘုန်းရောင်စက်ဖြင့် ချိုးဖျက်လွယ်ကူ အောင်တော်မူသော ဘုရားရှင်အပေါင်းတို့ကား၊ အနန္တာ – သင်္ချာဂဏန်း ရေတွက် မှန်းလည်း ဆုံးခန်းတိုင်မြောက် မရောက်နိုင်ကြကုန်၊ တေ ဇိနေစ – ထိုဘုရားရှင်တို့ကိုလည်းကောင်း၊ တေသံ – ထိုငါးသိန်းတစ်သောင်းနှစ်ထောင်နှစ်ကျိတ်ရှစ်ဆူကုန်သော ဘုရားရှင်၊ မရေမတွက်နိုင်သော ဘုရားရှင်တို့၏၊ ဓမ္မဉ္စ – တရားတော်မြတ်ကိုလည်းကောင်း၊ သံဃဉ္စ – တပည့်သား သံဃာတော်မြတ်ကိုလည်းကောင်း၊ အဟံ – အကျွန်ုပ်သည်၊ အာဒရေန – အာဒရံ – ရိုသေစွာ၊ နမာမိ – ရှိခိုးပါ၏။ နမက္ကာရာနုဘာဝေန – ဤသို့ရှိခိုးပူဇော် ဖူးမြော်မာန်လျော့ ကန်တော့ရသော ပဏာမကုသိုလ် စေတနာကြောင့်၊ သဗ္ဗေ – ခပ်သိမ်းကုန်သော၊ ဥပဒ္ဒဝေ – ဘေးရန်တို့ကို၊ ဟိတွာ – ပယ်ဖျောက်၍၊ အနေကာ အန္တရာယာပိ – တစ်ပါးမက များလှသွယ်သွယ် အန္တရာယ်တို့သည်လည်း၊ အသေသတော – အကြွင်းအကျန်မရှိသော အားဖြင့်၊ ဝိနဿန္တု – ပျောက်ပျက်ပါစေသတည်း။',
    year= 2023,
    duration= 30239003,
    description= '',
    thumbnail= '',
    url= '',
    coverUrl='',
    bishop='',
    createdDate= new Date()
} = {}){
    const serverTime = new Date();
    return {
        id,
        title,
        subtitle,
        mantra,
        defination,
        year,        
        bishop,
        duration,
        description,
        thumbnail,
        url,
        coverUrl,
        createdDate,
        serverTime
    }
}









Video.find = async function ({ skip = 0, limit = 10 } = {}) {
    await connectDB();
    const data = await VideoModel.find().sort({ createdDate: -1 }).skip(skip).limit(limit);
    return data;
}


Video.findById = async function (id) {
    await connectDB();
    const data = await VideoModel.findById(id);
    return data;
}



Video.save = async function ({ data = new Video() } = {}) {
    await connectDB();
    const { title, subtitle, mantra, defination, year, duration, description, bishop, thumbnail, url, coverUrl } = data;
    const d = {
        createdDate: new Date(),
        title, subtitle, mantra, defination, year, duration, description, thumbnail, url ,
        coverUrl, bishop,
    };
    return await new VideoModel(d).save();
}



Video.updateById = async function (id, { title, subtitle, mantra, defination, year, duration, description, thumbnail, url, createdDate }) {
    await connectDB();
    const updateData = Utils.removeUndefineProperty({ 
        createdDate: new Date(),
        title, subtitle, mantra, defination, year, duration, description, thumbnail, url 
    })
    const data = await VideoModel.findByIdAndUpdate(id, updateData);
    return data;
}


Video.deleteById = async function (id) {
    await connectDB();
    const del = VideoModel.findByIdAndDelete(id);
    return del;
}
