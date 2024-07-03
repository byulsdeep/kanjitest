import React, { useState } from 'react'
import axios from "axios"
import './Modal.css'
import Modal2 from './Modal2'

const Modal = ({ 
    message, scoreValue, isVisible, onClose, 
    employeeName, employeeNumber, employeeHireDate, 
    timerId, setSpinnerVisible
}) => {

    const confirm = (yesOrNo) => {
        onClose()
        if (yesOrNo) {
            setSpinnerVisible(true)
            clearInterval(timerId)
            sendTestResult({ 
                scoreValue: scoreValue,
                employeeName: employeeName,
                employeeNumber: employeeNumber,
                employeeHireDate: employeeHireDate,
                timeElapsed: document.querySelector('.time_value').textContent
            })
        }
    }
    const sendTestResult = async (data) => {
        try {
            const response = await axios.post(`http://${window.location.hostname}:8080/kanjitest`, data)
            setMessage2(response.data.message)
        } catch (error) {
            if (error.response) {
                setMessage2(error.response.data.message)
            } else if (error.request) {
                setMessage2(error.request)
            } else {
                setMessage2(error.message)
            }
        } finally {
            setSpinnerVisible(false)
            setIsVisible2(true)
        }
    }

    // modal module
    const [message2, setMessage2] = useState('')
    const [isVisible2, setIsVisible2] = useState(false)
    const closeModal2 = () => setIsVisible2(false)

    return (
        <>
            <div className={`modal ${isVisible ? 'visible' : 'hidden'}`}>
                <div className="modal_content">
                    <div className="modal_top">
                        <div className="modal_message">{message}</div>
                    </div>
                    <div className="modal_bottom">
                        <button className="modal_button" onClick={() => confirm(true)}>はい</button>
                        <button className="modal_button" onClick={() => confirm(false)}>いいえ</button>
                    </div>
                </div>
            </div>
            <Modal2 
                message2={message2} 
                isVisible2={isVisible2} 
                onClose2={closeModal2} 
                onClose={onClose} 
            />
        </>
    )
}

export default Modal
