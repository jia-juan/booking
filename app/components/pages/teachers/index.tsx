"use client"

import axios from 'axios';
import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import Pagination from "@/app/components/ui/pagination"
import TabTeachers from "@/app/components/ui/tab/teachers"
import Teachers from "@/app/components/ui/list/teachers"
import { Teacher } from "@/app/api/user/dto.teacher"
import { useQueryClient } from "@tanstack/react-query";

export default function TeachersPage() {
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [tab, setTab] = useState('registered');
    const [totalPages, setTotalPages] = useState(0);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    
    const { data: registeredData } = useQuery({
        queryKey: ["registeredData", page, limit],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/teachers/registered?page=${page}&limit=${limit}`)
            return res.json()
        }
    })

    const { data: allData } = useQuery({
        queryKey: ["allData", page, limit],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/teachers/all?page=${page}&limit=${limit}`)
            return res.json()
        }
    })

    const tabCounts = {
        registered: registeredData?.total || 0,
        all: allData?.total || 0,
    }

    useEffect(() => {
        if (registeredData && allData) {
            const total = tab === 'registered' ? tabCounts.registered : tabCounts.all;
            setTotalPages(Math.ceil(total / limit));
            setTeachers(tab === 'registered' ? registeredData?.registeredTeachers : allData?.teachers);
        }
    }, [tab, tabCounts, limit, registeredData, allData]);

    const queryClient = useQueryClient();

    const handleButtonClick = async (teacherId: string) => {
        console.log(`Teacher ID: ${teacherId} button clicked`);
        // 處理按鈕點擊的邏輯
        await axios.post('/api/user/teachers/all', { teacherId });
        // 重新獲取資料
        queryClient.invalidateQueries({ queryKey: ["registeredData"] });
        queryClient.invalidateQueries({ queryKey: ["allData"] });
    }

    return (
        <>
            <TabTeachers setTab={setTab} tabCounts={tabCounts} />
            <Teachers teachers={teachers} onButtonClick={handleButtonClick} />
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </>
    )
}