'use client'

import { useBlogs } from "@/helpers/useBlogs";
import Link from "next/link";
import Image from "next/image";
import { Blog } from "@/utils/interface/blog";
import { signOut } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authConfig } from "@/utils/auth/next-auth";
export default async function BlogList() {
    const { blogs, loading, error } = useBlogs();
    const session = await getServerSession(authConfig);

    console.log('session : ', session)

    if (loading) return <h2 className="text-center text-blue-700 font-bold">Loading blogs ... Please wait {session?.user?.name}</h2>;
    if (error) return <h2 className="text-center text-blue-700 font-bold">{error}</h2>;

    return (
        <main className="max-w-3xl mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Blog List</h1>
                <button
                    onClick={() => signOut()}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                    Sign Out
                </button>
            </div>

            <ul className="space-y-4">
                {blogs?.data?.map((blog: Blog) => (
                    <li key={blog?.objectId} className="border p-4 rounded shadow">
                        <div className="w-full p-3">
                            <Image
                                width={200}
                                height={200}
                                className="object-cover h-60 w-full"
                                src={blog.image ? blog.image : 'https://i.pinimg.com/1200x/2a/86/a5/2a86a560f0559704310d98fc32bd3d32.jpg'}
                                alt={blog?.title}
                            />
                        </div>
                        <Link href={`/blogs/${blog?.objectId}`}>
                            <h2 className="text-xl font-semibold hover:underline">{blog?.title}</h2>
                        </Link>
                        <p className="text-gray-400 py-2">
                            {
                                blog?.content?.length > 100
                                    ? `${blog?.content?.substring(0, 100)} ...`
                                    : blog?.content
                            }
                        </p>
                        <p className="text-sm text-gray-500">By {blog?.author}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
}
