import { useRecoilValue } from "recoil"
import { cartAtom } from "../store/userAtom"
import { json } from "react-router-dom";

export function CheckOutSection({ cartProducts }) {

    const cart = useRecoilValue(cartAtom);
    const jsonObject = {}

    for (let i = 0; i < cart.length; i++) {
        const productId = cart[i]
        if(jsonObject[productId]){
            jsonObject[productId].count += 1
        }
        else {
            let product = cartProducts.find(obj => obj._id === productId)
            jsonObject[productId] = {
                "title": product.title,
                "price": product.price,
                "count": 1
            }
        }
    }
    console.log(jsonObject);

    function total(){
        let count = 0
        Object.keys(jsonObject).map((prodId)=>{
            count+=(jsonObject[prodId].price*jsonObject[prodId].count)
        })
        return count;
    }

    return (
        <div className="bg-slate-300 m-2 rounded-md p-3 h-min">
            <div className="text-xl font-medium text-center">
                Order Summary
            </div>
            <div className="items-center justify-center flex-col">
                <table className="table-auto m-3">
                    <thead>
                        <tr className="border-b border-black">
                            <th className="p-3">Title</th>
                            <th className="p-3">Qty</th>
                            <th className="p-3">Price/Unit</th>
                        </tr>
                        </thead>
                    <tbody>
                        {Object.keys(jsonObject).map((prodId)=>{
                            return (<tr>
                                <td className="p-3">{jsonObject[prodId].title.substring(0,20)+'...'}</td>
                                <td className="p-3">{jsonObject[prodId].count}</td>
                                <td className="p-3">₹{jsonObject[prodId].price}</td>
                            </tr>)
                        })}
                        <tr className="border-b border-black"></tr>
                    </tbody>                    
                </table>
                <div className="flex justify-center text-lg">
                    <div className="p-2">
                    Total Price
                    </div>
                    <div className="p-2 font-medium text-xl">
                        ₹{total()}
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className="p-3 border-2 border-black ">
                        Proceed to Pay
                    </button>
                </div>
            </div>
        </div>
    )
}