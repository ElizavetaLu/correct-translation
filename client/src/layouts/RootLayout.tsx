import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { userLoggedOut } from "../features/slices/authSlice";
import { AiOutlineLogout } from "react-icons/ai";

const RootLayout = () => {

    const dispatch = useAppDispatch();
    const navigation = useNavigate();

    return (
        <div>
            <header className="py-4 px-8 flex justify-end">
                <button
                    className="flex items-center gap-2 capitalize text-[rgb(128,131,140)] transition-all duration-200 hover:text-[#6a75ca]"
                    onClick={() => {
                        navigation('/login')
                        dispatch(userLoggedOut())
                    }}
                >
                    log out
                    <AiOutlineLogout />
                </button>
            </header>
            <Outlet />
        </div>
    );
}

export default RootLayout