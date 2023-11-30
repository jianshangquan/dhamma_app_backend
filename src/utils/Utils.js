import shortid from "shortid";
import withQuery from 'with-query';

const Utils = {
    searchParams(url) {
        const { searchParams } = new URL(url);
        return Object.fromEntries(searchParams.entries())
    },
    removeUndefineProperty(obj = {}){
        const ob = {};
        Object.entries(obj).forEach(([k, v]) => {
            if(v != undefined)
                ob[k] = v;
        })
        return ob;
    },
    uploadFile({ tag, groupid = shortid(), data = {} } = {}){
        const formData = new FormData();
        
        Object.entries(data).forEach(([k,v]) => {
            if(v instanceof File){
                return formData.append(k, v);
            }
        })

        return fetch(withQuery('/api/v1/file', { tag, groupid }), {
            method: 'POST',
            body: formData
        })
    }
}

export default Utils;