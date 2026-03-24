import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ChooseRegister from '../pages/auth/ChooseRegister';


const AppRoutes = () => {
  return (
    <Router>
        <Routes>
                <Route path="/register" element={<ChooseRegister/>} />
        </Routes>
    </Router>
  )
}

export default AppRoutes