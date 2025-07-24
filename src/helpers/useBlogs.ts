'use client'

import { fetcher } from "@/utils/lib/fetcher"
import useSWR from "swr"

// import axios from "axios"
// import { useState, useEffect } from "react"
// import { Blog } from "@/utils/interface/blog"
// import { fetcher } from "@/utils/lib/fetcher"

export function useBlogs() {
    // const [blogs, setBlogs] = useState<Blog | null>(null)
    // const [loading, setLoading] = useState<boolean>(false)
    // const [error, setError] = useState<string | null>(null)

    // async function fetchBlogs() {
    //     try {
    //         setLoading(true)
    //         const response = await axios.get('/api/blogs')
    //         setBlogs(response.data)
    //     } catch (error: any) {
    //         setError(error.message || 'Failed to fetch blogs')
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    // useEffect(() => {
    //     fetchBlogs()
    // }, [])

    // return { blogs, loading, error }

    // alternatif lain menggambil/get data dari blog selain pake useEffect dan SSR
    // ------ FETCH DATA BLOG WITH SWR -------

    const { data, error, isLoading } = useSWR('http://172.16.3.116:3000/api/blogs', fetcher, {
        revalidateOnFocus: true, // re-fetch saat window aktif kembali
        dedupingInterval: 10000 // 10 detik : tidak fetch ulang dalam interval ini
    })

    return {
        blogs: data,
        loading: isLoading,
        error: error
    }
}