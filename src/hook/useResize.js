import { useState, useEffect } from 'react';

export default function useResize(ref){
    const [size, setSize] = useState({
        width: 0,
        height: 0
    })
    const [entry, setEntry] = useState(null);

    useEffect(() => {
        const observer = new ResizeObserver(([entry]) => {
            setSize(entry.contentRect);
            setEntry(entry)
        });

        ref?.current && observer.observe(ref.current);

        return () => {
            observer.disconnect();
        }
    }, [])

    return [size, entry];
}