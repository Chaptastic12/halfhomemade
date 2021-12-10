import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttp = () => {

    const [ submitting, setSubmitting ] = useState(false);
    const [ error, setError ] = useState();
    const genericErrorMsg = 'Something went wrong; please try again later';

    //Store across re-renders
    const activeHttpRequest = useRef([]);

    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {} ) =>{
        setSubmitting(true);

        //Link our request incase we need to cancel it
        const httpAbortController = new AbortController();
        activeHttpRequest.current.push(httpAbortController);

        try{
            const response = await fetch(url, {
                method,
                headers,
                body,
                signal: httpAbortController.signal
            });

            const responseData = await response.json();

            //if request complete, clear activeHttpRequests
            activeHttpRequest.current = activeHttpRequest.current.filter(reqCtrl => reqCtrl !== httpAbortController);

            //Ensure we got good data
            if(!response.ok){
                if(response.status === 400){
                    setError('Please fill in all the fields.');
                } else {
                    setError(genericErrorMsg);
                }
            }

            setSubmitting(false);

            return responseData;
        } catch(err){
            setSubmitting(false);
            setError(genericErrorMsg);
        }
    }, []);

    const clearError = () =>{
        setError(null);
    }

    //Theres a chance they navigate away while the request is processing
    //Abort the request if they do
    useEffect(() =>{
        return () =>{
            activeHttpRequest.current.forEach(abortCtrlr => abortCtrlr.abort());
        }
    })

    return { submitting, error, sendRequest, clearError }

}