import shortid from "shortid";
import withQuery from 'with-query';



const Utils = {
    searchParams(url) {
        const { searchParams } = new URL(url);
        return Object.fromEntries(searchParams.entries())
    },
    removeUndefineProperty(obj = {}) {
        const ob = {};
        Object.entries(obj).forEach(([k, v]) => {
            if (v != undefined)
                ob[k] = v;
        })
        return ob;
    },
    uploadFile({ tag, groupid = shortid(), data = {} } = {}) {
        const formData = new FormData();

        Object.entries(data).forEach(([k, v]) => {
            if (v instanceof File) {
                return formData.append(k, v);
            }
        })

        return fetch(withQuery('/api/v1/file', { tag, groupid }), {
            method: 'POST',
            body: formData
        })
    },
    convertSecondsToHoursMinutesAndSeconds(seconds) {
        // Calculate hours, minutes, and remaining seconds
        var hours = Math.floor(seconds / 3600);
        var minutes = Math.floor((seconds % 3600) / 60);
        var remainingSeconds = seconds % 60;

        // Create a string representation in the format "HH:MM:SS"
        var result =
            (hours < 10 ? "0" : "") + hours + ":" +
            (minutes < 10 ? "0" : "") + minutes + ":" +
            (remainingSeconds < 10 ? "0" : "") + remainingSeconds.toFixed(0);

        return result;
    }
}

export default Utils;