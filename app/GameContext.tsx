import { init } from 'next/dist/compiled/webpack/webpack';
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

function shuffleArray2DnTimes(array: boolean[][], n: number) {
    let newArray = array.map(row => [...row]); // Create a deep copy
    for (let i = 0; i < n; i++) {
        newArray = shuffleArray2D(newArray)
    }
    return newArray
}

function shuffleArray2D(array: boolean[][]) {
    const newArray = array.map(row => [...row]); // Create a deep copy
    for (let i = newArray.length - 1; i > 0; i--) {
        for (let j = newArray[i].length - 1; j > 0; j--) {
            const m = Math.floor(Math.random() * (j + 1));
            //console.log(j, m);
            //console.log(newArray);
            [newArray[i][j], newArray[i][m]] = [newArray[i][m], newArray[i][j]];
            //console.log(newArray)
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
    CHINESE: string[];
    animalOrders: number[],
    setAnimalOrders: React.Dispatch<React.SetStateAction<number[]>>,
    animalReals: boolean[][],
    characters: number[],
    setCharacters: React.Dispatch<React.SetStateAction<number[]>>,
    characterList: string[],
    setCharacterList: React.Dispatch<React.SetStateAction<string[]>>,
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
    votedAnimals: boolean[],
    setVotedAnimals: React.Dispatch<React.SetStateAction<boolean[]>>,
    bossVoted: number[],
    setBossVoted: React.Dispatch<React.SetStateAction<number[]>>,
    xuVoted: number,
    setXuVoted: React.Dispatch<React.SetStateAction<number>>,
    funVoted: number,
    setFunVoted: React.Dispatch<React.SetStateAction<number>>,
    gameLog: string[],
    addGameLog: (s: string) => void,
    setGameLog: React.Dispatch<React.SetStateAction<string[]>>,
}

export const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider = ({ children }) => {
    const ANIMALS = ['鼠', '牛', '虎', '兔', '龍', '蛇', '馬', '羊', '猴', '雞', '狗', '豬'];
    const CHINESE = ['甲', '乙', '丙', '丁', '戊', '已', '庚', '辛', '申', '酉', '戌', '亥'];
    const [animalOrders, setAnimalOrders] = useState<number[]>([]);
    const initialBooleanArray = [
        [true, true, false, false],
        [false, true, true, false],
        [false, false, true, true],
    ];
    const [animalReals, setAnimalReals] = useState(initialBooleanArray);
    const [animalRealAltered, setAnimalRealAltered] = useState([false, false, false])
    //const [characters, setCharacters] = useState<number[]>([1, 2, 7, 3, 4, 5, 6, 0]); // characterList[character[0]] === '黃煙煙' 代表玩家0的角色是黃煙煙
    const [characters, setCharacters] = useState<number[]>([])
    const [beingGankedTime, setBeingGankedTime] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0]); // 被偷襲的次數
    const [dummy, setDummy] = useState<number>(0)
    const [identedPeople, setIdentedPeople] = useState<number[]>([])

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    const [civHuangBlockedTurn, setCivHuangBlockedTurn] = useState(getRandomInt(0, 3))
    const [civMuBlockedTurn, setCivMuBlockedTurn] = useState(getRandomInt(0, 3))
    const [animalBlocked, setAnimalBlocked] = useState([false, false, false, false, false, false, false, false, false, false, false, false])
    const [votedAnimals, setVotedAnimals] = useState([false, false, false, false, false, false, false, false, false, false, false, false])
    const [bossVoted, setBossVoted] = useState([0, 0, 0, 0, 0, 0, 0, 0])
    const [xuVoted, setXuVoted] = useState(-1)
    const [funVoted, setFunVoted] = useState(-1)
    const [gameLog, setGameLog] = useState<string[]>([])

    function addGameLog(s: string) {
        console.log(s)
        setGameLog((prevLog) => { return ([...prevLog, s]) })
    }

    // static character list
    const [characterList, setCharacterList] = useState(['許願', '方震', '黃煙煙', '木戶加奈', '老朝奉', '藥不然', '鄭國渠', '大眼賊'])
    //  const [characterList, setCharacterList] = useState(['許願', '方震', '黃煙煙', '木戶加奈', '老朝奉', '藥不然', '鄭國渠', '姬雲浮'])
    const contextValue: GameContextProps = {
        ANIMALS,
        animalOrders,
        setAnimalOrders,
        animalReals,
        characters,
        setCharacters,
        characterList,
        setCharacterList,
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
        votedAnimals,
        setVotedAnimals,
        bossVoted,
        setBossVoted,
        xuVoted,
        setXuVoted,
        funVoted,
        setFunVoted,
        gameLog,
        addGameLog,
        setGameLog,
        CHINESE,
    };


    useEffect(() => {
        const tempAnimalOrders = shuffleArray(shuffleArray(shuffleArray(generateNumbersUpToN(12 - 1))))
        setAnimalOrders(sortGroups(tempAnimalOrders, 4))
        const tempAnimalReals = shuffleArray2DnTimes(initialBooleanArray, 100)
        setAnimalReals(tempAnimalReals)
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