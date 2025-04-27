import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient();

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
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

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi khi lấy danh sách dự án' },
      { status: 500 }
    );
  }
} 