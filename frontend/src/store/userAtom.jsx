import axios from 'axios'
import { useEffect } from 'react'
import {atom, useRecoilState} from 'recoil'

export const userAtom = atom({
    key : 'userAtom',
    default : {}
});

export const channelAtom = atom({
    key : 'channelAtom',
    default : []
});

export const productAtom = atom({
    key : 'productAtom',
    default : []
});

export const cartAtom = atom({
    key : "cartAtom",
    default : []
})