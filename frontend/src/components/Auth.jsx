import axios from "axios"
import { useRecoilValue, useSetRecoilState , useRecoilState} from 'recoil'
import { signupAtom, signinAtom } from "../store/authAtom"
import { Icon } from "./Icons"
import { useNavigate } from 'react-router-dom';
import { set, z } from 'zod';
import { useState } from "react";
import { cookieAtom } from "../store/cookieAtom";

const textfield_style = 'm-1 p-3 rounded-sm w-80'
const button_Style = 'm-2 center shadow p-4 rounded-md w-40 text-xl font-medium'

function Warn({message = '* This is a required field',type=false}){
    let colset = type ? 'text-green-500' : 'text-red-500'
    return(
        <div className='font-thin text-sm'>
            <div className = {colset} >
                {message}
            </div>
        </div>
    )
}

async function apicall_final(props){
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
};

async function apicall_username_avl(username){
    try{
        const response = await axios.get(`http://localhost:3000/auth/username_avl/${username}`);
        return response.data;
    }   
    catch(e){
        console.log(e);
        return null
    }
};

export function SignIn(){
    const [signInState,setSignInState] = useRecoilState(signinAtom);
    const [warn,setWarn] = useState(false);
    const navigate = useNavigate();

    async function handleSignIn(){
        console.log(signInState);
        const token = await apicall_final({data : {
            'username' : signInState.username,
            'password' : signInState.password
        }, endpoint: 'signin'});
        if(!token){
            <alert>"Login failed"</alert>
        }
        document.cookie = `token=${token}; Secure; SameSite=None;`
        navigate('/');
    }

    return(
        <div className="justify-center items-center">
            <div>
                <input placeholder="Username" onChange={(e)=>{
                    setSignInState((prevstate)=>({
                        ...prevstate,
                        username : e.target.value
                    }))
                }}
                className={textfield_style} title="heelo"/>
            </div>
            {warn ? <Warn /> : ''}
            <div>
                <input 
                placeholder="Password" 
                type="password"
                onChange={(e)=>{
                    setSignInState((prevstate)=>({
                        ...prevstate,
                        password : e.target.value
                    }))
                }}
                className={textfield_style} />
            </div>
            {warn ? <Warn /> : ''}
            <div className="flex justify-center items-center">
                <button onClick={()=>{
                    if(signInState.username && signInState.password){
                        handleSignIn();
                    }
                    else{
                        alert('Please Enter Valid Details')
                        setWarn(true);
                    }
                }}
                className={button_Style}>Sign-In</button>
            </div>
        </div>
    )
}

export function SignUp(){
    const signUpSchema = z.object({
        username : z.string().min(6),
        password : z.string().min(8),
        email : z.string().email()
    });

    const [warn,setWarn] = useState(false);

    const [signupState,setSignupState] = useRecoilState(signupAtom);

    const setCookie = useSetRecoilState(cookieAtom);

    const [warnings,setWarnings] = useState({
        username : '* This is a required field',
        password : '* This is a required field',
        email: '* This is a required field',
        username_valid : false,
        password_valid : false,
        email_valid : false,
        cnf_password_valid : false
    });

    const navigate = useNavigate();

    async function handleSignUp(){
        console.log(signupState);
        console.log(signupState);
        const token = await apicall_final({data : signupState, endpoint : 'signup'});
        document.cookie = `token=${token}; Secure; SameSite=None;`
        if(token){
            alert(`${signupState.username} registered successfully`);
            setCookie(true);
        }
        else{
            alert('Internal Server Error')
        }
        navigate('/');
    }

    return(
        <div className="justify-center items-center">
            <div>
                <input placeholder="Username" 
                onChange={async (e)=>{
                    setSignupState((prevstate)=>({
                        ...prevstate,
                        username : e.target.value
                    }))
                    if(signUpSchema.shape.username.safeParse(e.target.value).success){
                        const username = e.target.value;
                        const avl = await apicall_username_avl(username);
                        setWarnings((prevstate)=>({
                            ...prevstate,
                            username : avl ? `${e.target.value} is available` : `** ${e.target.value} is already taken`,
                            username_valid : avl ? true : false                           
                        }))
                    }
                    else{
                       setWarnings((prevstate)=>({
                        ...prevstate,
                        username : "** username should contain minimum 6 characters",
                        username_valid : false
                       }))
                    }             
                }}
                className={textfield_style} />
            </div>
            {warn ? <Warn message={warnings.username} type={warnings.username_valid}/> : ''}
            <div>
                <input placeholder="E-mail" onChange={(e)=>{
                    setSignupState((prevstate)=>({
                        ...prevstate,
                        email : e.target.value
                    }))
                    if(signUpSchema.shape.email.safeParse(e.target.value).success){
                        setWarnings((prevstate)=>({
                            ...prevstate,
                            email : '',
                            email_valid : true
                        }))
                    }
                    else{
                        setWarnings((prevstate)=>({
                            ...prevstate,
                            email : '** Enter a valid e-mail',
                            email_valid : false
                        }))
                        
                    }
                }}
                className={textfield_style} />
            </div>
            {warn ? <Warn message={warnings.email}/> : ''}
            <div>
                <input placeholder="Password" 
                type="password"
                onChange={(e)=>{
                    setSignupState((prevstate)=>({
                        ...prevstate,
                        password : e.target.value
                    }))
                    if(signUpSchema.shape.password.safeParse(e.target.value).success){
                        setWarnings((prevstate)=>({
                            ...prevstate,
                            password : '',
                            password_valid : true
                        }))
                    }
                    else{
                        setWarnings((prevstate)=>({
                            ...prevstate,
                            password : '** Password should contain atleast 8 characters',
                            password_valid : false
                        }))
                    }
                }}
                className={textfield_style} />
            </div>
            {warn ? <Warn message={warnings.password}/> : ''}
            <div>
                <input placeholder="Confirm-Password" 
                type="password"
                onChange={(e)=>{
                    setSignupState((prevstate)=>({
                        ...prevstate,
                        cnfpassword : e.target.value
                    }))
                    setWarnings((prevstate)=>({
                        ...prevstate,
                       cnf_password_valid : e.target.value == signupState.password
                    }))
                }}
                className={textfield_style} />
                {signupState.password == signupState.cnfpassword ? '' : <Warn message="** Passwords do not match"/>}
            </div>
            <div className="flex justify-center items-center">
                <button 
                onClick={
                    ()=>{
                        console.log(warnings)
                        console.log(signupState)
                        console.log(warnings.cnf_password_valid && warnings.email_valid && warnings.password_valid && warnings.username_valid);
                        if((warnings.cnf_password_valid && warnings.email_valid && warnings.password_valid && warnings.username_valid)){
                            handleSignUp();
                        }
                        else{
                            alert('** Kindly Enter Valid Details')
                            setWarn(true);
                        }
                    }
                }
                className={button_Style}>
                Sign-Up
                </button>
            </div>         
        </div>
    )
};