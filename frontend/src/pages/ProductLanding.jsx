import { useRecoilValue, useRecoilState } from "recoil";
import { productAtom, userAtom} from "../store/userAtom";
import { Navbar } from "../components/NavBar";
import { useParams } from "react-router-dom";
import { addToCart_apicall, removeFromCart_apicall } from "../components/Products";
import { Qty } from "../components/Products";
import { cartAtom } from "../store/userAtom";
import { useState } from "react";

function ProductLanding({}){
    const {productid} = useParams();
    const products = useRecoilValue(productAtom);
    console.log(products)
    const product = products.find((obj=>obj._id===productid))
    console.log(product);

    const user = useRecoilValue(userAtom);
    const [cart,setCart] = useRecoilState(cartAtom)
    const [inCart, setInCart] = useState(cart.includes(product._id))

    async function addToCart(){
        setCart(prev=>[...prev, product._id])
        setInCart(true)
        await addToCart_apicall({productid : product._id, username : user.username});
    }

    return(
        <div>
            <Navbar />
            <div className="m-20 bg-slate-100 rounded-md">
                <div className="flex justify-center items-center">
                    <div className="w-1/3 overflow-hidden rounded-md">
                        <img src={product.image} className="overflow-hidden"/>
                    </div>
                    <div className="m-10 w-2/3">
                        <div className="m-4 text-5xl font-medium">
                            {product.title}
                        </div>
                        <div className="mx-4 my-10 text-2xl font-thin">
                            {product.description}
                        </div>
                        <div className="text-4xl m-4">
                            ₹{product.price}
                        </div>
                        <div className="m-4 border-2 border-black w-min">
                        {
                            inCart ?
                            <Qty productid={product._id}/>
                            :
                            <button className="p-3 border-2 my-2 bg-slate-400 rounded-md hover:bg-slate-600 hover:text-white hover:font-medium hover:text-lg"
                            onClick={addToCart}
                            >
                                Add to Cart
                            </button>
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductLanding;