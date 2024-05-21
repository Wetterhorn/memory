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
    function getHandler(i:number){
        const handler = () => {
            const newCards = [...cards];
            const card = newCards[i]
            if (card.state === CardState.Covered){
                card.state = CardState.Uncovered;
            } else if(card.state === CardState.Uncovered){
                card.state = CardState.Covered
            }
            setCards(newCards);

        }
        return handler;
    }
    return (
            cards.map((c,i)=><Card key={c.path} path={c.path} state={c.state} active={true} clickHandler={getHandler(i)} />)
    );
}