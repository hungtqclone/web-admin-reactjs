import React, { useEffect, useState } from "react";
import AxiosInstance from "../helper/AxiosIntance";
import { useSearchParams, useParams } from "react-router-dom";
const ResetPassword = (props) => {

    const [params, setParams] = useSearchParams();
    const [email, setEmail] = useState(params.get('email'));
    const [token, setToken] = useState(params.get('token'));

    useEffect(() => {
        const checkToken = async () => {
            try {
                const body = {
                    token: token,
                    email: email
                }
                const response = await AxiosInstance().post('/check-reset-password.php', body);
                setIsValid(response.status)
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
        checkToken();
    }, [token, email]);

    const [isValid, setIsValid] = useState(false)
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_confirmation] = useState('')

    const handleRestPassword = async () => {
        try {
            const body = {
                token: token,
                email: email,
                password: password,
                password_confirmation: password_confirmation
            }
            const response = await AxiosInstance()
                .post(`/reset-password.php`, body);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    if (!email || !token || !isValid) {
        return (
            <div>
                <h1>404</h1>
            </div>
        )
    }

    return (
        <div>
            <h1>reset password</h1>
            <form >
                {/* <div className="form-group">
                    <label for="email">Email address:</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" placeholder='Email address' />
                </div> */}
                <div className="form-group">
                    <label for="pwd">Password:</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="pwd" placeholder='Password address' /><br />
                    <input value={password_confirmation} onChange={(e) => setPassword_confirmation(e.target.value)} type="password" className="form-control" id="pwd" placeholder='Password confirm' />
                </div>
                <button onClick={handleRestPassword} style={{ background: 'blue', marginTop: 10, color: "white" }} type="button" className="btn btn-default">reset password</button>
            </form>
        </div>
    )
}

export default ResetPassword;