'use client'
import { signIn } from "next-auth/react"

export default function Login() {

    async function loginAction(formData: FormData) {
        try {
            await signIn('credentials', {
                email: formData.get('email'),
                password: formData.get('password'),
                callbackUrl: "/blogs"
            })
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Sign In</h1>
            <form
                className="flex flex-col items-center justify-center gap-2 p-3 shadow-sm"
                action={loginAction}>
                <div className="flex gap-1">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="p-2 text-black rounded-sm border"
                        placeholder="Type your email here ..."
                    />
                </div>
                <div className="flex gap-1">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="p-2 text-black rounded-sm border"
                        placeholder="Type your password here ..."
                    />
                </div>
                <div className="mt-3">
                    <button className="bg-blue-600 hover:bg-blue-700 rounded-sm text-white p-3">Sign In</button>
                </div>
            </form>
        </div>
    )
}
