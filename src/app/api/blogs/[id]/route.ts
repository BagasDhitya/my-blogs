import { NextRequest, NextResponse } from "next/server";
import { apiBlog } from "@/utils/api/blog.api";

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split("/").pop();
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
