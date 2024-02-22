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

export const signinAtom = atom({
    key : 'signinAtom',
    default : {
        username : '',
        password : ''
    }
});