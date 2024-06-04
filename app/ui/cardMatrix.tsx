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
    state: CardState,
    index: number,
    player: Player.neutral
}

export enum Player {
    neutral,
    one,
    two
}

function generateCards(number: number):CardObj[]{
    const cards:CardObj[] = [];
    for(let i = 0; i < number; i++){
        cards.push({id: i, path: `/images/card_${i}.jpg`, state: CardState.Covered, index: 0, player: Player.neutral});
        cards.push({id: i, path: `/images/card_${i}.jpg`, state: CardState.Covered, index: 0, player: Player.neutral});
    }
    for (let i = 0; i < 2*number; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
    return cards;
}

export function CardMatrix({ width, height } : {width: number, height: number}) {
    const [cards, setCards] = useState(generateCards(width*height/2));
    const [player, setPlayer] = useState(Player.one);
    function getHandler(i:number){
        const handler = () => {
            const newCards = [...cards];
            const uncoveredCards = newCards.filter((c,i)=>{
                c.index = i;
                return c.state===CardState.Uncovered;
            });
            const card = newCards[i];
            if (card.state === CardState.Covered) {
                card.state = CardState.Uncovered;
                
                if (uncoveredCards.length==2){
                    
                    for (let i = 0; i< uncoveredCards.length; i++){
                        newCards[uncoveredCards[i].index].state=CardState.Covered;
                    }

                } else if(uncoveredCards.length < 2){
                    if(uncoveredCards.length ==1 && card.id == uncoveredCards[0].id){
                        card.state = CardState.Removed;
                        uncoveredCards[0].state=CardState.Removed;
                    }
                    else card.state = CardState.Uncovered;
                    
                }
            } else if(card.state === CardState.Uncovered && uncoveredCards.length == 2){
                for (let i = 0; i < uncoveredCards.length; i++){
                    newCards[uncoveredCards[i].index].state = CardState.Covered;
                }
            }
            setCards(newCards);

        }
        return handler;
    }
    const rows= new Array<CardObj[]>();
    for(let i = 0; i < height ; i++){
        rows.push([]);
        for(let j = 0; j < width; j ++){
            const index = i*width + j;
            const card = cards[index];
            rows[i].push(card);
        }
    }
    return (
        <div className={styles.container}>
            {rows.map((r,i)=><div key={`row_${i}`} className={styles.row}>{r.map((c,j)=><Card key={`card_${i}_${j}`} path={c.path} state={c.state} clickHandler={getHandler(i*height+j)} />)}</div>)}
        </div>
            
    );
}