import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { Context } from "../store/appContext";

export const Private = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    return (
        <div className="container">
            <div className="col-md-12 text-center p-4">
                <p>
                    <img src={rigoImageUrl} />
                </p>
                <p>Hola</p>
                {token !== null ? (
                    <>
                        <p>Estas loggeado</p>
                    </>
                ) : (
                    <p>No estas loggeado</p>
                )}
            </div>
        </div>
    );
};
