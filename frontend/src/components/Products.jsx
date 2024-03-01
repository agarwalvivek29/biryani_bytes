import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { cartAtom, userAtom } from "../store/userAtom"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export async function addToCart_apicall({productid, username}){

    try{
        const res = axios.post(`http://localhost:3000/addtocart/${productid}`,{
            username
        })
        console.log(res.data);
    }
    catch(e){
        console.log(e)
    }
}

export async function removeFromCart_apicall({productid, username}){

    try{
        const res = axios.post(`http://localhost:3000/removefromcart/${productid}`,{
            username
        })
        console.log(res.data);
    }
    catch(e){
        console.log(e)
    }
}

export function ProductCard({product}){
    const user = useRecoilValue(userAtom);
    const [cart,setCart] = useRecoilState(cartAtom)
    const [inCart, setInCart] = useState(cart.includes(product._id))

    async function addToCart(){
        setCart(prev=>[...prev, product._id])
        setInCart(true)
        await addToCart_apicall({productid : product._id, username : user.username});
    }

    const navigate = useNavigate();

    console.log(product);

    return(
        <div className="flex m-2 p-2 bg-slate-300 rounded-md max-w-6xl items-center cursor-pointer"
        
        >
            <div className="md:max-w-80 md:max-h-80 overflow-hidden m-3 rounded-md"
            onClick={()=>{
                navigate(`/product/${product._id}`)
            }}
            >
                <img src={product.image}/>
            </div>
            <div className="p-5">
                <div onClick={()=>{
                navigate(`/product/${product._id}`)
            }}>
                    <div className="font-medium text-2xl p-1">
                        {product.title}
                    </div>
                    <div className="hidden md:block font-thin text-sm p-1">
                        {product.description}
                    </div>
                    <div className="font-medium text-xl p-1 my-2">
                        ₹{product.price}
                    </div>
                </div>
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
    )
}

export function ProductArray({products}){
    return(
        <div>
            {products.map((product)=>{
                return(
                    <ProductCard key={product._id} product={product}/>
                )                    
            })}
        </div>
    )
}

export function Qty({productid}){
    console.log(productid);
    const user = useRecoilValue(userAtom);

    const [cart,setCart] = useRecoilState(cartAtom);
    const [qty, setQty] = useState(0)

    useEffect(()=>{
        const x = cartcount();
        setQty(x);
    },[])

    function cartcount(){
        if(cart.includes(productid)){
            let count = 0;
            for(let i=0;i<cart.length;i++){
                if(cart[i]==productid){
                    count+=1
                }
            }
            return count
        }
        else{
            return 0
        }
    };

    const styleButton = 'p-2 text-2xl hover:bg-black hover:text-white';
  
    async function addToCart(){
        setCart(prev=>[...prev,productid]);
        setQty(prev=>prev+1)
        console.log(cart,"cart");
        await addToCart_apicall({productid : productid, username : user.username});
    }

    async function removeFromCart(){
        const index = cart.indexOf(productid);
        let carttemp = cart.slice();
        carttemp.splice(index,1)
        setQty(prev=>prev-1)
        setCart(carttemp);
        console.log(cart,"cart");
        await removeFromCart_apicall({productid : productid, username : user.username})
    }

    return (
        <button className="flex items-center bg-white rounded-md">
            <button className={styleButton} onClick={removeFromCart}>-</button>
            <div className={styleButton}>{qty}</div>
            <button className={styleButton} onClick={addToCart}>+</button>
        </button>
    );
}