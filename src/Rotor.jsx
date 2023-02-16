import React, {useState} from 'react'

import './Rotor.css'

export default function Rotor() {

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const rotor1 = "EKMFLGDQVZNTOWYHXUSPAIBRCJ";
    const rotor2 = "AJDKSIRUXBLHWTMCQGZNPYFVOE";
    const rotor3 = "BDFHJLCPRTXVZNYEIWGAKMUSQO";
    const reflector = "YRUHQSLDPXNGOKMIEBFZCWVJAT";

    const [rotor1Index, setRotor1Index] = useState(0)
    const [rotor2Index, setRotor2Index] = useState(0)
    const [rotor3Index, setRotor3Index] = useState(0)

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
            if(rotor2Index === -1){
                setRotor2Index(25)
            }else{
                setRotor2Index(prevIndex => (prevIndex - 1))
            }
    }
    function rotorDecrement3(){
            if(rotor3Index === -1){
                setRotor3Index(25)
            }else{
                setRotor3Index(prevIndex => (prevIndex - 1))
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
            <button onClick={incrementRotor1}>increment</button>
            {/* <input type="text" onKeyDownCapture={} /> */}
        </div>
    )
}
