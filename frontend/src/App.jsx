import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AuthPage from './pages/Auth'
import { RecoilRoot, useRecoilState } from 'recoil'
import { CreateChannel } from './pages/CreateChannel'
import { LandingPage } from './pages/Landing'
import { useEffect, useState } from 'react'
import { Product } from './pages/Product'
import { cookieAtom } from './store/cookieAtom'
import StoreFront from './pages/StoreFront'
import ProductLanding from './pages/ProductLanding'
import CartView from './pages/CartView'
import { userAtom, channelAtom, productAtom, cartAtom } from './store/userAtom'
import axios from 'axios'
import Loading from './pages/Loading'

function App() {

  const [userState, setUserState] = useRecoilState(userAtom);
  const [channelState, setChannelState] = useRecoilState(channelAtom);
  const [productState, setProductState] = useRecoilState(productAtom);
  const [cart, setCart] = useRecoilState(cartAtom);
  const [loading, setLoading] = useState(true);

  console.log('Initialization user');

  useEffect(() => {
    const getdata = async () => {
      try {
        const cookie = document.cookie;
        const token = cookie.split('=')[1];
        const userresponse = await axios.get(`http://localhost:3000/user`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const user = userresponse.data;
        console.log(user, "user");
        setUserState(user);

        if (user) {
          setCart(user.cart);
        }

        const channelresponse = await axios.get(`http://localhost:3000/channel`);
        const channel = await channelresponse.data;
        console.log(channel);
        setChannelState(channel);

        const productresponse = await axios.get(`http://localhost:3000/product`);
        const product = await productresponse.data;
        console.log(product);
        setProductState(product);

        setLoading(false);
        console.log('data Updation complete');
      }
      catch (error) {
        console.log(error);
        setTimeout(()=>{
          setLoading(false);
        },1000)
      }
    }
    getdata();
  }, []);

  return (
    <BrowserRouter>
      {loading ? (
        <Loading />
      )
      :
      (<Routes>
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/shop' element={<Product />} />
        <Route path='/' element={<LandingPage />} />
        <Route path='/dashboard' element={<CreateChannel />} />
        <Route path='/store/:channelid' element={<StoreFront />} />
        <Route path='/product/:productid' element={<ProductLanding />} />
        <Route path='/cart' element={<CartView />} />
      </Routes>)}
    </BrowserRouter>
  )
}

export default App
