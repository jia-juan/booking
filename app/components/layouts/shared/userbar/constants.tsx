import { signOut } from "next-auth/react"

export const USER_NAVIGATION = [
    { name: '個人資料', href: '#' },
    { 
        name: '登出', 
        href: '#', 
        onClick: () => signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/lo`
        })
    },
]
