import { Student } from '@/app/api/user/dto.student'
import DefaultAvatar from "@/app/components/ui/avatar/default/twelve";

export default function Students({ 
    students, 
    tab,
    onApprove, 
    onDelete 
}: { 
    students: Student[], 
    tab: string,
    onApprove: (studentId: string) => void, 
    onDelete: (studentId: string) => void 
}) {

    return (
        <ul role="list" className="divide-y divide-gray-100">
            {students.map((student) => (
                <li key={student.id} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        {student.image ? (
                            <img alt="" src={student.image} className="h-12 w-12 flex-none rounded-full bg-gray-50" />
                        ) : (
                            <DefaultAvatar />
                        )}
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                                <a href={student.href} className="hover:underline">
                                    {student.name}
                                </a>
                            </p>
                            <p className="mt-1 flex text-xs leading-5 text-gray-500">
                                <a href={`mailto:${student.email}`} className="truncate hover:underline">
                                    {student.email}
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="ml-4 mt-2 flex-shrink-0">
                        {tab === 'registered' ? (
                            <button
                                onClick={() => onDelete(student.id)}
                                type="button"
                                className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm bg-pink-600 hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                            >
                                刪除
                            </button>
                        ) : (
                            <button
                                onClick={() => onApprove(student.id)}
                                type="button"
                                className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                審核
                            </button>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    )
}
