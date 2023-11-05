import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { clearUser } from "../store/auth.reducer";
import useLocalstorage from "../hooks/useLocalstorage";
import { useEffect } from 'react';
import { BsSun } from 'react-icons/bs';
import { MdOutlineDarkMode } from 'react-icons/md';

function Nav() {
    const dispatch = useDispatch()
    const { username, _id } = useSelector((state: RootState) => state.authReducer);
    const [lData, setLdata] = useLocalstorage('todoAuth');
    const [isDark, setIsDark] = useLocalstorage('isDarkMode')

    function signoutHandler() {
        setLdata({});
    }

    useEffect(() => {
        JSON.stringify(lData) === '{}' && dispatch(clearUser());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lData]);

    useEffect(() => {
        const html = document.querySelector('html');
        html?.setAttribute('data-theme', isDark ? 'dark' : 'light')
    }, [isDark]);

    const displayName = username ? username : 'Guest'

    return (
        <nav
            className="navbar flex justify-between items-center h-14"
        >
            <p className="text-2xl px-5 py-2 text-neutral">Hi {displayName}...</p>
            {/* <SiTodoist/> */}
            <div className="wrapper">
                {_id && <h4 className="btn btn-primary" onClick={signoutHandler} > Logout </h4>}
                <div className="theme-btn btn-neutral text-2xl p-2 rounded-full" onClick={() => setIsDark(!isDark)}>
                    {isDark ? <BsSun /> : <MdOutlineDarkMode />}
                </div>
            </div>
        </nav >
    )
}

export default Nav