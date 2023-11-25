import React, { useState } from 'react';
import AxiosInstance from '../helper/AxiosIntance';
const Login = (props) => {
    const { saveUser } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = async () => {
        try {
            const body = { email, password };
            const result = await AxiosInstance().post('/login.php', body);
            console.log(result);
            if (result.status) {
                saveUser(result.user);
            } else {
                alert('Đăng nhập thất bại');
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form >
            <div className="form-group">
                <label for="email">Email address:</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" placeholder='Email address' />
            </div>
            <div className="form-group">
                <label for="pwd">Password:</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="pwd" placeholder='Password address' />
            </div>
            <button onClick={login} style={{ background: 'blue', marginTop: 10, color: "white" }} type="button" className="btn btn-default">Đăng nhập</button>
            <button style={{ background: 'blue', marginTop: 10, color: "white", marginLeft: 10 }} type="button" className="btn btn-default"><a style={{ color: "white", textDecoration: "none" }} href='/reset-password'>fotgot password</a></button>
        </form>
    )

}

export default Login;