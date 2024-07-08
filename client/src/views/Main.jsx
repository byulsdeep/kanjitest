import React, { useState } from 'react'
import './Main.css'

const Main = () => {

    const [employeeName, setEmployeeName] = useState(``)
    const [employeeNumber, setEmployeeNumber] = useState(``)
    const [employeeHireDate, setEmployeeHireDate] = useState(``)
    const [message, setMessage] = useState(``)

    const start = () => {

        if (!/^[^0-9]{1,10}$/.test(employeeName)) {
            setMessage(`氏名は10桁までの文字で入力ください。`)
            return
        }
        if (!/\d{6}/.test(employeeNumber)) {
            setMessage(`社員番号は6桁の数字で入力ください。`)
            return
        }
        if (employeeHireDate === ``) {
            setMessage(`入社年月を入力ください。`)
            return
        }    
        window.location.href = 
        `/kanjitest?` +
        `employeeName=${encodeURIComponent(employeeName)}&` +
        `employeeNumber=${encodeURIComponent(employeeNumber)}&` +
        `employeeHireDate=${encodeURIComponent(employeeHireDate.replace(/-/g, ''))}`
    }

    const loginAdmin = () => {
        window.location.href = `/login`
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
                            className="employee_name"
                            value={employeeName} 
                            onChange={(e) => setEmployeeName(e.target.value)} 
                        />
                        <input 
                            className="employee_number"
                            value={employeeNumber}
                            onChange={(e) => setEmployeeNumber(e.target.value)} 
                        />
                        <input 
                            type="month"
                            className="employee_hire_date"
                            value={employeeHireDate}
                            onChange={(e) => setEmployeeHireDate(e.target.value)} 
                        />
                    </div>
                </div>
                <div className="main_right">
                    <button className="main_button" onClick={start}>開始</button>
                </div>
            </div>
            <div className="main_message">{message}</div>
            <div className="admin_button_wrap">
                <button className="admin_button" onClick={loginAdmin}>管理者モード</button>
            </div>
        </div>
    )
}

export default Main