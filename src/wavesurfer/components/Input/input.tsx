import React from "react";
import styles from "./input.module.css";

const Input: React.FC<{ onLoadSound: React.ChangeEventHandler<HTMLInputElement> }> = ({ 
    onLoadSound 
}) => {
    return (
        <>
            <input
                name="wavinput"
                type="file"
                onChange={onLoadSound}
            />
        </>
    )
}

export default Input