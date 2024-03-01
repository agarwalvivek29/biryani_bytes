import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartAtom, productAtom, userAtom } from "../store/userAtom";
import { Navbar } from "../components/NavBar";
import { ProductArray } from "../components/Products";
import { Icon } from "../components/Icons";
import { CheckOutSection } from "../components/CartProducts";
import { useNavigate } from "react-router-dom";

function CartView(){
    const products = useRecoilValue(productAtom);
    const cart = useRecoilValue(cartAtom);
    const cart_unique = [... new Set(cart)]
    const navigate = useNavigate();

    const cartProducts = products.filter(obj=>cart_unique.includes(obj._id))

    return(
        <div>
            <Navbar />
            <div className="flex items-center m-5 p-4 items-center">
                <Icon who="CartLarge" />
                <div className=" text-4xl font-medium p-2">
                    Cart
                </div>
            </div>
            <div className="mx-10 md:flex md:justify-between">
                {cartProducts.length==0 ?
                    <div className="text-5xl font-thin text-center flex-coljustify-center items-center w-full">
                        <div>
                            Cart is Empty
                        </div>
                        <div>
                            Checkout the Latest Products here !!!
                        </div>
                        <div className="flex justify-center" >
                            <button className="p-3 border-2 border-black flex justify-center bg-slate-200"
                            onClick={()=>{
                                navigate('/shop')
                            }}
                            >#Trending</button>   
                        </div>
                    </div>
                    :
                    <ProductArray products={cartProducts}/>
                }
                <CheckOutSection cartProducts={cartProducts}/>
            </div>
        </div>
    )
}

export default CartView;