import React, { useState, useEffect } from 'react'

const Timer = ({ setTimerId }) => {
    const [seconds, setSeconds] = useState(0)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1)
        }, 1000)
        
        setTimerId(intervalId)

        return () => clearInterval(intervalId) 
    }, [setTimerId])

    let minutes = Math.floor(seconds / 60)
    let displaySeconds = seconds % 60
    if (minutes < 10) {
        minutes = '0' + minutes
    }
    if (displaySeconds < 10) {
        displaySeconds = '0' + displaySeconds
    }

    return (
        <div className="timer">
            <span className="time_value">{`${minutes}:${displaySeconds}`}</span>
        </div>
    )
}

export default Timer
