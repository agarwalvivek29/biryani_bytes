import { useEffect, useState } from "react"
import { useRecoilState } from "recoil";
import { userAtom } from "../store/userAtom";

export function ChannelHead({channel}){

    const [followers,setFollowers] = useState(channel.followers);
    const [user,setUser] = useRecoilState(userAtom);
    const [isFollowed,setIsFollowed] = useState(false);

    useEffect(()=>{
        if(user.user){
            setIsFollowed(user.user.channels.includes(channel._id));
        }
    },[])

    const handlesubs = ()=>{
        if(isFollowed){
            setFollowers(prev=>{return prev-1})
        }
        else{
            setFollowers(prev=>{return prev+1})
        }
        setIsFollowed(prev=>{return !prev})
    }

    return(
        <div className="relative mb-5">
            <div className="overflow-hidden h-50 w-full ">
                <img src="https://imgs.search.brave.com/0stWuecf5Nsy-V84FWhwk485YqT3hGmwbC6yCiG1T2E/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9iYW5u/ZXJlbmdpbmVlcmlu/Zy1oLmFzc2V0c2Fk/b2JlLmNvbS9pcy9p/bWFnZS9jb250ZW50/L2RhbS9iYW5uZXIt/ZW5naW5lZXJpbmcv/M2QtcmVuZGVycy9w/cm9kdWN0LWdyb3Vw/L211bHRpX2Rpdmlz/aW9uL0Jhbm5lci1w/cm9kdWN0cy1tdWx0/aS1kaXZpc2lvbi1o/b21lLWhlcnJvLXIz/LmpwZz93aWQ9MjAw/MCZxbHQ9OTAmZm10/PXdlYnA" 
                className="w-full h-60" 
                />
            </div>
            <div className="absolute inset-32 left-40 flex items-center">
                <img src={channel.image} className="rounded-full w-40 h-40 overflow-hidden"/>
                <div className="m-8">
                    <div className="text-3xl font-roboto text-white font-medium ">
                        {channel.title}
                    </div>
                    <div>
                        <div className="text-white font-thin">
                            {followers} - Following
                        </div>
                        <div>
                            <button className="p-3 m-2 border rounded-md"
                            onClick={handlesubs}
                            >
                                {isFollowed ? "Following" : "Follow"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// https://mcdn.wallpapersafari.com/medium/2/43/nRbgcK.jpg