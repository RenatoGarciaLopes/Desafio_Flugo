import { Navigate, Route, Routes } from "react-router-dom"
import { CollaboratorList } from "../pages/CollaboratorList"

export const AppRoutes = () =>{
    return(
        
        <Routes>

            <Route path = "/dashboard" element = {<CollaboratorList/>}/>
            <Route path = "*" element = {<Navigate to = "/dashboard"/>}/>

        </Routes>

    )
}