import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { clearUser } from "../store/auth.reducer";
import useLocalstorage from "../hooks/useLocalstorage";
import { useEffect } from 'react';

function Nav() {
    const dispatch = useDispatch()
    const { username, _id } = useSelector((state: RootState) => state.authReducer);
    const [lData, setLdata] = useLocalstorage('todoAuth');

    function signoutHandler() {
        setLdata({});
    }

    useEffect(() => {
        JSON.stringify(lData) === '{}' && dispatch(clearUser());
    }, [lData]);

    const displayName = username ? username : 'Guest'

    return (
        <nav
            className="shadow-sm"
            style={{ display: 'flex ', justifyContent: 'space-between', backgroundColor: '#fff' }}
        >
            <h3 className="h3 mx-3 mt-2 ">Hi {displayName}...</h3>
            {/* <SiTodoist/> */}
            {_id && <h4 className="btn btn-primary mx-3 my-2" onClick={signoutHandler} > signout </h4>}
        </nav >
    )
}

export default Nav