import { useState } from 'react';
import {registerUser} from "../services/api.js";
import '../styles/Register.css';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await registerUser({
                email,
                password,
                firstName,
                lastName,
                phoneNumber,
                address
            });
            alert('Registration successful!');
        } catch (error) {
            alert('Registration failed: ' + error.message);
        }
    };

    return (
        <div className="register-page">
            <div className="register-card">
                <h2>Register</h2>

                <form onSubmit={handleRegister}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}

export default Register;