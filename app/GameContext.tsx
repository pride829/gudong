import { init } from 'next/dist/compiled/webpack/webpack';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSsrLocalStorage } from './util/useSsrLocalStorage';

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
    setAnimalOrders: React.Dispatch<number[] > ,
    animalReals: boolean[][],
    characters: number[],
    setCharacters: React.Dispatch<number[] >,
    characterList: string[],
    setCharacterList: React.Dispatch<string[] >,
    beingGankedTime: number[],
    setBeingGankedTime: React.Dispatch<number[] >,
    dummy: number,
    setDummy: React.Dispatch<number >,
    civHuangBlockedTurn: number,
    civMuBlockedTurn: number,
    animalBlocked: boolean[],
    setAnimalBlocked: React.Dispatch<boolean[] >,
    animalRealAltered: boolean[],
    setAnimalRealAltered: React.Dispatch<boolean[] >,
    identedPeople: number[],
    setIdentedPeople: React.Dispatch<number[] >,
    votedAnimals: boolean[],
    setVotedAnimals: React.Dispatch<boolean[] >,
    bossVoted: number[],
    setBossVoted: React.Dispatch<number[] >,
    xuVoted: number,
    setXuVoted: React.Dispatch<number >,
    funVoted: number,
    setFunVoted: React.Dispatch<number >,
    gameLog: string[],
    addGameLog: (s: string) => void,
    setGameLog: React.Dispatch<string[] >,
    isLaiEffected: boolean,
    isXuDisplayFirstDirectorFactionInfo: boolean,
    beingPoisonedTime: number[],
    setBeingPoisonedTime: React.Dispatch<number[] >,
    poisonUsedTime: number,
    setPoisonUsedTime: React.Dispatch<number >,
    beingConfusedPlayerIndex: number[],
    setBeingConfusedPlayerIndex: React.Dispatch<number[] >,
}

export const GameContext = createContext<GameContextProps>({} as GameContextProps);

export const GameProvider = ({ children }) => {
    const ANIMALS = ['鼠', '牛', '虎', '兔', '龍', '蛇', '馬', '羊', '猴', '雞', '狗', '豬'];
    const CHINESE = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    //const [animalOrders, setAnimalOrders] = useState<number[]>([]);
    const [animalOrders, setAnimalOrders] = useSsrLocalStorage<number[]>('animalOrders', [])
    const initialBooleanArray = [
        [true, true, false, false],
        [false, true, true, false],
        [false, false, true, true],
    ];
    //const [animalReals, setAnimalReals] = useState(initialBooleanArray);
    const [animalReals, setAnimalReals] = useSsrLocalStorage<boolean[][]>('animalReals', initialBooleanArray)
    //const [animalRealAltered, setAnimalRealAltered] = useState([false, false, false])
    const [animalRealAltered, setAnimalRealAltered] = useSsrLocalStorage<boolean[]>('animalRealAltered', [false, false, false])
    //const [characters, setCharacters] = useState<number[]>([1, 2, 7, 3, 4, 5, 6, 0]); // characterList[character[0]] === '黃煙煙' 代表玩家0的角色是黃煙煙
    //const [characters, setCharacters] = useState<number[]>([])
    const [characters, setCharacters] = useSsrLocalStorage<number[]>('characters', [])
    //const [beingGankedTime, setBeingGankedTime] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0]); // 被偷襲的次數
    const [beingGankedTime, setBeingGankedTime] = useSsrLocalStorage<number[]>('beingGankedTime', [0, 0, 0, 0, 0, 0, 0, 0])   // 被偷襲的次數
    //const [beingPoisonedTime, setBeingPoisonedTime] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0]);
    const [beingPoisonedTime, setBeingPoisonedTime] = useSsrLocalStorage<number[]>('beingPoisonedTime', [0, 0, 0, 0, 0, 0, 0, 0])
    //const [beingConfusedPlayerIndex, setBeingConfusedPlayerIndex] = useState([-1, -1, -1])
    const [beingConfusedPlayerIndex, setBeingConfusedPlayerIndex] = useSsrLocalStorage<number[]>('beingConfusedPlayerIndex', [-1, -1, -1])
    //const [poisonUsedTime, setPoisonUsedTime] = useState(0)
    const [poisonUsedTime, setPoisonUsedTime] = useSsrLocalStorage<number>('poisonUsedTime', 0)
    // const [dummy, setDummy] = useState<number>(0)
    const [dummy, setDummy] = useSsrLocalStorage<number>('dummy', 0)
   // const [identedPeople, setIdentedPeople] = useState<number[]>([])
    const [identedPeople, setIdentedPeople] = useSsrLocalStorage<number[]>('identedPeople', [])
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    //const [civHuangBlockedTurn, setCivHuangBlockedTurn] = useState(getRandomInt(0, 3))
    const [civHuangBlockedTurn, setCivHuangBlockedTurn] = useSsrLocalStorage<number>('civHuangBlockedTurn', getRandomInt(0, 3))
    //const [civMuBlockedTurn, setCivMuBlockedTurn] = useState(getRandomInt(0, 3))
    const [civMuBlockedTurn, setCivMuBlockedTurn] = useSsrLocalStorage<number>('civMuBlockedTurn', getRandomInt(0, 3))
    //const [animalBlocked, setAnimalBlocked] = useState([false, false, false, false, false, false, false, false, false, false, false, false])
    const [animalBlocked, setAnimalBlocked] = useSsrLocalStorage<boolean[]>('animalBlocked', [false, false, false, false, false, false, false, false, false, false, false, false])
    //const [votedAnimals, setVotedAnimals] = useState([false, false, false, false, false, false, false, false, false, false, false, false])
    const [votedAnimals, setVotedAnimals] = useSsrLocalStorage<boolean[]>('votedAnimals', [false, false, false, false, false, false, false, false, false, false, false, false])
    //const [bossVoted, setBossVoted] = useState([0, 0, 0, 0, 0, 0, 0, 0])
    const [bossVoted, setBossVoted] = useSsrLocalStorage<number[]>('bossVoted', [0, 0, 0, 0, 0, 0, 0, 0])
    // const [xuVoted, setXuVoted] = useState(-1)
    const [xuVoted, setXuVoted] = useSsrLocalStorage<number>('xuVoted', -1) 
    // const [funVoted, setFunVoted] = useState(-1)
    const [funVoted, setFunVoted] = useSsrLocalStorage<number>('funVoted', -1)
    // const [gameLog, setGameLog] = useState<string[]>([])
    const [gameLog, setGameLog] = useSsrLocalStorage<string[]>('gameLog', [])
    // const [isXuDisplayFirstDirectorFactionInfo, setIsXuDisplayFirstDirectorFactionInfo] = useState(Math.random() < 0.5)
    const [isXuDisplayFirstDirectorFactionInfo, setIsXuDisplayFirstDirectorFactionInfo] = useSsrLocalStorage<boolean>('isXuDisplayFirstDirectorFactionInfo', Math.random() < 0.5)
    // const [isLaiEffected, setIsLaiEffected] = useState(Math.random() < 0.5)
    const [isLaiEffected, setIsLaiEffected] = useSsrLocalStorage<boolean>('isLaiEffected', Math.random() < 0.5)
    function addGameLog(s: string) {
        //console.log(s)
        //console.log(gameLog)
        setGameLog([...gameLog, s])
    }

    // static character list
    //const [characterList, setCharacterList] = useState(['許願', '方震', '黃煙煙', '木戶加奈', '老朝奉', '藥不然', '鄭國渠', '大眼賊'])
    //const [characterList, setCharacterList] = useState(['許願', '方震', '黃煙煙', '木戶加奈', '老朝奉', '藥不然', '鄭國渠', '姬雲浮'])
    const [characterList, setCharacterList] = useSsrLocalStorage<string[]>('characterList', ['許願', '方震', '黃煙煙', '木戶加奈', '老朝奉', '藥不然', '鄭國渠', '姬雲浮'])
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
        isLaiEffected,
        isXuDisplayFirstDirectorFactionInfo,
        beingPoisonedTime,
        setBeingPoisonedTime,
        poisonUsedTime,
        setPoisonUsedTime,
        beingConfusedPlayerIndex,
        setBeingConfusedPlayerIndex,
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