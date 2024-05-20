'use client'

import { Card } from "./card";
import { useState } from "react";

export enum CardState {
    Covered,
    Uncovered,
    Removed
}

export type CardObj = {
    path: string,
    state: CardState
}

function generateCards(number: number):CardObj[]{
    const cards:CardObj[] = [];
    for(let i = 0; i < number; i++){
        cards.push({path: `/images/card_${number}`, state: CardState.Covered});
        cards.push({path: `/images/card_${number}`, state: CardState.Covered});
    }
    for (let i = 0; i < number; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
    return cards;
}

export function CardMatrix({ width, height } : {width: number, height: number}) {
    const [cards, setCards] = useState(generateCards(width*height/2));

    return (
            cards.map(c=><Card key={c.path} path={c.path} state={c.state} active={true} clickHandler={(e:any)=>{}} />)
    );
}