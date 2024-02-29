import { useRecoilValue } from "recoil";
import { Icon } from "./Icons";
import { userAtom } from "../store/userAtom";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function NavButton({title}){
    return(
        <div className="font-medium font-roboto p-3 cursor-pointer text-lg hover:font-bold flex items-center">
            <Icon who={title} css='w-8 p-1'/>{title}
        </div>
    )
}

function DropDownButton({title}){
    return (
        <div className="font-medium text-lg font-roboto absolute w-full text-center bg-white shadow-md rounded-md p-3 cursor-pointer hover:font-bold">
            <div>
                {title}
            </div>
        </div>
    )
}

function handleLogout(){
    console.log('fn call logout')
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=None;";
    console.log(document.cookie);
}

function Profile({ title, imglink }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
  
    const handleMouseOver = () => {
      setShowDropdown(true);
    };
  
    const handleMouseLeave = () => {
      setShowDropdown(false);
    };
  
    return (
      <div className="relative" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
        <div className="font-medium font-roboto p-3 cursor-pointer text-lg hover:font-bold flex items-center">
          <img src={imglink} className="w-9 h-9 m-1 rounded-md" alt={title} />
          {title}
        </div>
        {showDropdown && (
            <DropDownButton title='Logout' onClick={()=>{
                handleLogout();
                navigate('/', ()=>{
                    console.log('navCalled')
                })
            }}/>
        )}
      </div>
    )
}

export function Navbar(){
    const user = useRecoilValue(userAtom);

    const [cookie,setCookie] = useState(true);
    useEffect(()=>{
        if(!document.cookie){
            setCookie(false);
        }
    },[])

    const navigate = useNavigate();
    
    const handleRouting = (route)=>{
        navigate(`/${route}`)
    }

    return(
        <div className="pt-16">
            <div className="w-full fixed top-0 bg-white flex items-center justify-between">
                <div>
                    <Icon who='logo' css='w-10 m-4' />
                </div>
                <div className="flex items-center">
                    <div onClick={()=>handleRouting('shop')}>
                        <NavButton title='Home' />
                    </div>
                    <div onClick={()=>handleRouting('')}>
                        <NavButton title='Discover'/>
                    </div>
                    <div>
                        <NavButton title='Trending'/>
                    </div>
                    <div >
                        {user.username ? 
                        <Profile title={user.username} imglink={user.image}/> : 
                        <div onClick={()=>handleRouting('auth')}>
                            <NavButton title='SignUp | SignIn' />
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}