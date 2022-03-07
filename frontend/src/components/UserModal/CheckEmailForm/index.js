import React, { useState } from "react";
import { csrfFetch } from "../../../store/csrf";
import { useDispatch } from "react-redux";
import * as sessionActions from '../../../store/session'
import LoginForm from "../../LoginFormModal/LoginForm";
import SignupForm from "../../SignupFormModal/SignupForm";
import './CheckEmailForm.css';

function CheckEmailForm() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState([]);
    const [currentForm, setCurrentForm] = useState('checkEmail')

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        try {
            const res = await csrfFetch('/api/users/check', {
                method: 'POST',
                body: JSON.stringify({ email })
            });

            const { isUser } = await res.json();

            isUser ? setCurrentForm('login') : setCurrentForm('signup')

        } catch (e) {
            const { errors } = await e.json();
            setErrors(errors);
            return;
        }
    };

    const guestHandler = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential: 'yake@gmail.com', password: 'password' })).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        );
    }

    if (currentForm === 'checkEmail') {
        return (
            <div>
                <form onSubmit={handleSubmit} className='email-check-form'>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <div className="email-check-form">
                        <span>Welcome to AirWC!</span>
                        <label>
                            Email
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Email'
                                required
                                autoFocus
                            />
                        </label>
                    </div>
                    <button type="submit">Continue</button>
                </form>
                <button onClick={guestHandler} >Demo User</button>
            </div>
        );
    } else if (currentForm === 'login') {
        return <LoginForm email={email} />
    } else if (currentForm === 'signup') {
        return <SignupForm email={email} />
    }
}

export default CheckEmailForm;