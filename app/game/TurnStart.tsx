import React from 'react';
import { useGameContext } from './GameContext';

function TurnStart({ turnNumber }) {
    const { ANIMALS, animalOrders } =
        useGameContext() ?? {
            ANIMALS: [],
            animalOrders: [],
            animalReals: [],
        };

    const ANIMAL_DISPLAY_IN_ONE_TURN = 4
    const turnInChinese = ['一', '二', '三']

    const renderedElements = Array.from({
        length: ANIMAL_DISPLAY_IN_ONE_TURN
    }, (_, index) => (
        <div className="word" key={index}>
            {ANIMALS[
                animalOrders[
                index + turnNumber * ANIMAL_DISPLAY_IN_ONE_TURN
                ]
            ]}
        </div>
    ));

    return (
        <div>
            <div>第{turnInChinese[turnNumber]}回合</div>
            <div className="parallel-words">
                {renderedElements}
            </div>
        </div>
    )
}

export default TurnStart;