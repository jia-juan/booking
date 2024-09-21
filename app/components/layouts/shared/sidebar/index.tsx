import { MAIN_NAVIGATION, ADMIN_NAVIGATION, STUDENT_NAVIGATION } from "./constants";
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'
import {
    XMarkIcon,
    Cog6ToothIcon,
} from '@heroicons/react/24/outline'
import classNamesActivate from '../../../libs/classNamesActivate'
import { useSession } from 'next-auth/react'
import Loading from '@/app/components/ui/loading'

export default function Sidebar({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean; setSidebarOpen: (open: boolean) => void }) {
    const { data: session, status } = useSession()

    if (status === 'loading') {
        return <Loading />
    }

    const navigation = session?.user.role === "STUDENT" ? STUDENT_NAVIGATION : MAIN_NAVIGATION;

    return (
        <>
            {/* 對話框側邊欄（手機端） */}
            <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                <DialogBackdrop className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear" />

                <div className="fixed inset-0 flex">
                    <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out">
                        <TransitionChild>
                            <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                    <span className="sr-only">Close sidebar</span>
                                    <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                                </button>
                            </div>
                        </TransitionChild>
                        {/* 側邊欄內容 */}
                        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                            <div className="flex h-16 shrink-0 items-center">
                                <img
                                    alt="Your Company"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                    className="h-8 w-auto"
                                />
                            </div>
                            <nav className="flex flex-1 flex-col">
                                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                    <li>
                                        <ul role="list" className="-mx-2 space-y-1">
                                            {navigation.map((item) => (
                                                <li key={item.name}>
                                                    <a
                                                        href={item.href}
                                                        className={classNamesActivate(
                                                            item.current
                                                                ? 'bg-gray-50 text-indigo-600'
                                                                : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                        )}
                                                    >
                                                        <item.icon
                                                            aria-hidden="true"
                                                            className={classNamesActivate(
                                                                item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                                                'h-6 w-6 shrink-0',
                                                            )}
                                                        />
                                                        {item.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                    {session?.user.role === 'ADMIN' && (
                                        <>
                                            <li>
                                                <div className="text-xs font-semibold leading-6 text-gray-400">Manager</div>
                                                <ul role="list" className="-mx-2 mt-2 space-y-1">
                                                    {ADMIN_NAVIGATION.map((sub_item) => (
                                                        <li key={sub_item.name}>
                                                            <a
                                                                href={sub_item.href}
                                                                className={classNamesActivate(
                                                                    sub_item.current
                                                                        ? 'bg-gray-50 text-indigo-600'
                                                                        : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                                                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                                )}
                                                            >
                                                                <span
                                                                    className={classNamesActivate(
                                                                        sub_item.current
                                                                            ? 'border-indigo-600 text-indigo-600'
                                                                            : 'border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                                                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium',
                                                                    )}
                                                                >
                                                                    {sub_item.initial}
                                                                </span>
                                                                <span className="truncate">{sub_item.name}</span>
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>

                                        </>
                                    )}
                                    <li className="mt-auto">
                                        <a
                                            href="/settings"
                                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                                        >
                                            <Cog6ToothIcon
                                                aria-hidden="true"
                                                className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                                            />
                                            設定
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                {/* Sidebar component */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                        <img
                            alt="Your Company"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            className="h-8 w-auto"
                        />
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                href={item.href}
                                                className={classNamesActivate(
                                                    item.current
                                                        ? 'bg-gray-50 text-indigo-600'
                                                        : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                )}
                                            >
                                                <item.icon
                                                    aria-hidden="true"
                                                    className={classNamesActivate(
                                                        item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                                        'h-6 w-6 shrink-0',
                                                    )}
                                                />
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            {session?.user.role === 'ADMIN' && (
                                <>
                                    <li>
                                        <div className="text-xs font-semibold leading-6 text-gray-400">Manager</div>
                                        <ul role="list" className="-mx-2 mt-2 space-y-1">
                                            {ADMIN_NAVIGATION.map((sub_item) => (
                                                <li key={sub_item.name}>
                                                    <a
                                                        href={sub_item.href}
                                                        className={classNamesActivate(
                                                            sub_item.current
                                                                ? 'bg-gray-50 text-indigo-600'
                                                                : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                        )}
                                                    >
                                                        <span
                                                            className={classNamesActivate(
                                                                sub_item.current
                                                                    ? 'border-indigo-600 text-indigo-600'
                                                                    : 'border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                                                'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium',
                                                            )}
                                                        >
                                                            {sub_item.initial}
                                                        </span>
                                                        <span className="truncate">{sub_item.name}</span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>

                                </>
                            )}
                            <li className="mt-auto">
                                <a
                                    href="/settings"
                                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                                >
                                    <Cog6ToothIcon
                                        aria-hidden="true"
                                        className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                                    />
                                    設定
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}