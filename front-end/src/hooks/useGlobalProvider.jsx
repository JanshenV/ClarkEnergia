import { useState, useEffect } from "react";

export default function useGlobalProvider() {
    const [hello, setHello] = useState('Welcome Home');

    return {
        useState, useEffect,
        hello
    };
};