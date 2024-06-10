import Image from "next/image";
import { CardState, Player } from "../lib/definitions";
import styles from './card.module.css';
import { MouseEventHandler } from "react";

export function Card({ path, state, player, clickHandler } : {path: string, state: CardState, player: Player,  clickHandler: MouseEventHandler<HTMLImageElement> }) {
    var p = styles.neutral;
    switch(player){
        case Player.one:
            p = styles.one;
            break;
        case Player.two:
            p = styles.two;
            break;

    }
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
                      className = {styles.card+" "+p}
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
                      className = {styles.card+' '+styles.removed+" "+p}
                />
            );
    }
}