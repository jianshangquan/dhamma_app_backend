'use client'

import { useState, useImperativeHandle, forwardRef, useRef, useEffect } from 'react';

import useInView from '@/hook/useInView';
import { AnimatePresence, motion } from 'framer-motion';
import useResize from '@/hook/useResize';

export default forwardRef(function Page({ children = [], className = "w-full h-max" }, ref) {
    const pageRef = useRef();
    const [pageIndex, setPageIndex] = useState(0);
    const [size] = useResize(pageRef);

    useImperativeHandle(ref, () => ({
        setIndex: (index) => {
            setPageIndex(index);
        },
        switch: (ind = []) => {
            if (ind.length == 0) return;
            const arrIndex = ind.indexOf(pageIndex);
            if (arrIndex == ind.length - 1) return setPageIndex(ind[0]);
            setPageIndex(ind[arrIndex + 1]);
        },
        currentIndex: () => pageIndex,
        next: () => {
            setPageIndex(index => {
                return index + 1;
            });
        },
        prev: () => {
            setPageIndex(index => {
                return index - 1;
            });
        }
    }))


    useEffect(() => {
        pageRef.current.scrollTo({ left: (pageRef.current.offsetWidth * pageIndex) + 1, behavior: "smooth" })
    }, [pageIndex, size])
    


    return (
        <div ref={pageRef} className={`overflow-hidden relative flex transition-all duration-300 ${className}`}>
            <AnimatePresence>
                {children}
            </AnimatePresence>
        </div>
    )
})


export function ChildPage({ children, id, preRender = false, onVisibleChanged, animate = true, className = "min-w-full w-full min-h-max relative" }) {

    const ref = useRef();
    const isInView = useInView(ref, { threshold: 0.01 });


    useEffect(() => {
        onVisibleChanged && onVisibleChanged(isInView)
    }, [isInView])

    if (!animate)
        return (
            <div ref={ref} key={id} className={className}>
                {(isInView || preRender) && children}
            </div>
        )


        
    return (
        <motion.div
            key={id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            ref={ref} 
            className={className}>
            {(isInView || preRender) && children}
        </motion.div>
    )
}