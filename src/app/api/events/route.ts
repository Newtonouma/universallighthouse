import { NextResponse } from 'next/server';

const BACKEND_API_URL = 'https://universallighthouse-backend-production.up.railway.app/api';

export async function GET() {
  try {
    console.log('Attempting to fetch events from:', `${BACKEND_API_URL}/events`);
    
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    const response = await fetch(`${BACKEND_API_URL}/events`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Universal Lighthouse Frontend/1.0',
      },
      signal: controller.signal,
      cache: 'no-store',
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Failed to fetch events: ${response.status} ${response.statusText}` 
        },
        { status: response.status }
      );
    }

    const data: Record<string, unknown>[] = await response.json();
    
    return NextResponse.json({
      success: true,
      data: data,
      total: data.length
    });

  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch events from backend' 
      },
      { status: 500 }
    );
  }
}
