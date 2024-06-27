import React, { useState } from 'react'
import './Main.css'
import { Link } from 'react-router-dom'

const Main = () => {
    const [employeeName, setEmployeeName] = useState('姜ハンビョル')
    const [employeeNumber, setEmployeeNumber] = useState('200556')
    const [employeeHireDate, setEmployeeHireDate] = useState('2023-11')
    const handleStartButtonClick = () => {
        window.location.href = `/kanjitest?employeeName=${encodeURIComponent(employeeName)}&employeeNumber=${encodeURIComponent(employeeNumber)}&employeeHireDate=${encodeURIComponent(employeeHireDate)}`
    }
    return (
        <div className="main">
            <div className="main_top">
                <h1>漢字テスト</h1>
            </div>
            <div className="main_bottom">
                <div className="main_left">
                    <div className="main_left_left">
                        <div className="employee_name_label">氏名</div>
                        <div className="employee_number_label">社員番号</div>
                        <div className="employee_hire_date_label">入社年月</div>
                    </div>
                    <div className="main_left_right">
                        <input 
                            className="employee_name" pattern="[\p{L}\p{M}]{1,10}" required
                            value={employeeName} 
                            onChange={(e) => setEmployeeName(e.target.value)} 
                        />
                        <input 
                            className="employee_number" pattern="\d{6}" required
                            value={employeeNumber}
                            onChange={(e) => setEmployeeNumber(e.target.value)} 
                        />
                        <input 
                            className="employee_hire_date" type="month" required
                            value={employeeHireDate}
                            onChange={(e) => setEmployeeHireDate(e.target.value)} 
                        />
                    </div>
                </div>
                <div className="main_right">
                    <button className="main_button" onClick={handleStartButtonClick}>開始</button>
                </div>
            </div>
        </div>
    )
}

export default Main