import RegisterInput from "@/app/components/input/register";
import { registerWithCredentials } from "@/app/libs/utils/auth.actions";

interface RegisterPageProps {
    searchParams: {
        callbackUrl?: string
    }
}

const RegisterPage = ({
    searchParams: { callbackUrl }
}: RegisterPageProps) => {
    return (
        <div className="w-full">
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        alt="Your Company"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        註冊一個帳號
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <RegisterInput
                        callbackUrl={callbackUrl || '/'}
                        registerWithCredentials={registerWithCredentials}
                    />
                </div>

                <p className="mt-10 text-center text-sm text-gray-500">
                    已經有帳號了嗎？{' '}
                    <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        登入
                    </a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
