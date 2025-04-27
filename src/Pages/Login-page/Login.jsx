import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Banner from "../../Assets/Login.png";

const Login = () => {
    const navigate = useNavigate();
    const [loginMsg, setLoginMsg] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            email: loginEmail,
            password: loginPassword,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("http://127.0.0.1:8000/login/", requestOptions)
            .then((response) => {
                response.text().then((data) => setLoginMsg(data));
                if (response.status === 200) {
                    navigate("/home");
                }
            })
            .catch((error) => setLoginMsg(error.toString()));
    };

    const speakText = () => {
        const text = `Username is ${loginEmail} and Password is ${loginPassword}`;
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    };



    return (<div className="login">
        <img className="banner-img" src={Banner} alt="banner" />
        <div className="login-input">
            <div className="login-title"><span style={{ color: "#FF7403" }} >Travel</span>Eaze.</div>
            <div className="login-input-box">
                <div className="login-welcome">Welcome Back</div>
                <div className="login-intro" >Enter your email and password to access your account</div>
                <div className="login-form">
                    <div className="lf-type">Email</div>
                    <input className="lf-input" type="text" placeholder="Enter your email" onChange={(e) => { setLoginEmail(e.target.value) }} />
                    <div className="lf-type">Password</div>
                    <input className="lf-input" type="password" placeholder="Enter your password" onChange={(e) => { setLoginPassword(e.target.value) }} />
                    <div className="remember-me">
                        <div><input type="checkbox" /> Remember Me</div>
                        <button className="forgot-pass">Forgot Password</button>
                    </div>
                    <button type="button" className="login-button" onClick={speakText}>
                    Read Out Credentials
                </button>
                    <button className="login-button" onClick={handleLogin}>Log In</button>
                    <button className="sign-up-button" onClick={() => { navigate('/signup') }}>Register New Account</button>
                    <div className="red">{loginMsg}</div>
                </div>

            </div>
        </div>
    </div>)
}

export default Login;
