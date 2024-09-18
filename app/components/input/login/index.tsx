"use client"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLoginValidation } from "@/app/libs/validators/auth";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import GoogleSignInButton from "@/app/components/button/google/oauth";

type FormValues = z.infer<typeof userLoginValidation>;

const LoginInput = ({ callbackUrl }: { callbackUrl: string }) => {

    const {register, handleSubmit, formState: {errors}} = useForm<FormValues>({
        resolver: zodResolver(userLoginValidation)
    });
    
    async function onSubmit(values: z.infer<typeof userLoginValidation>) {
        await signIn("credentials", {
            email: values.email,
            password: values.password,
            callbackUrl
        })
    }

    return (
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        電子郵件
                    </label>
                    <div className="mt-2">
                        <input
                            id="email"
                            {...register('email')}
                            type="email"
                            required
                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        密碼
                    </label>
                    <div className="mt-2">
                        <input
                            id="password"
                            {...register('password')}
                            type="password"
                            required
                            autoComplete="current-password"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                            記住我
                        </label>
                    </div>

                    <div className="text-sm leading-6">
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            忘記密碼？
                        </a>
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        登入
                    </button>
                </div>
            </form>
            <div>
                <div className="relative mt-10">
                    <div aria-hidden="true" className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"/>
                    </div>
                    <div className="relative flex justify-center text-sm font-medium leading-6">
                        <span className="bg-white px-6 text-gray-900">或繼續使用</span>
                    </div>
                </div>

                <div className="mt-6 flex justify-center">
                    <GoogleSignInButton callbackUrl='/#'>
                        Google
                    </GoogleSignInButton>
                </div>
            </div>
        </div>
    );
};

export default LoginInput;
