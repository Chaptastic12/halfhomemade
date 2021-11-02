import { createContext } from 'react';

export const MobileContext = createContext({
    isMobile: false,
    changeMobile: ()=>{}
});