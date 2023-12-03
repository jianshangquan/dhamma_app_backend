import { useEffect, useState } from "react";

export default function useComponentPigmengation(ref, onPigment, { threshold = 1, triggerOnce = true, dependicies = [] }) {
    const [pause, setPause] = useState(false);
    const [triggered, setTriggered] = useState(false);

    const trigger = () => {
        onPigment && onPigment();
        setTriggered(true);
    }

    useEffect(() => {
        const compoment = ref.current;
        const onScroll = (event) => {
            if(pause) return;
            
            const scroll = compoment.scrollTop + compoment.offsetHeight;
            const scrollHeight = compoment.scrollHeight;
            if (scroll / scrollHeight >= threshold) {
                if (triggerOnce) {
                    if(!triggered){
                        trigger();
                        return;
                    }
                    return;
                }

                trigger();
            }else{
                setTriggered(false);
            }
        };
        compoment.addEventListener('scroll', onScroll);
        return () => {
            compoment.removeEventListener('scroll', onScroll);
        }
    }, [ triggered, ...dependicies]);


    return {
        pause: () => setPause(true),
        start: () => setPause(false)
    }
    
}