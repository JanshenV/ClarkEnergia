import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function useGlobalProvider() {
    const [modalSucessUp, setModalSucessUp] = useState(false);

     const [error, setError] = useState({
        message: ''
     });
    
    const token = localStorage.getItem('token');
    
    const navigate = useNavigate();

    return {
        useState, useEffect,
        navigate, token,
        modalSucessUp, setModalSucessUp,
        error, setError,
    };
};