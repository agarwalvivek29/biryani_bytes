import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "../store/userAtom";
import { cookieAtom } from "../store/cookieAtom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUpdateUser } from "../store/useUpdateUser";
import { useEffect, useState } from "react";


export function ChannelArray({channels, userChannels=[]}){

    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {channels.map((channel)=>{
                return(
                    <Channel key={channel._id} channel={channel} 
                    isFollowed={userChannels.includes(channel._id)}
                    />
                )
            })}
        </div>
    )
}

function Channel({channel, isFollowed = false}){

    const [follow,setFollow] = useState(isFollowed);

    const [cookie,setCookie] = useRecoilState(cookieAtom);

    useEffect(()=>{
        if(document.cookie){
            setCookie(true);
        }
    },[document.cookie])
    
    const [user,setUser] = useRecoilState(userAtom);
    const navigate = useNavigate();

    async function handlesubs(){
        if(cookie){
            try{
                const res = await axios.put(`http://localhost:3000/${channel._id}`,{
                    "username" : user.username
                })
                var userChannels = user.user.channels.slice();
                if(userChannels.includes(channel._id)){
                    const index = userChannels.indexOf(channel._id);
                    userChannels.splice(index,1);
                }
                else{
                    userChannels.push(channel._id)
                }
                setUser((prev)=>({...prev, 
                    user : {
                        channels : userChannels
                    }
                }))
                setFollow(!follow)
            }
            catch(e){
                console.log(e);
            }
        }
        else{
            alert("Please Login to follow your favourite Creators....");
            navigate('/auth');
        }
    }

    // console.log(channel);
    return(
        <div className="font-saira m-3 p-5 shadow-lg flex-col items-center flex justify-center rounded-md bg-slate-900 text-white cursor-pointer hover:bg-white hover:text-black">
            <div className="flex-col flex items-center" onClick={()=>{
                navigate(`/store/${channel._id}`)
            }}>
                <div className=" w-40 h-40 overflow-hidden rounded-full">
                    <img src={channel.image} />
                </div>
                <div className="font-bold text-xl p-1">
                    {channel.title}
                </div>
                <div className="font-light p-1 text-center">
                    {channel.description}
                </div>
                <div className="text-xs font-extralight">
                    {channel.creator}
                </div>
            </div>
            <button className=" m-3 p-2 border bg-indigo-400 text-white rounded-md hover:bg-black"
            onClick={handlesubs}
            >{
                follow ? "Following" : "Follow"
            }</button>
        </div>
    )
}

// export async function useUpdateUser(){

//     const setUserState = useSetRecoilState(userAtom);

//     try{
//         const cookie = document.cookie;
//         const token = cookie.split('=')[1];
//         const userresponse = await axios.get(`http://localhost:3000/user`,{
//             headers : {
//                 Authorization : `Bearer ${token}`
//             }
//         });
//         const user = userresponse.data;
//         console.log(user);
//         setUserState(user);
//     }
//     catch(e){
//         console.log(e);
//         console.log("Error updating user Data, Custom Hook useUpdateUser");
//     }
// }