import Pagination from "@/app/components/ui/pagination"
import TabStudents from "@/app/components/ui/tab/students"
import Students from "@/app/components/ui/list/students"

export default function StudentsPage() {
    return (
        <>
            <TabStudents />
            <Students />
            <Pagination />
        </>
    )
}