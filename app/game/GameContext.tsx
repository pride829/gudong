import React, { createContext, useContext, useState, useEffect } from 'react';

function generateNumbersUpToN(n: number) {
    const numbers: number[] = [];
    for (let i = 0; i <= n; i++) {
        numbers.push(i);
    }
    return numbers;
}

function shuffleArray(array: object[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function shuffleArray2D(array: boolean[][]) {
    const newArray = array.map(row => [...row]); // Create a deep copy
    for (let i = newArray.length - 1; i > 0; i--) {
        for (let j = newArray[i].length - 1; j > 0; j--) {
            const m = Math.floor(Math.random() * (j + 1));
            [newArray[i][j], newArray[i][m]] = [newArray[i][m], newArray[i][j]];
        }
        const n = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[n]] = [newArray[n], newArray[i]]
    }
    return newArray;
}

interface GameContextProps {
    ANIMALS: string[];
    animalOrders: number[],
    setAnimalOrders: React.Dispatch<React.SetStateAction<number[]>>,
    animalReals: boolean[][],
}

export const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider = ({ children }) => {
    const ANIMALS = ['鼠', '牛', '虎', '兔', '龍', '蛇', '馬', '羊', '猴', '雞', '狗', '豬'];
    const [animalOrders, setAnimalOrders] = useState([...Array(12)]);
    const initialBooleanArray = [
        [true, true, false, false],
        [false, true, true, false],
        [false, false, true, true],
    ];
    const [animalReals, setAnimalReals] = useState(shuffleArray2D(initialBooleanArray));

    const contextValue: GameContextProps = {
        ANIMALS,
        animalOrders,
        setAnimalOrders,
        animalReals,
    };

    useEffect(() => {
        setAnimalOrders(shuffleArray(generateNumbersUpToN(12 - 1).map(number => ({ value: number }))));
    }, []); // Empty dependency array ensures this runs only once

    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    return useContext(GameContext);
};