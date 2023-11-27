import shortid from "shortid";

export default function PlayList({
    id = shortid(),
    title = "",
    count = 10,
    createdDate = new Date(),
    items = []
} = {}){
    return {
        id, 
        title,
        count,
        createdDate,
        items
    }   
}


PlayList.video = function ({
    id = shortid(),
    title = "",
    count = 10,
    createdDate = new Date(),
    videos = []
}){
    return {
        id, 
        title,
        count,
        createdDate,
        videos
    } 
}





PlayList.audio = function ({
    id = shortid(),
    title = "",
    count = 10,
    createdDate = new Date(),
    audios = []
}){
    return {
        id, 
        title,
        count,
        createdDate,
        audios
    } 
}