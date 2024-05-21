import Image from "next/image";
import { CardState } from "./cardMatrix";
import styles from './card.module.css';
import { MouseEventHandler } from "react";

export function Card({ path, state, active, clickHandler } : {path: string, state: CardState, active: boolean, clickHandler: MouseEventHandler<HTMLImageElement> }) {
    switch(state){
        case CardState.Covered:
            return(
                <div className={styles.back} onClick = {clickHandler}></div>
            )
        case CardState.Uncovered:
            return (
                <Image
                      src="/images/papagei.png"
                      alt="Memorykarte"
                      width={100}
                      height={100}
                      onClick = {clickHandler}
                />
            );
        case CardState.Removed:
            return (
                <Image
                      src="/images/papagei.png"
                      alt="Memorykarte"
                      width={100}
                      height={100}
                      className = {styles.removed}
                />
            );
    }
}