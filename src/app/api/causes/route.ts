import { NextResponse } from 'next/server';
import { CauseItem } from '../../../data/causesData';

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

// GET /api/causes - Get all causes
export async function GET() {
  try {
    const response = await fetch('https://universallighthouse-backend-production.up.railway.app/api/causes');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const backendData = await response.json();
    console.log('Backend response:', backendData);

    // Transform backend data to frontend format
    let causes: CauseItem[] = [];
    if (Array.isArray(backendData)) {
      causes = backendData.map(transformCauseData);
    } else if (backendData && typeof backendData === 'object') {
      causes = [transformCauseData(backendData as Record<string, unknown>)];
    }

    return NextResponse.json({
      success: true,
      data: causes,
      total: causes.length
    });

  } catch (error) {
    console.error('Error fetching causes from backend:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch causes',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
