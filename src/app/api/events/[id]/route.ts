import { NextResponse } from 'next/server';

const BACKEND_API_URL = 'https://universallighthouse-backend-production.up.railway.app/api';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Event ID is required' 
        },
        { status: 400 }
      );
    }

    const response = await fetch(`${BACKEND_API_URL}/events/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Event not found' 
          },
          { status: 404 }
        );
      }
      
      return NextResponse.json(
        { 
          success: false, 
          error: `Failed to fetch event: ${response.status} ${response.statusText}` 
        },
        { status: response.status }
      );
    }

    const data: Record<string, unknown> = await response.json();
    
    return NextResponse.json({
      success: true,
      data: data
    });

  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch event from backend' 
      },
      { status: 500 }
    );
  }
}
