import { NextRequest, NextResponse } from 'next/server';

const BACKEND_BASE_URL = 'https://universallighthouse-backend-production.up.railway.app/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Team member ID is required' 
        },
        { status: 400 }
      );
    }

    const response = await fetch(`${BACKEND_BASE_URL}/teams/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { 
            success: false, 
            error: `Team member with ID ${id} not found` 
          },
          { status: 404 }
        );
      }
      throw new Error(`Backend API error: ${response.status} ${response.statusText}`);
    }    const backendMember = await response.json();
    console.log('Backend member response:', backendMember);

    // Transform the backend data to match our frontend interface
    const transformedMember = {
      id: backendMember.id || 0,
      name: backendMember.name || 'Unknown',
      position: backendMember.position || backendMember.role || 'Team Member',
      department: backendMember.department || 'General',
      bio: backendMember.bio || backendMember.description || '',
      imageUrl: backendMember.imageUrl || backendMember.image || backendMember.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop',
      socialLinks: {
        twitter: backendMember.twitter || backendMember.socialLinks?.twitter || '',
        linkedin: backendMember.linkedin || backendMember.socialLinks?.linkedin || ''
      }
    };

    return NextResponse.json({
      success: true,
      data: transformedMember
    });
  } catch (error) {
    console.error('Error fetching team member:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch team member',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}


