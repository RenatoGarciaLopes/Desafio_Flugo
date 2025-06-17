import { Navigate, Route, Routes } from "react-router-dom"
import { ListarColaboradores } from "../pages/ListarColaboradores"
import { AddColaboradores } from "../pages/RegistroDeColaborador"

export const AppRoutes = () =>{
    return(
        
        <Routes>

            <Route path = "/dashboard" element = {<ListarColaboradores/>}/>
            <Route path="/AdicionarColaborador" element={<AddColaboradores />} />
            <Route path = "*" element = {<Navigate to = "/dashboard"/>}/>

        </Routes>

    )
}