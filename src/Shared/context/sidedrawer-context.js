
import { createContext, useState } from "react";

const SideDrawerContext = createContext();

const SideDrawerProvider = props =>{

    const [ showCart, setShowCart ] = useState(false);

    const handleCartClose = () => setShowCart(false);
    const handleCartShow = () => setShowCart(true);

    return (<SideDrawerContext.Provider value={{
        showCart: showCart,
        handleCartClose: handleCartClose,
        handleCartShow: handleCartShow
    }}>
        {props.children}
    </SideDrawerContext.Provider>)
}

export { SideDrawerContext };

export default SideDrawerProvider;