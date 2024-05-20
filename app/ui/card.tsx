import Image from "next/image";
import { CardState } from "./cardMatrix";

export function Card({ path, state, active, clickHandler } : {path: string, state: CardState, active: boolean, clickHandler: Function }) {
    switch(state){
        case CardState.Covered:
            //Wenn Karte aufgedeckt
            break;
        case CardState.Uncovered:
            //Wenn Karte verdeckt
            break;
        case CardState.Removed:
            //Wenn Karte entfernt
            break;
    }
    return (
        <Image
              src="/images/papagei.png"
              alt="Memorykarte"
              width={100}
              height={100}
        />
    );
}