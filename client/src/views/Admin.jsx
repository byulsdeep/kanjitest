import React, { useState, useEffect } from 'react'
import './Admin.css'
import { useLocation, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import axios from "axios"

const Admin = () => {

    const userInfo = { "姜ハンビョル": "19940602", "admin": "11111111", "master": "22222222" }

    const home = () => {
        navigate('/login')
    }

    const location = useLocation()
    const navigate = useNavigate()
    const { name, birth } = location.state || { name: null, birth: null }

    const [isLegit, setIsLegit] = useState(false)
    const [isSpinnerVisible, setSpinnerVisible] = useState(false)

    useEffect(() => { login() }, []) 
    const [files, setFiles] = useState(null)
    const login = async () => {

        if (!/^[^0-9]{1,10}$/.test(name) || !/\d{8}/.test(birth)) {
            navigate('/login', { state: { messageFromServer: `間違った情報です` } })
            return
        }

        try {
            const response = await axios.post(`http://${window.location.hostname}:8080/login`, 
                { name: name, birth: birth }
            )
            setFiles(response.data.files)
            setIsLegit(true)
        } catch (error) {
            if (error.response) {
                navigate('/login', { state: { messageFromServer: error.response.data.message } })
            } else if (error.request) {
                navigate('/login', { state: { messageFromServer: error.request } })
            } else {
                navigate('/login', { state: { messageFromServer: error.message } })
            }
        }
    }

    if (!isLegit) {
        return <Spinner isSpinnerVisible={isSpinnerVisible} />
    }

    const download = (index) => {
        window.location.href = `http://${window.location.hostname}:8080/download/${files[index]}`
    }
    return (
        <>
            <div className="admin">
                <div className="admin_top">
                    <h1>管理者モード</h1>
                </div>
                <div className="admin_bottom">
                    <div className="admin_file_list_container">
                        <h2 className="admin_file_list_title">テスト結果</h2>
                        <ul className="admin_file_list">
                            { files.map((fileName, index) => (
                                <li className="admin_file">
                                    <span className="admin_file_label">{fileName}</span>
                                    <button className="admin_file_button" onClick={ () => download(index) }>ダウンロード</button>
                                </li>
                            )) }
                        </ul>
                    </div>
                </div>
                <div className="admin_message"></div>
                <div className="admin_return_button_wrap">
                    <button className="admin_return_button" onClick={home}>戻る</button>
                </div>
            </div>
        </>
    ) 
}

export default Admin