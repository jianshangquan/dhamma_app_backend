import { useRef, useEffect } from "react";

export default function useComponentDidMount () {
    const ref = useRef();
    useEffect(() => {
      ref.current = true;
    }, []);
    return ref.current;
  };