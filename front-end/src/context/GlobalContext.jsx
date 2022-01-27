import { createContext } from "react";
import useGlobalProvider from "../hooks/useGlobalProvider";

const GlobalContext = createContext({});

export function GlobalProvider(props) {
    const valores = useGlobalProvider();

    return (
        <GlobalContext.Provider value={valores}>
            {props.children}
        </GlobalContext.Provider>
    );
}

export default GlobalContext;