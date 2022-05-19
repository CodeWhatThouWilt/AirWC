import React, { useState } from "react";
import * as sessionActions from "../../../store/session"
import { useDispatch } from "react-redux";
import './LoginForm.css';
import { getAllFavorites } from "../../../store/favorites";

function LoginForm({ email }) {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState(email);
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
        .then(() => dispatch(getAllFavorites()))
        .catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        );
    };

    return (
        <div className='user-auth-modal' style={{ height: '250px' }}>
            <form onSubmit={handleSubmit} className='login-form'>
                <div>Welcome back!</div>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>
                    Email
                    <input
                        type="email"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoFocus
                    />
                </label>
                <button type="submit" className="login-button" >Log In</button>
            </form>
        </div>
    );
}

export default LoginForm;