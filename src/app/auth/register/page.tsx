'use client'

import { SignInInput, signInSchema } from "@/utils/validation/auth.schema";
import { useForm } from 'react-hook-form'
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/utils/store";
import { signUp } from "@/utils/slices/auth.slice";

import React from "react";

export default function Login() {

    const dispatch = useAppDispatch()
    const router = useRouter()

    const { loading, error, user } = useAppSelector((state) => state.auth)

    const { register, handleSubmit, formState: { errors } } = useForm<SignInInput>({
        resolver: zodResolver(signInSchema)
    })

    async function handleLogin(data: SignInInput) {
        try {
            dispatch(signUp(data))
            console.log('user : ', user)
            alert(`Welcome, ${user}`)
            // router.push('/blogs')
        } catch (error) {
            alert(error)
        }
    }

    return (
        <main className="max-w-md mx-auto mt-20 p-6 shadow rounded">
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="w-full border px-2 py-1"
                        {...register("email")}
                    />
                    {errors.email && (<p className="text-red-500 text-sm">{errors.email.message}</p>)}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="w-full border px-2 py-1"
                        {...register("password")}
                    />
                    {errors.password && (<p className="text-red-500 text-sm">{errors.password.message}</p>)}
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >Submit</button>
            </form>
        </main>
    )
}
