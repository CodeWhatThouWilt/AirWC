import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { csrfFetch } from "../../../store/csrf";
import LoginForm from "../../LoginFormModal/LoginForm";
import SignupForm from "../../SignupFormModal/SignupForm";

function CheckEmailForm() {
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

    if (currentForm === 'checkEmail') {
        return (
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Continue</button>
            </form>
        );
    } else if (currentForm === 'login') {
        return <LoginForm email={email} />
    } else if (currentForm === 'signup') {
        return <SignupForm email={email} />
    }
}

export default CheckEmailForm;