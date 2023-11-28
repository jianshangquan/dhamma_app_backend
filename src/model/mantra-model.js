
import { firestore } from "@/db/firebase"
import Utils from "@/utils/Utils";
import { collection, deleteDoc, doc, endAt, getDoc, getDocs, limit, orderBy, query, setDoc, startAt } from "firebase/firestore"
import shortid from "shortid"



const COLLECTION_NAME = 'mantra';
export default function Mantra({
    id = shortid(),
    title = 'သမ္ဗုဒ္ဓေ',
    subtitle = '',
    mantra = 'သမ္ဗုဒ္ဓေ အဋ္ဌဝီသဉ္စ ဒွါဒသဉ္စ သဟဿကေ၊ ပဉ္စသတ သဟဿာနိ နမာမိ သိရသာမဟံ အပ္ပကာ ဝါဠုကာ ဂင်္ဂါ၊ အနန္တာ နိဗ္ဗုတာ ဇိနာ၊ တေသံ ဓမ္မဉ္စ သံဃဉ္စ၊ အာဒရေန နမာမဟံ၊ နမ    က္ကာရာ’နုဘာဝေန၊ ဟိတွာ သဗ္ဗေ ဥပဒ္ဒေဝေ၊ အနေကာ အန္တရာယာပိ၊ ဝိနဿန္တု အသေသတော။',
    defination = 'အဋ္ဌဝီသံ – သုံးပါးဘဝ သုံးလောကတွင် ဉာဏ ရောင်ဖိတ် အောင်ဘိသိက်နှင့် နှစ်ကျိပ်ရှစ်ဆူကုန်သော၊ သမ္ဗုဒ္ဓေ စ – တန်ဆောင်ပမာ ဉာဏ်ရောင်ဝါဖြင့် သစ္စာပွင့်လင်း တရားမင်းတို့ကို လည်းကောင်း၊ ဒွါဒသဉ္စ သဟဿကေ – နိဗ္ဗာန်ကိန်းအောင်း စက် မွေ့လျောင်းသည့် တစ်သောင်းနှစ်ထောင်ကုန်သော၊ သမ္ဗုဒ္ဓေစ – လရောင်ပမာ ဉာဏ်ရောင်ဝါဖြင့် သစ္စာလင်းပြောင် မြတ်ဘုန်းခေါင်တို့ကိုလည်းကောင်း၊ ပဉ္စသတ သဟဿာနိ – သောင်းထိုက်စကြဝဠာ ဂုဏ်ဝါရောင်ရှိန်း ငါးသိန်းကုန်သော၊ သမ္ဗုဒ္ဓေစ – နေရောင်ပမာ ဉာဏ်ရောင်ဝါဖြင့် သစ္စာလင်းထိန် မြတ်မုနိန်တို့ကိုလည်းကောင်း၊ အဟံ – အကျွန်ုပ်သည်၊ သိရသာ – ဦးခေါင်းရတနာ မြတ်အင်္ဂါဖြင့်၊ နမာမိ – ရိုသေညွတ်ကျိုး လက်စုံမိုး၍ ရှိခိုးပါ၏။ ဂင်္ဂါ – ဂင်္ဂါယ – ဂင်္ဂါမြစ်တွင်း၌၊ ဝါဠုကာ – ရှိကြကုန်သော သဲတို့သည် အပ္ပကာ – နည်းကြကုန်သေး၏ နိဗ္ဗုတာ – ဘုံဇာတ်သိမ်း၍ ငြိမ်းအေးတော်မူကြကုန်ပြီးသော၊ ဇိနာ – နှောင့်ယှက်ဖန်လာ မာရ်ငါးဖြာကို အရိယာမဂ် ဘုန်းရောင်စက်ဖြင့် ချိုးဖျက်လွယ်ကူ အောင်တော်မူသော ဘုရားရှင်အပေါင်းတို့ကား၊ အနန္တာ – သင်္ချာဂဏန်း ရေတွက် မှန်းလည်း ဆုံးခန်းတိုင်မြောက် မရောက်နိုင်ကြကုန်၊ တေ ဇိနေစ – ထိုဘုရားရှင်တို့ကိုလည်းကောင်း၊ တေသံ – ထိုငါးသိန်းတစ်သောင်းနှစ်ထောင်နှစ်ကျိတ်ရှစ်ဆူကုန်သော ဘုရားရှင်၊ မရေမတွက်နိုင်သော ဘုရားရှင်တို့၏၊ ဓမ္မဉ္စ – တရားတော်မြတ်ကိုလည်းကောင်း၊ သံဃဉ္စ – တပည့်သား သံဃာတော်မြတ်ကိုလည်းကောင်း၊ အဟံ – အကျွန်ုပ်သည်၊ အာဒရေန – အာဒရံ – ရိုသေစွာ၊ နမာမိ – ရှိခိုးပါ၏။ နမက္ကာရာနုဘာဝေန – ဤသို့ရှိခိုးပူဇော် ဖူးမြော်မာန်လျော့ ကန်တော့ရသော ပဏာမကုသိုလ် စေတနာကြောင့်၊ သဗ္ဗေ – ခပ်သိမ်းကုန်သော၊ ဥပဒ္ဒဝေ – ဘေးရန်တို့ကို၊ ဟိတွာ – ပယ်ဖျောက်၍၊ အနေကာ အန္တရာယာပိ – တစ်ပါးမက များလှသွယ်သွယ် အန္တရာယ်တို့သည်လည်း၊ အသေသတော – အကြွင်းအကျန်မရှိသော အားဖြင့်၊ ဝိနဿန္တု – ပျောက်ပျက်ပါစေသတည်း။',
    coverUrl = '',
    createdDate = new Date()
} = {}) {
    return {
        id,
        title,
        subtitle,
        mantra,
        defination,
        coverUrl,
        createdDate,
    }
}

















Mantra.find = async function ({ skip = 0, limit: lmt = 10 } = {}) {
    const mantraRef = collection(firestore, COLLECTION_NAME);
    const q = query(mantraRef, orderBy('createdDate'), startAt(skip), limit(lmt))
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => {
        const d = doc.data();
        return {
            id: doc.id,
            ...d,
            createdDate: d.createdDate.toDate()
        }
    });
    return data;
}


Mantra.findById = async function (id) {
    const mantraRef = collection(firestore, COLLECTION_NAME);
    const mantraDoc = doc(mantraRef, id)
    const snapshot = await getDoc(mantraDoc);
    if(snapshot.exists()){
        return snapshot.data()
    }
    throw new Error('Mantra not found');
}



Mantra.save = async function ({ data = new Mantra() } = {}) {
    const { title, subtitle, mantra, defination, coverUrl, createdDate, } = data;
    const mantraCollection = collection(firestore, COLLECTION_NAME);
    const mantraDoc = doc(mantraCollection)
    await setDoc(mantraDoc, { id: mantraDoc.id, title, subtitle, mantra, defination, coverUrl, createdDate })
}



Mantra.updateById = async function (id, { title, subtitle, mantra, defination, coverUrl, createdDate }) {
    const mantraCollection = collection(firestore, COLLECTION_NAME);
    const mantraDoc = doc(mantraCollection, id)
    const updateData = Utils.removeUndefineProperty({ title, subtitle, mantra, defination, coverUrl, createdDate })
    await setDoc(mantraDoc, { id: mantraDoc.id, ...updateData }, { merge: true })
}


Mantra.deleteById = async function (id) {
    const mantraDoc = doc(firestore, COLLECTION_NAME, id)
    const response = await deleteDoc(mantraDoc)
    console.log(response);
}









// const PlayingController = {
//     curPlayingIndex: 1,
//     playList: [AudioSource],
//     player: obj,
//     hasNext(){

//     },
//     next(){

//     }
// }