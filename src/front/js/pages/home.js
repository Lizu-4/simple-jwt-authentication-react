import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { Context } from "../store/appContext";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="col-md-12 text-center p-4">
                <p>
                    <img src={rigoImageUrl} />
                </p>
                <Link to="/login">
                    <button className="btn btn-primary mx-auto">
                        Ingresar
                    </button>
                </Link>
            </div>
        </div>
    );
};
