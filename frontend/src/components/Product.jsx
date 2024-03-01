// import { useRecoilValue } from "recoil";
// import { productAtom } from "../store/userAtom";

// export function ProductArray({channel}){
//     const products = useRecoilValue(productAtom);
//     const filtered = products.filter((product)=>channel.products.has(product._id));
//     return(
//         <div>
//             {filtered.map((product)=>{
//                 <Product key={product._id} product={product}/>
//             })}
//         </div>
//     )
// }

// function Product({product}){
//     return(
//         <div className="flex">
//             <div className=" w-40 h-40 overflow-hidden rounded-sm">
//                 <img src={product.image} />
//             </div>
//             <div>
//                 <div>
//                     {product.title}
//                 </div>
//                 <div>
//                     {product.description}
//                 </div>
//                 <div>
//                     {}
//                 </div>
//             </div>
//         </div>
//     )
// }

