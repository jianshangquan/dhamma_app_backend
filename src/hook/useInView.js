import { useState, useEffect } from "react"

export default function useInView(ref, option = { threshold: 1 }) {

    const [isIntersecting, setIntersecting] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIntersecting(entry.isIntersecting,)
            },
            option
        )
        ref.current && observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return isIntersecting
}