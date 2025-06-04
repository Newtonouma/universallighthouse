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
          error: 'Partner ID is required' 
        },
        { status: 400 }
      );
    }

    const response = await fetch(`${BACKEND_API_URL}/partners/${id}`, {
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
            error: 'Partner not found' 
          },
          { status: 404 }
        );
      }
      
      return NextResponse.json(
        { 
          success: false, 
          error: `Failed to fetch partner: ${response.status} ${response.statusText}` 
        },
        { status: response.status }
      );
    }

    const data: Record<string, unknown> = await response.json();
    
    return NextResponse.json({
      success: true,
      data
    });

  } catch (error) {
    console.error('Error fetching partner:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Partner ID is required' 
        },
        { status: 400 }
      );
    }

    const response = await fetch(`${BACKEND_API_URL}/partners/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Failed to update partner: ${response.status} ${response.statusText}` 
        },
        { status: response.status }
      );
    }

    const data: Record<string, unknown> = await response.json();
    
    return NextResponse.json({
      success: true,
      data
    });

  } catch (error) {
    console.error('Error updating partner:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Partner ID is required' 
        },
        { status: 400 }
      );
    }

    const response = await fetch(`${BACKEND_API_URL}/partners/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Failed to delete partner: ${response.status} ${response.statusText}` 
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Partner deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting partner:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}