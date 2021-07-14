import React from "react"
import "./style.css"

function Banner(){
    return (
        <header>
            <img
                className= "logo"
                src="https://avatars.githubusercontent.com/u/17483941?s=200&v=4"
                alt="didn't load"
                />
                <p>React Meme Generator</p>
        </header>

    )
}

export default Banner