import { Teacher } from "@/app/api/user/dto.teacher";
import DefaultAvatar from "@/app/components/ui/avatar/default/twelve";

export default function Teachers({
    teachers,
    tab,
    onRegisterClick,
    onBookingClick
}: {
    teachers: Teacher[],
    tab: string,
    onRegisterClick: (teacherId: string) => void,
    onBookingClick: (teacherId: string) => void
}) {

    return (
        <ul role="list" className="divide-y divide-gray-100">
            {teachers.map((teacher) => (
                <li key={teacher.id} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        {teacher.image ? (
                            <img alt="" src={teacher.image} className="h-12 w-12 flex-none rounded-full bg-gray-50" />
                        ) : (
                            <DefaultAvatar />
                        )}
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                                <a href={teacher.href} className="hover:underline">
                                    {teacher.name}
                                </a>
                            </p>
                            <p className="mt-1 flex text-xs leading-5 text-gray-500">
                                <a href={`mailto:${teacher.email}`} className="truncate hover:underline">
                                    {teacher.email}
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="ml-4 mt-2 flex-shrink-0">
                        {tab === 'registered' ? (
                            <button
                                onClick={() => onBookingClick(teacher.id)}
                                type="button"
                                className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                預約
                            </button>
                        ) : (
                            <button
                                onClick={() => onRegisterClick(teacher.id)}
                                type="button"
                                className={`relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ${teacher.registered ? 'bg-gray-400 hover:bg-gray-300' : 'bg-indigo-600 hover:bg-indigo-500'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${teacher.registered ? 'focus-visible:outline-gray-400' : 'focus-visible:outline-indigo-600'}`}
                                disabled={teacher.registered}
                            >
                                註冊
                            </button>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    )
}
