import { createContext, useContext, useState } from "react";

const cartContext=createContext()

const cartProvider=({children})=>{
    const [cart,setCart]=useState([])

    return(
        <cartContext.Provider value={{cart,setCart}}>
            {children}
        </cartContext.Provider>
    )
  
}
const useCart=()=>useContext(cartContext)
export {useCart,cartProvider}