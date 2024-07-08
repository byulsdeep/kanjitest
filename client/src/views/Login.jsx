import React, { useState } from 'react'
import './Login.css'
import { useLocation, useNavigate } from 'react-router-dom'

const Login = () => {

    const home = () => {
        window.location.href = `/`
    }

    const [loginName, setLoginName] = useState(``)
    const [loginBirth, setLoginBirth] = useState(``)

    const navigate = useNavigate()

    const [message, setMessage] = useState(``)
    const login = () => {

        if (!/^[^0-9]{1,10}$/.test(loginName)) {
            setMessage(`氏名は10桁までの文字で入力ください。`)
            return
        }
        if (!/\d{8}/.test(loginBirth)) {
            setMessage(`生年月日は8桁の数字で入力ください。`)
            return
        }
        navigate('/admin', { state: { name: loginName, birth: loginBirth } })
    }
    const location = useLocation()
    const { messageFromServer } = location.state || { messageFromServer: `` }

    return (
        <div className="login">
            <div className="login_top">
                <h1>管理者モード</h1>
            </div>
            <div className="login_bottom">
                <div className="login_left">
                    <div className="login_left_left">
                        <div className="login_name_label">氏名</div>
                        <div className="login_birth_label">生年月日</div>
                    </div>
                    <div className="login_left_right">
                        <input 
                            className="login_name"
                            value={loginName} 
                            onChange={(e) => setLoginName(e.target.value)} 
                        />
                        <input 
                            className="login_birth"
                            value={loginBirth} 
                            onChange={(e) => setLoginBirth(e.target.value)} 
                        />
                    </div>
                </div>
                <div className="login_right">
                    <button className="login_login_button" onClick={login}>ログイン</button>
                </div>
            </div>
            <div className="login_message">{message !== '' ? message : messageFromServer}</div>
            <div className="login_return_button_wrap">
                <button className="login_return_button" onClick={home}>戻る</button>
            </div>
        </div>
    ) 
}

export default Login