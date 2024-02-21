import { useState , useEffect} from "react"
import { SignIn, SignUp } from "../components/Auth";
import {} from 'zod';
import { Icon } from "../components/Icons";
import { Navbar } from "../components/NavBar";

let button_new_style = `p-3 cursor-pointer text-center justify-center items-center`

export default function AuthPage(){
    const [login,setLogin] = useState(true);

    return(
        <div>
            <Navbar />
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="w-180 h-200 flex justify-center items-center overflow-hidden">
                <div className="justify-around">
                    <div className="flex grid grid-cols-2 items-center justify-center">
                        <div className="flex justify-center items-center">
                        <Icon who='logo' css="w-24 h-24" />
                        </div>
                        <div className="">
                            <div className="grid grid-cols-2 justify-center">
                                <div onClick={()=>{
                                    setLogin(false)
                                    
                                }}
                                className={`${button_new_style} ${!login ? 'font-bold font-roboto text-extrabold text-lg' : 'text-sm'}`}>SignUp</div>
                                <div onClick={()=>{
                                    setLogin(true)
                                }}
                                className={`${button_new_style} ${login ? 'font-bold font-roboto text-extrabold text-lg' : 'text-sm'}`}>SignIn</div>
                            </div>
                            <div className="justify-center">
                                {login==true ? <SignIn /> : <SignUp />}
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}