import { useRecoilValue } from "recoil";
import { Navbar } from "../components/NavBar";
import { ProductArray } from "../components/Products";
import { SideBar } from "../components/SideBar";
import { productAtom } from "../store/userAtom";

export function Product(){

    const products = useRecoilValue(productAtom);

    return(
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="relative mb-5">
                <div className="overflow-hidden h-50 w-full ">
                    <img src="https://mcdn.wallpapersafari.com/medium/72/22/8l3hag.jpg" 
                    className="w-full h-60 object-cover" 
                    />
                </div>
                <div className="absolute inset-28 text-center">
                    <div className="text-4xl">
                        <div className="p-2">
                            Welcome to #TRENDZ
                        </div>
                        <div className="text-5xl font-thin">
                            To the World Inspired by Influencers.....
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center m-3">
                <ProductArray products={products} />
            </div>
        </div>
    )
}