import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "react-use";



export default function useGlobalProvider() {
    const [modalSucessUp, setModalSucessUp] = useState(false);

     const [error, setError] = useState({
        message: ''
     });
    
    const token = localStorage.getItem('token');

    const [userData, setUserData] = useState({});
    
    const navigate = useNavigate();

    return {
        useState, useEffect,
        navigate, token,
        userData, setUserData,
        modalSucessUp, setModalSucessUp,
        error, setError,
    };
};