import { useParams } from "react-router-dom";
import { Navbar } from "../components/NavBar";
import { ProductArray } from "../components/Products";
import { useRecoilValue } from "recoil";
import { channelAtom, productAtom } from "../store/userAtom";
import { ChannelHead } from "../components/channel_head";
import { useEffect } from "react";

export function CreatorInfo({user}){
    return(
        <div className="flex justify-center xl:mr-8">
            Creator INfo
        </div>
    )
}

function StoreFront(){

    const { channelid } = useParams();

    const channels = useRecoilValue(channelAtom);
    const channel = channels.filter(obj => obj._id == channelid)

    const products = useRecoilValue(productAtom);
    console.log(products);

    const channelproducts = products.filter(obj => obj.channel == channelid);
    console.log(channelproducts);

    return(
        <div>
            <Navbar />
            <div className="">
                <ChannelHead channel={channel[0]}/>
                <div className="flex lg:mx-40">
                    <ProductArray products={channelproducts}/>
                    <div className="hidden md:block">
                        <CreatorInfo />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StoreFront;