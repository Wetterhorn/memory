import { MouseEventHandler } from "react";
import { PlayerAdvice } from "../lib/definitions";
import styles from "./playAdviceButton.module.css";

export default function PlayAdviceButton ({state, clickHandler}:{state:PlayerAdvice, clickHandler: MouseEventHandler<HTMLImageElement>}){
    let text = ""
    switch (state){
        case PlayerAdvice.Start: text = "START";
        break;
        case PlayerAdvice.Game: text = "Abbruch";
        break;
        case PlayerAdvice.End: text = "Erneut spielen?";
        break;
    }


    return (
        <div className = {styles.container} onClick={clickHandler}>
            <span>{text}</span>
        </div>
    )
}
