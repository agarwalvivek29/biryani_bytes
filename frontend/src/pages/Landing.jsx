import { Navbar } from "../components/NavBar";
import { cartAtom, channelAtom, productAtom, userAtom } from "../store/userAtom";
import { useEffect , useState} from "react";
import axios from "axios";
import { useRecoilValue , useRecoilState} from "recoil";
import { ChannelArray } from "../components/Channel";
import { SideBar } from "../components/SideBar";

export function LandingPage(){

    const [channelState, setChannelState] = useRecoilState(channelAtom);
    const userState = useRecoilValue(userAtom);
    let userChannels = []

    if(userState.username){
        userChannels = userState.user.channels
    }

    // console.log('Initialization user');
    // useEffect(()=>{
    //     const getdata = async ()=>{
    //         try{
    //             const cookie = document.cookie;
    //             const token = cookie.split('=')[1];
    //             const userresponse = await axios.get(`${URL}/user`,{
    //                 headers : {
    //                     Authorization : `Bearer ${token}`
    //                 }
    //             });
    //             const user = userresponse.data;
    //             console.log(user,"user");
    //             setUserState(user);

    //             if(user){
    //                 setCart(user.cart);
    //             }
                
    //             const channelresponse = await axios.get(`${URL}/channel`,{
    //                 headers : {
    //                     Authorization : `Bearer ${token}`
    //                 }
    //             });
    //             const channel = await channelresponse.data;
    //             console.log(channel);
    //             setChannelState(channel);
                
    //             const productresponse = await axios.get(`${URL}/product`,{
    //                 headers : {
    //                     Authorization : `Bearer ${token}`
    //                 }
    //             });
    //             const product = await productresponse.data;
    //             console.log(product);
    //             setProductState(product);
                
    //             if(userState.username){
    //                 userChannels = userState.user.channels
    //             }

    //             setLoading(false);
    //             console.log('User Updation complete');
    //         }
    //         catch(error){
    //             console.log(error);
    //             setLoading(false);
    //         }
    //     }
    //     getdata();
    // },[]);



    return(
        <div className="bg-gray-100 min-h-screen">
            <div>
                <Navbar />
                <div className="relative mb-5">
                    <div className="overflow-hidden w-full ">
                        <img src="https://c4.wallpaperflare.com/wallpaper/297/22/531/lake-blue-moonlight-moon-wallpaper-preview.jpg" 
                        className="w-full h-60 object-cover" 
                        />
                    </div>
                    <div className="absolute inset-20 text-center">
                        <div className="text-5xl text-white shadow-2">
                            Your Favourite Creators......
                        </div>
                    </div>
                </div>
                <div className="flex justify-center m-3">
                    <ChannelArray channels={channelState} userChannels={userChannels} />
                </div>
            </div>
        </div>
    )
}