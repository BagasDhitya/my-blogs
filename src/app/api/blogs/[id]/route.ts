import { NextResponse } from "next/server";
import { apiBlog } from "@/utils/api/blog.api";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = await params
        const response = await apiBlog.get(`/blogs/${id}`)
        return NextResponse.json({
            data: response.data,
            status: response.status
        })
    } catch (error) {
        return NextResponse.json({
            message: 'Failed to fetch blog posts, id not found',
            status: 500
        })
    }
}
