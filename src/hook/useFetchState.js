import { useState } from "react";


export const FetchState = Object.freeze({
    LOADING: 'loading',
    COMPLETED: 'completed',
    ERROR: 'error',
    NOT_INITIALIZE: 'not-initialized'
})


export default function useFetchState(){
    const [state, setState] = useState({
        status: FetchState.NOT_INITIALIZE,
        data: null,
        message: null,
        error: null,
        progress: 0,
    });

    return {
        status: state,
        notInitialize: () => setState({ status: FetchState.NOT_INITIALIZE, data: null, error: null, progress: 0, message: '' }),
        completed: ({data, message} = {}) => setState({ status: FetchState.COMPLETED, data, error: null, progress: 100, message }),
        error: ({error, message} = {}) => setState({ status: FetchState.ERROR, data: null, error, progress: 0, message }),
        loading: (progress = 0, message) => setState({ status: FetchState.LOADING, data: null, error: null, progress, message }),
    }
}


