import { useState } from "react";


export const NetworkState = Object.freeze({
    LOADING: 'loading',
    COMPLETED: 'completed',
    ERROR: 'error',
    NOT_INITIALIZE: 'not-initialized'
})


export default function useNetworkState(){
    const [state, setState] = useState({
        status: NetworkState.NOT_INITIALIZE,
        data: null,
        error: null
    });

    return {
        status: state,
        notInitialize: () => setState({ status: NetworkState.NOT_INITIALIZE, data: null, error: null }),
        completed: (data) => setState({ status: NetworkState.COMPLETED, data, error: null }),
        error: (error) => setState({ status: NetworkState.ERROR, data: null, error }),
        loading: () => setState({ status: NetworkState.LOADING, data: null, error: null }),
    }
}


