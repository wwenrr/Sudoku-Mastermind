import React, { useEffect, useState } from "react";
import style from '../css/Number_card.module.scss'
import { useParams } from "react-router-dom";
import Box_card from "./Box_card";

const Number_card = () => {
    const [num, setNum] = useState(3);
    const { mode } = useParams();
    const [load, setLoad] = useState(true);

    useEffect(() => {
        setNum(parseInt(mode, 10)); 
        setLoad(false); 

        console.log(num);
        
    }, [num])
        
    return(
        <>
            {!load  && <Box_card num={num} />}
        </>
    )
}

export default Number_card