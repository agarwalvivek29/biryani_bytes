import { useRecoilValue } from "recoil"
import { channelAtom } from "../store/userAtom"

function SideBarEle({channel}){
    return (
        <div className="w-16 h-16 rounded-full m-3 overflow-hidden cursor-pointer">
            <div className="group">
                <img src={channel.image} className="object-cover"/>
                <div className="hidden group-hover:block">
                    {channel.title}
                    {channel.creator}
                </div>
            </div>
        </div>
    )
}

export function SideBar(){
    const channels = useRecoilValue(channelAtom);
    return(
        <div className="bg-white">
            {channels.map((channel)=>{
                return <SideBarEle channel={channel} />
            })}
        </div>
    )
}