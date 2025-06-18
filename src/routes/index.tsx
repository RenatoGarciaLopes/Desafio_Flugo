import { Navigate, Route, Routes } from "react-router-dom"
import { ListarColaboradores } from "../pages/ListarColaboradores"
import { RegistrarColaboradores } from "../pages/RegistrarColaboradores"

export const AppRoutes = () =>{
    return(
        
        <Routes>

            <Route path = "/dashboard" element = {<ListarColaboradores/>}/>
            <Route path="/AdicionarColaborador" element={<RegistrarColaboradores />} />
            <Route path = "*" element = {<Navigate to = "/dashboard"/>}/>

        </Routes>

    )
}