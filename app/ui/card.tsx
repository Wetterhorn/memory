import Image from "next/image";
import { CardState} from "./cardMatrix";
import styles from './card.module.css';
import { MouseEventHandler } from "react";

export function Card({ path, state, clickHandler } : {path: string, state: CardState, clickHandler: MouseEventHandler<HTMLImageElement> }) {
    switch(state){
        case CardState.Covered:
            return(
                <div className={styles.card+' '+styles.back} onClick = {clickHandler}></div>
            )
        case CardState.Uncovered:
            return (
                <Image
                      src={path}
                      alt="Memorykarte"
                      width={100}
                      height={100}
                      className = {styles.card}
                      onClick = {clickHandler}
                />
            );
        case CardState.Removed:
            return (
                <Image
                      src={path}
                      alt="Memorykarte"
                      width={100}
                      height={100}
                      className = {styles.card+' '+styles.removed}
                />
            );
    }
}