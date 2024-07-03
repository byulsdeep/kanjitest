import React from 'react'
import './Modal2.css'

const Modal2 = ({ message2, isVisible2, onClose2, onClose }) => {

    const confirm = () => {
        onClose2()
        onClose()
    }

    return (
        <div className={`modal2 ${isVisible2 ? 'visible' : 'hidden'}`}>
            <div className="modal2_content">
                <div className="modal2_top">
                    <div className="modal2_message">{message2}</div>
                </div>
                <div className="modal2_bottom">
                    <button className="modal2_button" onClick={confirm}>はい</button>
                </div>
            </div>
        </div>
    )
}

export default Modal2
