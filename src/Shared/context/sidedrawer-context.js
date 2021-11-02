
import { createContext, useState } from "react";

const SideDrawerContext = createContext();

const SideDrawerProvider = props =>{

    const [ showSideDrawer, setShowSideDrawer ] = useState(false);

    const toggleDrawer = () =>{
        setShowSideDrawer(!showSideDrawer);
    }

    return (<SideDrawerContext.Provider value={{
        showSideDrawer: showSideDrawer,
        toggleDrawer: toggleDrawer
    }}>
        {props.children}
    </SideDrawerContext.Provider>)
}

export { SideDrawerContext };

export default SideDrawerProvider;