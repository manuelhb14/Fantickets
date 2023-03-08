'use client';

import { createContext, useState } from "react";

export const DataContext = createContext();


export const DataProvider = (props) => {
    const [address, setAddress] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [provider, setProvider] = useState(null);
  
    return(
        <DataContext.Provider value={{ address, setAddress, isConnected, setIsConnected, provider, setProvider }}>
            {props.children}
        </DataContext.Provider>
    )
}