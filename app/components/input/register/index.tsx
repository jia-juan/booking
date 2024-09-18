"use client"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegisterValidation } from "@/app/libs/validators/auth";
import { useForm } from "react-hook-form";

type FormValues = z.infer<typeof userRegisterValidation>;

const RegisterInput = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(userRegisterValidation)
    });

    async function onSubmit(values: z.infer<typeof userRegisterValidation>) {
        // todo 註冊時做
        console.log(values)
    }

    return (
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                        姓名
                    </label>
                    <div className="mt-2">
                        <input
                            id="name"
                            {...register('name')}
                            type="text"
                            required
                            autoComplete="name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                </div>

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
                            autoComplete="new-password"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                        確認密碼
                    </label>
                    <div className="mt-2">
                        <input
                            id="confirmPassword"
                            {...register('confirmPassword')}
                            type="password"
                            required
                            autoComplete="new-password"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.confirmPassword &&
                            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            required
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor="terms" className="ml-3 block text-sm leading-6 text-gray-900">
                            我同意條款和條件
                        </label>
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        註冊
                    </button>
                </div>
            </form>

        </div>
    )
}

export default RegisterInput;