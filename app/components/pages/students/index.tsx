"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Student } from "@/app/api/user/dto.student"
import Pagination from "@/app/components/ui/pagination"
import TabStudents from "@/app/components/ui/tab/students"
import Students from "@/app/components/ui/list/students"
import { useQuery } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query";

export default function StudentsPage() {
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [tab, setTab] = useState('registered');
    const [totalPages, setTotalPages] = useState(0);
    const [students, setStudents] = useState<Student[]>([]);

    const { data: registeredData } = useQuery({  // todo 改 axios
        queryKey: ["registeredData", page, limit],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/students/registered?page=${page}&limit=${limit}`)
            return res.json()
        }
    })

    const { data: pendingData } = useQuery({  // todo 改 axios
        queryKey: ["pendingData", page, limit],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/students/pending?page=${page}&limit=${limit}`)
            return res.json()
        }
    })

    const tabCounts = {
        registered: registeredData?.total || 0,
        pending: pendingData?.total || 0,
    }

    useEffect(() => {
        if (registeredData && pendingData) {
            const total = tab === 'registered' ? tabCounts.registered : tabCounts.pending;
            setTotalPages(Math.ceil(total / limit));
            setStudents(tab === 'registered' ? registeredData?.students : pendingData?.students);
        }
    }, [tab, tabCounts, limit, registeredData, pendingData]);

    const queryClient = useQueryClient();

    const handleApprove = async (studentId: string) => {
        await axios.post('/api/user/students/pending', { studentId });
        queryClient.invalidateQueries({ queryKey: ["registeredData"] });
        queryClient.invalidateQueries({ queryKey: ["pendingData"] });
    }

    const handleDelete = async (studentId: string) => {
        await axios.delete('/api/user/students/registered', { data: { studentId } });
        queryClient.invalidateQueries({ queryKey: ["registeredData"] });
        queryClient.invalidateQueries({ queryKey: ["pendingData"] });
    }

    console.log(students)

    return (
        <>
            <TabStudents setTab={setTab} tabCounts={tabCounts} />
            <Students students={students} tab={tab} onApprove={handleApprove} onDelete={handleDelete} />
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </>
    )
}