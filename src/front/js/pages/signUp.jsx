import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const SignUp = (props) => {
    const { actions } = useContext(Context);

    const [formData, setFormData] = useState({});
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const signup = await actions.createUser(formData);
        if (signup) {
            setErrorMessage(false);
            navigate("/login");
        } else {
            setErrorMessage(true);
        }
    };

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            email: email,
            password: password,
        }));
    }, [email, password]);

    return (
        <>
            <div className="container border rounded h-100 w-100 d-flex flex-column p-4">
                <p className="text-center display-5 fs-1">Registro</p>
                <div className="col-5 mx-auto">
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            Datos incorrectos o usuario ya existente, intente
                            nuevamente
                        </div>
                    )}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="col-5 mx-auto">
                        <label htmlFor="emailInput" className="form-label">
                            Correo Electrónico
                        </label>
                        <input
                            id="emailInput"
                            type="email"
                            value={email}
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="col-5 mx-auto">
                        <label htmlFor="passwordInput" className="form-label">
                            Contraseña
                        </label>
                        <input
                            id="passwordInput"
                            type="password"
                            value={password}
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="col-5 mx-auto py-2">
                        <button type="submit" className="btn btn-primary">
                            Registrarme
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};
