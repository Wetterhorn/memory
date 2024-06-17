import { GameState, Player } from "../lib/definitions";
import styles from "./score.module.css";

export default function Score ({gameState, player}:{gameState:GameState, player: Player}){
    return (
        <div>
            <div className = {player == Player.one? styles.player1: styles.neutral}>Player one:{gameState.player1} </div>
            <div className = {player == Player.two? styles.player2: styles.neural}>Player two:{gameState.player2}</div>
        </div>

    )
}