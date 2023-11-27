import { useRouter } from "next/router";
import { useEffect } from "react";
import { PageAnalytics } from "../logger/browser-logger";

export default function useNextRouteAnalytics(){
    const router = useRouter();

    useEffect(() => {
        PageAnalytics.visited(router.asPath);
    }, [router.asPath]);
}