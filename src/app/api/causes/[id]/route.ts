import { NextRequest, NextResponse } from 'next/server';
import { CauseItem } from '../../../../data/causesData';

const BACKEND_BASE_URL = 'https://universallighthouse-backend-production.up.railway.app/api';

// Helper function to transform backend cause data to frontend format
function transformCauseData(backendCause: Record<string, unknown>): CauseItem {
  return {
    id: (backendCause.id?.toString() || backendCause._id?.toString() || ''),
    title: (backendCause.title as string) || (backendCause.name as string) || '',
    raised: (backendCause.raised as number) || (backendCause.amountRaised as number) || 0,
    goal: (backendCause.goal as number) || (backendCause.targetAmount as number) || 0,
    category: (backendCause.category as string) || (backendCause.type as string) || '',
    description: (backendCause.description as string) || '',
    image: (backendCause.image as string) || (backendCause.imageUrl as string) || (backendCause.photo as string) || '/images/hero1.jpg',
  };
}

// GET /api/causes/[id] - Get a specific cause by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    console.log('Fetching cause from backend:', `${BACKEND_BASE_URL}/causes/${id}`);
    
    const response = await fetch(`${BACKEND_BASE_URL}/causes/${id}`, {
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
            error: 'Cause not found',
            data: null 
          },
          { status: 404 }
        );
      }
      console.error('Backend API error:', response.status, response.statusText);
      throw new Error(`Backend API error: ${response.status}`);
    }

    const backendData = await response.json();
    console.log('Backend response:', backendData);

    // Transform backend data to frontend format
    let cause: CauseItem | null = null;
    if (backendData) {
      if (backendData.data) {
        cause = transformCauseData(backendData.data);
      } else {
        cause = transformCauseData(backendData);
      }
    }    if (!cause) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Cause not found',
          data: null 
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: cause,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching cause:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: `Failed to fetch cause: ${errorMessage}`,
        data: null 
      },
      { status: 500 }
    );
  }
}


