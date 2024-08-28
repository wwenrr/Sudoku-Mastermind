import React, { useEffect, useRef } from "react";
import { useState } from "react";
import style from "../css/Box_card.module.scss"
import { useParams } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate  } from 'react-router-dom';

const Box_card = ({ num }) => {
    const [ex, setEx] = useState([])
    const [loading, setLoad] = useState(false)
    const [final, setFinal] = useState([])

    const rand = (num) => {
        return Math.floor(Math.random() * 10 % num)
    }

    useEffect(() => {
        function cal_ans() {
            const temp = Array.from({ length: num }, (_, index) => index + 1)

            const tao_ma_tran = () => {
                const array = Array.from({ length: num }, (_, index) => {
                    if (index === 0) return [...temp];
                    return Array.from({ length: num }, (_, i) => {
                        if (i == 0) return temp[index];
                        return 0
                    });
                })

                for (let i = 1; i < 10; i++) {
                    const a = rand(num - 1) + 1;
                    const b = rand(num - 1) + 1;
                    if (a === b) continue;
                    [array[0][a], array[0][b]] = [array[0][b], array[0][a]]
                }

                for (let i = 1; i < 10; i++) {
                    const a = rand(num - 1) + 1;
                    const b = rand(num - 1) + 1;
                    if (a === b) continue;
                    [array[a][0], array[b][0]] = [array[b][0], array[a][0]]
                }

                for (let i = 1; i < num; i++) {
                    for (let j = 1; j < num; j++) {
                        const same_num = []
                        for (let a = 0; a < num; a++) {
                            const t1 = array[a][j]
                            const t2 = array[i][a]

                            if (t1 > 0) same_num.push(t1)
                            if (t2 > 0) same_num.push(t2)
                        }
                        let dif_num = temp.filter(item => !same_num.includes(item))

                        if (dif_num.length > 1) {
                            const index = rand(dif_num.length);
                            array[i][j] = dif_num[index];
                        }
                        else if (dif_num.length === 0) {
                            return 0;
                        }
                        else {
                            array[i][j] = dif_num[0];
                        }
                    }
                }

                return array;
            }

            let arr = 0;

            for (let i = 0; i < 1000; i++) {
                arr = tao_ma_tran();
                if (arr !== 0) {
                    return arr
                }
            }
        }

        function ex_cal(ans) {
            if (ans.length === 0) return
            let arr = []
            let copy = Array.from({ length: num }, () => {
                return Array.from({ length: num }, () => 0)
            })
            for (let i = 0; i < num * 2 + num / 2; i++) {
                let a = rand(num);
                let b = rand(num);
                if (a === b) {
                    i--;
                    continue;
                }

                arr.push({ i: a, j: b });
            }
            for (let i = 0; i < arr.length; i++) {
                const t1 = arr[i].i
                const t2 = arr[i].j

                copy[t1][t2] = ans[t1][t2]
            }

            return copy
        }

        function final_cal(ex) {
            const temp = JSON.parse(JSON.stringify(ex));

            for (let i = 0; i < num; i++) {
                for (let j = 0; j < num; j++) {
                    temp[i][j] = {
                        key: `${i}-${j}`,
                        val: ex[i][j],
                        pos: { i, j },
                        ex: ex,
                        setEx: setEx,
                    };
                }
            }

            return temp;
        }

        let ans = cal_ans()
        let ex = ex_cal(ans)
        let final = final_cal(ex)

        setFinal(final)
        setEx(ex)
        setLoad(true)
    }, [])


    const Small_box = ({ val }) => {
        const mod = final.length / 3;

        return (
            <>
                <div className={style.small_box}>
                    {
                        Array.from({ length: 9 }, (_, index) => {
                            let col = val % mod;
                            let row = (val === 0) ? 0 : Math.floor(val / mod)
                            let a = (index === 0) ? 0 : Math.floor(index / 3);
                            let b = (index === 0) ? 0 : Math.floor(index % 3);

                            // console.log("row:", row, "col:", col)

                            let i = 3 * row + a
                            let j = 3 * col + b

                            let key = `cell-${i}-${j}`;

                            // console.log("index:", index, "/",i, j)

                            if (final.length > 0 && final[i] && final[i][j])
                                return <Number_card
                                    id={final[i][j].key}
                                    key={final[i][j].key}
                                    canEdit={final[i][j].val === 0 ? 1 : 0}
                                    pos={final[i][j].pos}
                                    ex={ex}
                                    setEx={setEx}
                                />
                        })
                    }
                </div>
            </>
        )
    }

    const Number_card = React.memo(({ canEdit, pos, ex, setEx, id }) => {
        const handleClick = (e) => {
            const trigger = (ex[pos.i][pos.j] === num) ? 1 : ex[pos.i][pos.j] + 1;
            const temp = ex.map(row => row.slice());
            temp[pos.i][pos.j] = trigger;
            setEx(temp)
        }

        return (
            <>
                {canEdit === 1 && <div className={style.box} onClick={handleClick} id={id}>
                    {
                        ex[pos.i][pos.j] === 0 && <span></span>
                    }
                    {
                        ex[pos.i][pos.j] !== 0 &&
                        <span>{ex[pos.i][pos.j]}</span>
                    }
                </div>}
                {
                    canEdit === 0 &&
                    <div className={`${style.box} ${style.cant}`} id={id}>
                        {
                            ex[pos.i][pos.j] !== 0 &&
                            <span>{ex[pos.i][pos.j]}</span>
                        }
                    </div>
                }
            </>
        )
    })

    function soduku_check(arr) {
        console.log(ex)
        let warning = []
        for (let i = 0; i < num; i++) {
            let row = []
            let col = []
            for (let j = 0; j < num; j++) {
                if (ex[i][j] == 0) { warning.push([i, j]); }
                if (row.length > 0 && col.length > 0) {
                    for (let a = 0; a < row.length; a++) {
                        // console.log(row, col, row[a], col[a], ex[i][j])
                        if (row[a] != 0 && (row[a] === ex[i][j])) {
                            const canEdit = final[i][j].val === 0 ? 1 : 0
                            if (canEdit) warning.push([i, j])
                        }
                        if (col[a] != 0 && (col[a] === ex[j][i])) {
                            const canEdit = final[i][j].val === 0 ? 1 : 0
                            if (canEdit) warning.push([i, j])
                        }
                    }
                }

                row.push(ex[i][j])
                col.push(ex[j][i])
            }
            console.log(row, col)
        }

        for (let i = 0; i < warning.length; i++) {
            console.log(warning[i][0], warning[i][1])
            const element = document.getElementById(`${warning[i][0]}-${warning[i][1]}`);

            console.log(element)
            element.classList.add(style.shake)
        }

        if (warning.length > 0) return 0;
        else return 1;
    }

    const [win, setWin] = useState(false)

    return (
        <>
            {!win &&
                <>
                    <Link to="/" className={style.button}>New Game</Link>
                    <div className={`${style.button} ${style.confirm}`}
                        onClick={() => {
                            if (soduku_check(ex)) setWin(true);
                        }}
                    >
                        Confirm
                    </div>
                </>
            }

            {
                win &&
                <>
                    <Link to="/" className={style.button}>Play Again?</Link>
                    <div className={`${style.button} ${style.confirm} ${style.win}` }
                        onClick={() => {
                            if (soduku_check(ex)) setWin(true);
                        }}
                    >
                        You Win!
                    </div>
                </>
            }


            {loading && num === 9 && <div className={style[`box9`]}>
                {
                    Array.from({ length: num }, (_, index) => (
                        <Small_box key={index} val={index} />
                    ))
                }
            </div>}

            {loading && num === 6 && <div className={style[`box6`]}>
                {
                    Array.from({ length: 4 }, (_, index) => (
                        <Small_box key={index} val={index} />
                    ))
                }
            </div>}

            {loading && num === 3 && <div className={style[`box3`]}>
                {
                    Array.from({ length: 1 }, (_, index) => (
                        <Small_box key={index} val={index} />
                    ))
                }
            </div>}
        </>
    )
}

export default Box_card