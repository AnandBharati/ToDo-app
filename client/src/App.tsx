import Login from "./auth/Login"
import { Routes, Route } from 'react-router-dom'
import SignUp from "./auth/SignUp"
import RTKTodo from "./components/RTKTodo"
import Layout from "./Layout"
import { useDispatch, useSelector } from "react-redux"
import useLocalstorage from "./hooks/useLocalstorage"
import { setUser } from "./store/auth.reducer"
import { useEffect } from 'react';
// import Nav from "./components/Nav"

function App() {
  const { isLoggedIn } = useSelector((state: any) => state.authReducer)
  const [lData] = useLocalstorage('todoAuth')
  const dispatch = useDispatch()

  useEffect(() => {
    //set initilal local values to store
    lData._id && dispatch(setUser(lData));
  }, [])


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={isLoggedIn ? <RTKTodo /> : <Login />} />
          <Route path="signup" element={!isLoggedIn ? <SignUp /> : <RTKTodo />} />
          <Route path='login' element={!isLoggedIn ? <Login /> : <RTKTodo />} />
          <Route path='todo' element={!isLoggedIn ? <Login /> : <RTKTodo />} />
        </Route>
      </Routes>

    </div>
  )
}

export default App
