import React, { useState, useRef } from "react";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const toast = useRef<Toast>(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password) {
            toast.current?.show({ severity: "warn", summary: "Validation", detail: "Enter username and password" });
            return;
        }

        try {
            const res = await axios.post("https://fakestoreapi.com/auth/login", {
                username,
                password,
            });

            localStorage.setItem("token", res.data.token);
            toast.current?.show({ severity: "success", summary: "Success", detail: "Login successful" });

            navigate("/products");
        } catch (err) {
            toast.current?.show({ severity: "error", summary: "Error", detail: "Invalid credentials" });
        }
    };

    return (
        <div className="flex justify-content-center align-items-center login-container">
            <Toast ref={toast} />
            <Card title="Login">
                <div className="">
                    <div className="field">
                        <label htmlFor="username">Username</label>
                        <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask feedback={false} />
                    </div>
                    <Button label="Login" onClick={handleLogin} size="small" />
                </div>
            </Card>
        </div>
    );
};

export default Login;
