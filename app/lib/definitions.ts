import { MouseEventHandler } from "react"

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
    player: Player,
    clickHandler: MouseEventHandler<HTMLImageElement>
}

export type GameState = {
    player1: number,
    player2: number
}

export enum Player {
    neutral,
    one,
    two
}