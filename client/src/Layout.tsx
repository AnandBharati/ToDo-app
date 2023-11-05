import { Outlet } from 'react-router-dom'
import Nav from './components/Nav'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function Layout() {

    return (
        <>
            <Nav />
            <ToastContainer />
            <div className="container flex justify-center items-center vw-100 box-border m-0 p-0">
                <Outlet />
            </div>
        </>
    )
}

export default Layout