
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { PageAnalytics } from "../logger/browser-logger";

export default function useReactRouteAnalytics(){
    const location = useLocation();

    useEffect(() => {
        PageAnalytics.visited(location);
    }, [location]);
}