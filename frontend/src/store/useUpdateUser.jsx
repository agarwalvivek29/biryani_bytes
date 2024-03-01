import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userAtom } from "./userAtom";

export async function useUpdateUser(){

    const setUserState = useSetRecoilState(userAtom);

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
    }
    catch(e){
        console.log(e);
        console.log("Error updating user Data, Custom Hook useUpdateUser");
    }
}