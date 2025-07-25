'use client'

import { SignInInput, signInSchema } from "@/utils/validation/auth.schema";
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

export default function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm<SignInInput>({
        resolver: zodResolver(signInSchema)
    })

    async function handleLogin() {
    }

    return (
        <main className="max-w-md mx-auto mt-20 p-6 shadow rounded">
            <h1 className="text-2xl font-bold mb-4">Sign In</h1>
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
                >Sign In</button>
            </form>
        </main>
    )
}
