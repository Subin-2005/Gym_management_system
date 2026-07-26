import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const GymContext = createContext();

export function GymProvider({children}){

    const [gym, setGym] = useState({
        gym_name: "GymPro",
        logo: null,
        address: "",
        phone: "",
        email: "",
    });

    const loadGym = async ()=>{

        const token = localStorage.getItem("access");

        if(!token){
            setGym({
                gym_name: "GymPro",
                logo: null,
                address: "",
                phone: "",
                email: "",
            });
            return;
        }

        try{
            const {data} = await api.get("settings/");
            setGym(data);
        }
        catch(error){
            console.log(error)

            setGym({
                gym_name: "GymPro",
                logo: null,
                address: "",
                phone: "",
                email: "",
            });
        }
    };

    useEffect(()=>{
        loadGym();
    },[]);


    return(

        <GymContext.Provider value={{gym, loadGym, setGym}}>
            {children}
        </GymContext.Provider>

    )

}

export const useGym = ()=> useContext(GymContext);

