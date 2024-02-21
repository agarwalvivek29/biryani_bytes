
export function ChannelArray({channels}){
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {channels.map((channel)=>{
                return(
                    <Channel channel={channel} />
                )
            })}
        </div>
    )
}

function Channel({channel}){
    console.log(channel);
    return(
        <div className="font-saira m-3 p-5 shadow-lg flex-col items-center flex justify-center rounded-md bg-slate-900 text-white cursor-pointer hover:bg-white hover:text-black">
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
            <button className=" m-3 p-2 border bg-indigo-400 text-white rounded-md hover:bg-black">Subscribe</button>
        </div>
    )
}