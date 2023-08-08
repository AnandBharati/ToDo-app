import { Outlet } from 'react-router-dom'
import Nav from './components/Nav'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function Layout() {
    
    return (
        <>
            <Nav/>
            <ToastContainer />
            <Outlet />
        </>
    )
}

export default Layout