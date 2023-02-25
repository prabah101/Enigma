import React, {useState, useEffect} from 'react'

import './Rotor.css'

export default function RotorNew() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const rotor1 = [
        [0, 18], [1, 23], [2, 5],
        [3, 2], [4, 25], [5, 3],
        [6, 8], [7, 22], [8, 9],
        [9, 1], [10, 20], [11, 7],
        [12, 13], [13, 14], [14, 4],
        [15, 0], [16, 17], [17, 16],
        [18, 6], [19, 12], [20, 21],
        [21, 11], [22, 19], [23, 24],
        [24, 10], [25, 15]
    ]
    const rotor2 = [
        [0, 16], [1, 19], [2, 21],
        [3, 22], [4, 6], [5, 7],
        [6, 4], [7, 24], [8, 2],
        [9, 3], [10, 9], [11, 0],
        [12, 25], [13, 12], [14, 1],
        [15, 15], [16, 10], [17, 8],
        [18, 17], [19, 20], [20, 23],
        [21, 13], [22, 11], [23, 14],
        [24, 18], [25, 5]
    ]
    const rotor3 = [
        [0, 3], [1, 20], [2, 10],
        [3, 25], [4, 1], [5, 23],
        [6, 15], [7, 22], [8, 13],
        [9, 0], [10, 11], [11, 5],
        [12, 24], [13, 6], [14, 12],
        [15, 4], [16, 14], [17, 9],
        [18, 17], [19, 7], [20, 18],
        [21, 16], [22, 21], [23, 19],
        [24, 8], [25, 2]
    ]

    const reflector = [
        15, 22, 19, 25, 17, 23, 21, 18,
        20, 16, 13, 24, 14, 10, 12, 0,
        9, 4, 7, 2, 8, 6, 1, 5,
        11, 3
    ]

    function reverseElement(array, reverseLetter) {
        for (let i = 0; i < array.length; i++) {
          let innerArray = array[i];
          if (innerArray[1] === reverseLetter) {
            return innerArray[0];
          }
        }
        return null;
    }

    const [rotor1Index, setRotor1Index] = useState(0)
    const [rotor2Index, setRotor2Index] = useState(0)
    const [rotor3Index, setRotor3Index] = useState(0)
    const [text, setText] = useState("")
    const [encryptText, setEncryptText] = useState("")

    function incrementRotor1(){
        if(rotor1Index === 25){
            setRotor1Index(0);
            incrementRotor2();
        }else{
            setRotor1Index(prevIndex => prevIndex + 1)
        }
    }
    function incrementRotor2(){
        if(rotor2Index === 25){
            setRotor2Index(0);
            incrementRotor3();
        }else{
            setRotor2Index(prevIndex => prevIndex + 1)
        }
    }
    function incrementRotor3(){
        if(rotor3Index === 25){
            setRotor3Index(0);
        }else{
            setRotor3Index(prevIndex => prevIndex + 1)
        }
    }

    function rotorIncrement1(){
            setRotor1Index(prevIndex => (prevIndex + 1)%26)
    }
    function rotorIncrement2(){
            setRotor2Index(prevIndex => (prevIndex + 1)%26)
    }
    function rotorIncrement3(){
            setRotor3Index(prevIndex => (prevIndex + 1)%26)
    }
    function rotorDecrement1(){
            if(rotor1Index === 0){
                setRotor1Index(25)
            }else{
                setRotor1Index(prevIndex => (prevIndex - 1))
            }
    }
    function rotorDecrement2(){
            if(rotor2Index === 0){
                setRotor2Index(25)
            }else{
                setRotor2Index(prevIndex => (prevIndex - 1))
            }
    }
    function rotorDecrement3(){
            if(rotor3Index === 0){
                setRotor3Index(25)
            }else{
                setRotor3Index(prevIndex => (prevIndex - 1))
            }
    }

    function encrypt(letter){
        if(letter == " "){
            setEncryptText(prevState => prevState + letter)
        }else{
            incrementRotor1();
            const encryptedIndex = alphabet.indexOf(letter)
            const stage1 = rotor1[(encryptedIndex + rotor1Index)%26][1]
            const stage2 = rotor2[stage1][1]
            const stage3 = rotor3[stage2][1]
            const stage4 = reflector[stage3]
            const stage5 = reverseElement(rotor3, stage4)
            const stage6 = reverseElement(rotor2, stage5)
            const stage7 = reverseElement(rotor1, (stage6 + rotor1Index)%26)
            const encryptedLetter = alphabet[stage7]
            setEncryptText(prevState => prevState + encryptedLetter)
            console.log(" stage 1 :" + stage1)
            console.log(" stage 2 :" + stage2)
            console.log(" stage 3 :" + stage3)
            console.log(" stage 4 :" + stage4)
            console.log(" stage 5 :" + stage5)
            console.log(" stage 6 :" + stage6)
            console.log(" stage 7 :" + stage7)
            
        }
    }

    function handleChange(e) {
        const {value} = e.target
        const cleanedValue  = value.toUpperCase().replace(/[^A-Z\s]/g, "")
        setText(cleanedValue)
        const letterToPass = cleanedValue[cleanedValue.length -1]
        if((letterToPass >= "A" && letterToPass <= "Z") || letterToPass == " "){
            encrypt(cleanedValue[cleanedValue.length -1])
        }
        
    }

    return (
        <div>
            <div className="rotor-container">
                <div className='rotors'>
                    <div className="rotor-text">
                        Rotor 1 : {rotor1Index + 1}
                    </div>
                    <div className="rotor-buttons">
                        <button onClick={rotorIncrement1}>up</button>
                        <button onClick={rotorDecrement1}>down</button>
                    </div>
                </div>
                <div className='rotors'>
                    <div className="rotor-text">
                        Rotor 2 : {rotor2Index + 1}
                    </div>
                    <div className="rotor-buttons">
                        <button onClick={rotorIncrement2}>up</button>
                        <button onClick={rotorDecrement2}>down</button>
                    </div>
                </div>
                <div className='rotors'>
                    <div className="rotor-text">
                        Rotor 3 : {rotor3Index + 1}
                    </div>
                    <div className="rotor-buttons">
                        <button onClick={rotorIncrement3}>up</button>
                        <button onClick={rotorDecrement3}>down</button>
                    </div>
                </div>
            </div>
            <div>
                <button onClick={incrementRotor1}>increment</button>
            </div>
            <textarea
                name="" 
                id="" 
                cols="30" 
                rows="10" 
                onChange={handleChange}
                value={text}
            />
            <div className="encrypted-msg">
                {encryptText}
            </div>
            {/* <input type="text" onKeyDownCapture={} /> */}
        </div>
    )
}
