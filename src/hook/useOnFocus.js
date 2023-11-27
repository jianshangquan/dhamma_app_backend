import { useEffect } from "react";

export default function useOnFocusWindow(callback, dependencies = []){

    const func = {
        attatchEvent: () => window.addEventListener('focus', callback),
        detachEvent: () => window.removeEventListener('focus', callback)
    }

    useEffect(() => {
        func.attatchEvent();
        return () => func.detachEvent();
    }, dependencies)

    return func
}