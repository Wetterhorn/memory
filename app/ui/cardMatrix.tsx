'use client'

import { Card } from "./card";
import { useState } from "react";
import styles from './cardMatrix.module.css';

export enum CardState {
    Covered,
    Uncovered,
    Removed
}

export type CardObj = {
    id: number,
    path: string,
    state: CardState
}

function generateCards(number: number):CardObj[]{
    const cards:CardObj[] = [];
    for(let i = 0; i < number; i++){
        cards.push({id: i, path: `/images/card_${number}`, state: CardState.Covered});
        cards.push({id: i, path: `/images/card_${number}`, state: CardState.Covered});
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
            const uncoveredCards = newCards.filter(c=>c.state===CardState.Uncovered);
            const card = newCards[i];
            if (card.state === CardState.Covered){
                card.state = CardState.Uncovered;
            } else if(card.state === CardState.Uncovered){
                card.state = CardState.Covered
            }
            setCards(newCards);

        }
        return handler;
    }
    const rows= new Array<CardObj[]>();
    for(let i = 0; i < width ; i++){
        rows.push([]);
        for(let j = 0; j < height; j ++){
            const index = i*height + j;
            const card = cards[index];
            rows[i].push(card);
        }
    }
    return (
        <div className={styles.container}>
            {rows.map((r,i)=><div key={`row_${i}`} className={styles.row}>{r.map((c,j)=><Card key={`card_${i}_${j}`} path={c.path} state={c.state} active={true} clickHandler={getHandler(i*height+j)} />)}</div>)}
        </div>
            
    );
}