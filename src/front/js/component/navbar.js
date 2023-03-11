import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useEffect, useState } from "react";

export const Navbar = () => {
    const token = localStorage.getItem("token");
    const { store, actions } = useContext(Context);
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/login">
                    <span className="navbar-brand mb-0 h1">
                        React Boilerplate
                    </span>
                </Link>
            </div>

            {token !== null ? (
                <>
                    <button
                        className="btn btn-success mx-1"
                        onClick={() => actions.logout()}
                    >
                        Salir
                    </button>
                </>
            ) : null}
        </nav>
    );
};
