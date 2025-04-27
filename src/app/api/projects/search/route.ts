import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Xử lý GET request để tìm kiếm dự án
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title');
    const category = searchParams.get('category');

    // Xây dựng query condition
    let whereCondition: any = {};

    // Thêm điều kiện tìm kiếm theo tiêu đề nếu có
    if (title && title.trim() !== '') {
      whereCondition.title = {
        contains: title,
        mode: 'insensitive', // Tìm kiếm không phân biệt chữ hoa/thường
      };
    }

    // Thêm điều kiện tìm kiếm theo danh mục nếu có và không phải "All"
    if (category && category !== 'All') {
      whereCondition.category = category;
    }

    // Lấy danh sách dự án từ database với các điều kiện tìm kiếm
    const projects = await prisma.project.findMany({
      where: whereCondition,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    // Trả về danh sách dự án tìm được
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi khi tìm kiếm dự án' },
      { status: 500 }
    );
  }
} 