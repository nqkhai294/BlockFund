import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function POST(request: Request) {
  try {
    const { projectId, content, userId } = await request.json()
    
    const { db } = await connectToDatabase()
    
    const comment = {
      projectId: new ObjectId(projectId),
      userId: new ObjectId(userId),
      content,
      createdAt: new Date(),
    }
    
    const result = await db.collection('comments').insertOne(comment)
    
    return NextResponse.json({ success: true, comment: { ...comment, _id: result.insertedId } })
  } catch (error) {
    console.error('Error creating comment:', error)
    return NextResponse.json({ success: false, error: 'Failed to create comment' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')
    
    if (!projectId) {
      return NextResponse.json({ success: false, error: 'Project ID is required' }, { status: 400 })
    }
    
    const { db } = await connectToDatabase()
    
    const comments = await db.collection('comments')
      .find({ projectId: new ObjectId(projectId) })
      .sort({ createdAt: -1 })
      .toArray()
    
    return NextResponse.json({ success: true, comments })
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch comments' }, { status: 500 })
  }
} 