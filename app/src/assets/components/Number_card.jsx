import React, { useState } from "react";
import style from '../css/Number_card.module.scss'

const Number_card = ({val}) => {
    const [num, setNum] = useState(0)

    const handleClick = (e) => {
        console.log(val)
        setNum(num => {
            if(num == 9) return 1;
            return num+1;
        })
    }

    return(
        <>
            {val != 0 && <div className={style.box} onClick={handleClick}>
                {
                    num === 0 && <span></span>
                }
                {
                    num !== 0 &&
                    <span>{num}</span>
                }
            </div>}
        </>
    )
}

export default Number_card