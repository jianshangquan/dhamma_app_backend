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
    }
}

export default Utils;