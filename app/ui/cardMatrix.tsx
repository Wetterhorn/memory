import Card from "./card";
import styles from './cardMatrix.module.css';

import { CardObj} from "../lib/definitions";


export default function CardMatrix({ width, height, cards} : {width: number, height: number, cards: CardObj[]}) {
    //const Card = dynamic(() => import('./card'), { ssr: false })
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
                {rows.map((r,i)=><div key={`row_${i}`} className={styles.row}>{r.map((c,j)=><Card key={`card_${i}_${j}`} path={c.path} state={c.state} player={c.player} clickHandler={c.clickHandler} />)}</div>)}
            </div>    
    );
}