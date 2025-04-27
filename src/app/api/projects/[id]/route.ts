import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Khởi tạo Prisma Client
const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const project = await prisma.project.findUnique({
      where: {
        id: id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
            bio: true,
            projects: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                name: true,
                avatar: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        backersList: {
          include: {
            user: {
              select: {
                name: true,
                avatar: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy dự án' },
        { status: 404 }
      );
    }

    // Format the data to match the expected structure in ProjectDetail component
    const formattedProject = {
      id: project.id,
      title: project.title,
      content: project.content,
      image: project.image,
      progress: project.progress,
      target: project.target,
      raised: project.raised,
      backers: project.backers,
      daysLeft: project.daysLeft,
      startDate: project.startDate,
      endDate: project.endDate,
      category: project.category,
      author: project.author,
      backersData: project.backersList.map((backer: any) => ({
        id: backer.id,
        name: backer.user.name,
        avatar: backer.user.avatar,
        amount: backer.amount,
        date: backer.date,
      })),
      comments: project.comments.map((comment: any) => ({
        id: comment.id,
        user: {
          name: comment.user.name,
          avatar: comment.user.avatar,
        },
        content: comment.content,
        date: comment.date,
      })),
    };

    return NextResponse.json({ success: true, project: formattedProject });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi khi lấy dữ liệu dự án' },
      { status: 500 }
    );
  }
} 