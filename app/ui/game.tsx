'use client'

import { useRef, useState } from "react";
import { CardObj, CardState, Player, GameState, PlayerAdvice } from "../lib/definitions";
import { Score } from "./score";
import { CardMatrix } from "./cardMatrix";
import { PlayAdviceButton } from "./playAdviceButton";

export function Game({ width, height } : {width: number, height: number}){
    const [cards, setCards] = useState(generateCards(width*height/2));
    const [player, _setPlayer] = useState(Player.one);
    const playerRef = useRef(player);
    const setPlayer = (p:Player)=>{
        playerRef.current = p;
        _setPlayer(p);
    }
    const [gameState, _setGameState] = useState({player1:0, player2: 0, state: PlayerAdvice.Start});
    const gameStateRef = useRef(gameState);
    const setGameState = (gs:GameState) => {
        gameStateRef.current = gs;
        _setGameState(gs);
    }

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
                if (gameStateRef.current.state == PlayerAdvice.Start) setGameState({player1: gameStateRef.current.player1, player2: gameStateRef.current.player2, state: PlayerAdvice.Game}); 
                
                if (uncoveredCards.length==2){
                    
                    for (let i = 0; i< uncoveredCards.length; i++){
                        newCards[uncoveredCards[i].index].state=CardState.Covered;
                    }

                } else if(uncoveredCards.length < 2){
                    if(uncoveredCards.length ==1){
                        if (card.id == uncoveredCards[0].id){
                        card.state = CardState.Removed;
                        uncoveredCards[0].state=CardState.Removed;
                        card.player = playerRef.current;
                        uncoveredCards[0].player=playerRef.current;
                        let state = PlayerAdvice.Game;
                        if(gameStateRef.current.player1+gameStateRef.current.player2 == width*height/2 -1) state=PlayerAdvice.End;
                        if (card.player == Player.one) setGameState({player1: gameStateRef.current.player1+1, player2: gameStateRef.current.player2, state: state});
                        else setGameState({player1: gameStateRef.current.player1, player2: gameStateRef.current.player2+1, state: state});
                        }else{
                            if (playerRef.current == Player.one) setPlayer (Player.two);
                            else setPlayer(Player.one);
                        }

                    }else card.state = CardState.Uncovered;
                    
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
    function playerAdviceButtonHandler (){
        switch (gameStateRef.current.state){
            case PlayerAdvice.Start: setGameState({player1: 0, player2: 0, state: PlayerAdvice.Game});
            break;
            case PlayerAdvice.Game: setGameState ({player1: 0, player2: 0, state: PlayerAdvice.Start});
            restart();
            break;
            case PlayerAdvice.End: setGameState ({player1: 0, player2: 0, state: PlayerAdvice.Start});
            restart();
            break;

        }
    }

    function restart (){
    setCards (generateCards(cards.length/2))
    }
    function generateCards(number: number):CardObj[]{
        const cards:CardObj[] = [];
        for(let i = 0; i < number; i++){
            cards.push({id: i, path: `/images/card_${i}.jpg`, state: CardState.Covered, index: 0, player: Player.neutral, clickHandler: ()=>{}});
            cards.push({id: i, path: `/images/card_${i}.jpg`, state: CardState.Covered, index: 0, player: Player.neutral, clickHandler: ()=>{}});
        }
        for (let i = 0; i < 2*number; i++) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = cards[i];
            cards[i] = cards[j];
            cards[j] = temp;
        }
        for(let i = 0; i < 2*number; i++){
            cards[i].clickHandler = getHandler(i);
        }
        return cards;
    }
    return (
        <>
            <Score gameState={gameState} player = {player}/>
            <CardMatrix width={width} height={height} cards={cards}></CardMatrix>
            <PlayAdviceButton state = {gameState.state} clickHandler={playerAdviceButtonHandler}/>
        </>
    )
}