import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { REGISTER_URI } from '../constant/apiurl';
import Eye from '../assets/images/eye.svg'


const Signup = () => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordMatch, setPasswordMatch] = useState(false)
    const [userType, setUserType] = useState('User')
    const [showPassword, setShowPassword] = useState(false)
    

    const navigate = useNavigate()
    const handelSignup = async () => {
        const newUser = {
            email: email,
            username: name,
            password: password,
            userType: userType
        }
        if (password === confirmPassword) {
            try {
                const response = await axios.post(REGISTER_URI, newUser)
                if (response.status >= 200 && response.status <= 299) {
                    setEmail('')
                    setName('')
                    setPassword('')
                    navigate('/')
                }
            }
            catch (error) {
                console.log(error)
            }
        } else {
            setPasswordMatch(true)
        }
    }

    const toggleState = () => {
        setShowPassword(!showPassword);
    };
    return (
        <>
            <div className='container mt-30 login-page'>
                <div style={{ maxWidth: '35%', margin: '0 auto', border: 'none' }}>
                    <div className="row g-0">
                        <h2 className='b-logo'>Dashboard</h2>
                        <div className="col-md-12 align-content-center">
                            <div className="card-body">
                                <h3 className='my-3 title'>Create Account</h3>
                                <div className="mb-4">
                                    <input type="text" placeholder='Name' className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="mb-4">
                                    <input type="text" placeholder='Email' className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="mb-4">
                                    <input type="text" placeholder='Password' className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="mb-4 position-relative">
                                    <input type={!showPassword ? "password" : "text"} placeholder='confirm password' className="form-control" id="confirmpassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                    {
                                        passwordMatch ? <h1 className="text-color-error error-msg">Password doesn't match</h1> : <h1 className='py-4'></h1>
                                    }
                                    <img src={Eye} onClick={() => toggleState()} className='eye-icon' />

                                </div>
                                <div className='text-center'>
                                    <button className='btn primary-btn' onClick={() => handelSignup()}>Sign up</button>
                                </div>
                                <div className='my-3 label-item text-center'>
                                    Have an account?
                                    <Link to="/" className='text-color-primary ps-2'>Login</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup