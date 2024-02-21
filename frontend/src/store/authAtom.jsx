import { atom, selector } from "recoil";

export const signupAtom = atom({
    key : 'signupAtom',
    default : {
        username : '',
        email : '',
        password : '',
        cnfpassword : ''
    }
});

export const passvalid = selector({
    key : 'passvalid',
    get : ({get})=>{
        const { password, cnfpassword } = get(signupAtom);
        return password === cnfpassword;
    }
});

{passvalid ? '' : <div>Passwords don't match</div>}


export const signinAtom = atom({
    key : 'signinAtom',
    default : {
        username : '',
        password : ''
    }
});