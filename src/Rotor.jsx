import React, {useState, useEffect} from 'react'

import './Rotor.css'

export default function Rotor() {

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const rotor1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const rotor2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const rotor3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const reflector = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // const rotor1 = "EKMFLGDQVZNTOWYHXUSPAIBRCJ";
    // const rotor2 = "AJDKSIRUXBLHWTMCQGZNPYFVOE";
    // const rotor3 = "BDFHJLCPRTXVZNYEIWGAKMUSQO";
    // const reflector = "EJMZALYXVBWFCRQUONTSPIKHGD";

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
        incrementRotor1();
        if(letter == " "){
            setEncryptText(prevState => prevState + letter)
        }else{
            const stage1 = rotor1[alphabet.indexOf(letter) + rotor1Index]
            const stage2 = rotor2[alphabet.indexOf(stage1) + rotor2Index]
            const stage3 = rotor3[alphabet.indexOf(stage2) + rotor3Index]
            const stage4 = reflector[alphabet.indexOf(stage3)]
            const stage5 = rotor3[alphabet.indexOf(stage4) + rotor3Index]
            const stage6 = rotor2[alphabet.indexOf(stage5) + rotor2Index]
            const stage7 = rotor1[alphabet.indexOf(stage6) + rotor1Index]
            setEncryptText(prevState => prevState + stage7)
            console.log(" stage 1 :" + stage1)
            console.log(" stage 2 :" + stage2)
            console.log(" stage 3 :" + stage3)
            console.log(" stage 4 :" + stage4)
            console.log(" stage 5 :" + stage5)
            console.log(" stage 6 :" + stage6)
            console.log(" stage 7 :" + stage7)
            
        }
    }

    // useEffect(() => {
    //     encrypt(text[text.length -1])
    // },[text])

    function handleChange(e) {
        const {value} = e.target
        const cleanedValue  = value.toUpperCase().replace(/[^A-Z\s]/g, "")
        setText(cleanedValue)
        const letterToPass = cleanedValue[cleanedValue.length -1]
        if((letterToPass > "A" && letterToPass < "Z") || letterToPass == " "){
            encrypt(cleanedValue[cleanedValue.length -1])
        }
        
    }

    

    return (
        <div>
            <div className="rotor-container">
                <div className='rotors'>
                    <div className="rotor-text">
                        Rotor 1 : {rotor1[rotor1Index]}
                    </div>
                    <div className="rotor-buttons">
                        <button onClick={rotorIncrement1}>up</button>
                        <button onClick={rotorDecrement1}>down</button>
                    </div>
                </div>
                <div className='rotors'>
                    <div className="rotor-text">
                        Rotor 2 : {rotor2[rotor2Index]}
                    </div>
                    <div className="rotor-buttons">
                        <button onClick={rotorIncrement2}>up</button>
                        <button onClick={rotorDecrement2}>down</button>
                    </div>
                </div>
                <div className='rotors'>
                    <div className="rotor-text">
                        Rotor 3 : {rotor3[rotor3Index]}
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
