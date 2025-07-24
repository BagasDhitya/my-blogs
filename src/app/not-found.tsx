'use client'
import Link from "next/link"

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
            <p className="text-2xl font-semibold mb-2">Page Not Found</p>
            <p className="text-gray-600 mb-6">{`The page you're looking for doesn't exist or has been moved.`}</p>
            <Link
                href={'/blogs'}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Return to Blogs
            </Link>
        </main>
    )
}