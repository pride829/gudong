import React, { createContext, useContext, useState, useEffect } from 'react';

function generateNumbersUpToN(n: number) {
    const numbers: number[] = [];
    for (let i = 0; i <= n; i++) {
        numbers.push(i);
    }
    return numbers;
}

function shuffleArray(array: number[]) {
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

function sortGroups(array, groupSize) {
    const result: number[] = []
    for (let i = 0; i < array.length; i += groupSize) {
        const group: number[] = array.slice(i, i + groupSize);
        group.sort((a, b) => a - b)
        result.push(...group)
    }
    return result
}

interface GameContextProps {
    ANIMALS: string[];
    animalOrders: number[],
    setAnimalOrders: React.Dispatch<React.SetStateAction<number[]>>,
    animalReals: boolean[][],
    characters: number[],
    setCharacters: React.Dispatch<React.SetStateAction<number[]>>,
    CHARACTERLIST: string[],
    beingGankedTime: number[],
    setBeingGankedTime: React.Dispatch<React.SetStateAction<number[]>>,
    dummy: number,
    setDummy: React.Dispatch<React.SetStateAction<number>>,
    civHuangBlockedTurn: number,
    civMuBlockedTurn: number,
    animalBlocked: boolean[],
    setAnimalBlocked: React.Dispatch<React.SetStateAction<boolean[]>>,
    animalRealAltered: boolean[],
    setAnimalRealAltered: React.Dispatch<React.SetStateAction<boolean[]>>,
    identedPeople: number[],
    setIdentedPeople: React.Dispatch<React.SetStateAction<number[]>>,
}

export const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider = ({ children }) => {
    const ANIMALS = ['鼠', '牛', '虎', '兔', '龍', '蛇', '馬', '羊', '猴', '雞', '狗', '豬'];
    const [animalOrders, setAnimalOrders] = useState<number[]>([]);
    const initialBooleanArray = [
        [true, true, false, false],
        [false, true, true, false],
        [false, false, true, true],
    ];
    const [animalReals, setAnimalReals] = useState(shuffleArray2D(initialBooleanArray));
    const [animalRealAltered, setAnimalRealAltered] = useState([true, false, false])
    const [characters, setCharacters] = useState<number[]>([6, 5, 6, 0, 0, 0, 0, 0]); // CHARACTERLIST[character[0]] === '黃煙煙' 代表玩家0的角色是黃煙煙
    const [beingGankedTime, setBeingGankedTime] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0]); // 被偷襲的次數
    const [dummy, setDummy] = useState<number>(0)
    const [identedPeople, setIdentedPeople] = useState<number[]>([])

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    const [civHuangBlockedTurn, setCivHuangBlockedTurn] = useState(getRandomInt(0, 3))
    const [civMuBlockedTurn, setCivMuBlockedTurn] = useState(getRandomInt(0, 3))
    const [animalBlocked, setAnimalBlocked] = useState([false, false, false, false, false, false, false, false])


    // static character list
    const CHARACTERLIST = ['許願', '方震', '姬雲浮', '黃煙煙', '木戶加奈', '老朝奉', '藥不然', '鄭國渠']

    const contextValue: GameContextProps = {
        ANIMALS,
        animalOrders,
        setAnimalOrders,
        animalReals,
        characters,
        setCharacters,
        CHARACTERLIST,
        beingGankedTime,
        setBeingGankedTime,
        dummy,
        setDummy,
        civHuangBlockedTurn,
        civMuBlockedTurn,
        animalBlocked,
        setAnimalBlocked,
        animalRealAltered,
        setAnimalRealAltered,
        identedPeople,
        setIdentedPeople,
    };


    useEffect(() => {
        const tempAnimalOrders = shuffleArray(generateNumbersUpToN(12 - 1))
        setAnimalOrders(sortGroups(tempAnimalOrders, 4))
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