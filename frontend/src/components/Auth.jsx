import axios from "axios"
import { useRecoilValue, useSetRecoilState , useRecoilState} from 'recoil'
import { passvalid, signupAtom, signinAtom } from "../store/authAtom"
import { Icon } from "./Icons"
import { useNavigate } from 'react-router-dom';

const textfield_style = 'm-1 p-3 rounded-sm w-80'
const button_Style = 'm-2 center shadow p-4 rounded-md w-40 text-xl font-medium'

async function apicall(props){
    try{
        console.log(props.data);
        const response = await axios.post(`http://localhost:3000/auth/${props.endpoint}`,props.data);
        console.log(response);
        return(response.data.token)
    }
    catch(error){
        console.log(error);
        return null
    }
}

export function SignIn(){
    const [signinState,setSigninState] = useRecoilState(signinAtom);
    const navigate = useNavigate();

    async function handleSignIn(){
        console.log(signinState);
        const token = await apicall({data : {
            'username' : signinState.username,
            'password' : signinState.password
        }, endpoint: 'signin'});
        if(!token){
            <alert>"Login failed"</alert>
        }
        document.cookie = `token=${token}; Secure; SameSite=None;`
        navigate('/');
    }

    return(
        <div className="justify-center items-center">
            <div >
                <input placeholder="Username" onChange={(e)=>{
                    setSigninState((prevstate)=>({
                        ...prevstate,
                        username : e.target.value
                    }))
                }}
                className={textfield_style} />
            </div>
            <div>
                <input placeholder="Password" onChange={(e)=>{
                    setSigninState((prevstate)=>({
                        ...prevstate,
                        password : e.target.value
                    }))
                }}
                className={textfield_style} />
            <div className="flex justify-center items-center">
                <button onClick={handleSignIn}
                className={button_Style}>Sign-In</button>
            </div>
            </div>
        </div>
    )
}

export function SignUp(){

    const [signupState,setSignupState] = useRecoilState(signupAtom);
    const ispassvalid = useRecoilValue(passvalid);

    return(
        <div className="justify-center items-center">
            <div>
                <input placeholder="Username" onChange={(e)=>{
                    setSignupState((prevstate)=>({
                        ...prevstate,
                        username : e.target.value
                    }))
                    
                }}
                className={textfield_style} />
            </div>
            <div>
                <input placeholder="E-mail" onChange={(e)=>{
                    setSignupState((prevstate)=>({
                        ...prevstate,
                        email : e.target.value
                    }))
                }}
                className={textfield_style} />
            </div>
            <div>
                <input placeholder="Password" onChange={(e)=>{
                    setSignupState((prevstate)=>({
                        ...prevstate,
                        password : e.target.value
                    }))
                }}
                className={textfield_style} />
            </div>
            <div>
                <input placeholder="Confirm-Password" onChange={(e)=>{
                    setSignupState((prevstate)=>({
                        ...prevstate,
                        cnfpassword : e.target.value
                    }))
                }}
                className={textfield_style} />
                {ispassvalid ? '' : <div className="text-sm font-thin flex">
                    <Icon who='not' /> Passwords don't match
                </div>}
            </div>
            <div className="flex justify-center items-center">
                <button onClick={async()=>{
                    console.log(signupState);
                    const token = await apicall({data : signupState, endpoint : 'signup'});
                    document.cookie = `token=${token}; Secure; SameSite=None;`;
                }}
                className={button_Style}>Sign-Up</button>
            </div>         
        </div>
    )
};