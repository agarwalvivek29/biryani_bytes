import { Navbar } from "../components/NavBar";
import { channelAtom, productAtom, userAtom } from "../store/userAtom";
import { useEffect , useState} from "react";
import axios from "axios";
import { useRecoilValue , useRecoilState} from "recoil";
import { ChannelArray } from "../components/Channel";
import { SideBar } from "../components/SideBar";

export function LandingPage(){

    const [userState, setUserState] = useRecoilState(userAtom);
    const [channelState, setChannelState] = useRecoilState(channelAtom);
    const [productState, setProductState] = useRecoilState(productAtom);
    const [loading, setLoading] = useState(true);

    console.log('Initialization user');
    useEffect(()=>{
        const getdata = async ()=>{
            try{
                const cookie = document.cookie;
                const token = cookie.split('=')[1];
                const userresponse = await axios.get(`http://localhost:3000/user`,{
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                });
                const user = userresponse.data;
                console.log(user);
                setUserState(user);
                
                const channelresponse = await axios.get(`http://localhost:3000/channel`,{
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                });
                const channel = await channelresponse.data;
                console.log(channel);
                setChannelState(channel);
                
                const productresponse = await axios.get(`http://localhost:3000/product`,{
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                });
                const product = await productresponse.data;
                console.log(product);
                setProductState(product);
                
                setLoading(false);
                console.log('User Updation complete');
            }
            catch(error){
                console.log(error);
                setLoading(false);
            }
        }
        getdata();
    },[]);

    // useEffect(() => {
    //     console.log(userState, 'State Variable');
    // }, [userState]);
    
    // useEffect(() => {
    //     console.log(channelState, 'State Variable');
    // }, [channelState]);

    // useEffect(() => {
    //     console.log(channelState, 'State Variable');
    // }, [channelState]);

    

    return(
        <div className="bg-gray-100 min-h-screen">
            {loading ? '' : <div>
                    <Navbar />
                    <div className="flex">
                        <SideBar />
                        <ChannelArray channels={channelState} />
                    </div>
                </div>}
        </div>
    )
}