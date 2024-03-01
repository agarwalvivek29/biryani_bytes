import { atom } from "recoil";

export const cookieAtom = atom({
    key : "cookieAtom",
    default : document.cookie
})