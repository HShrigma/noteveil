import { useEffect, useState } from "react";

interface ErrorHintProps {
    message: string;
    toValidate: string;
    triggerCheck: boolean;
    className?: string;
}

export const ErrorHint = ({ message, toValidate, triggerCheck, className = "" }: ErrorHintProps) => {
    const [isValid,setIsValid] = useState(true);

    useEffect(() => {
        if(triggerCheck){
            setIsValid(toValidate.trim() !== '');
        }
        else setIsValid(true);
     }, [triggerCheck, toValidate]);

    if (isValid) return <></>;
    return <div className={`self-start error-hint ${className}`}> {message}</div>;
            
};

export default ErrorHint;