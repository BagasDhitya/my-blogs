import { NextRequest, NextResponse } from "next/server";
import { apiBlog } from "@/utils/api/blog.api";

export async function GET() {
    try {
        const response = await apiBlog.get('/blogs')
        return NextResponse.json({
            data: response.data,
            status: response.status
        })
    } catch (error) {
        return NextResponse.json({
            message: 'Failed to fetch blog posts',
            status: 500
        })
    }
}
