
import './App.css'
import EmployeeComponent from './component/EmployeeComponent'
// import FooterComponent from './component/FooterComponent'
import HeaderComponent from './component/HeaderComponent'
import ListEmployeeComponent from './component/ListEmployeeComponent'
import {BrowserRouter, Route,Routes} from 'react-router-dom'
import RegisterComponent from './component/RegisterComponent'
import LoginComponent from './component/LoginComponent'
import SidebarComponent from './component/SidebarComponent'
import AcceuilComponent from './component/AcceuilComponent'

function App() {

  return (

    <> 
      <BrowserRouter> 
        <HeaderComponent/> {/* Gardez si nécessaire */}
        <div className="d-flex">
          <SidebarComponent/>
          <main className="flex-grow-1">
            <Routes>
              <Route path='/acceuil' element={<AcceuilComponent/>} ></Route>
              <Route path='/' element={<ListEmployeeComponent/>} />
              <Route path='/employees' element={<ListEmployeeComponent/>} />
              <Route path='/add-employee' element={<EmployeeComponent/>} />
              <Route path="/register" element={<RegisterComponent/>} /> 
              <Route path="/login" element={<LoginComponent/>} />
            </Routes>
          </main>
        </div>
        {/* <FooterComponent/> */}
      </BrowserRouter>

    </>
  )
}

export default App
