import { NextResponse } from 'next/server';

const BACKEND_BASE_URL = 'https://universallighthouse-backend-production.up.railway.app/api';

export async function GET() {
  try {
    console.log('Fetching from backend...');
    
    const response = await fetch(`${BACKEND_BASE_URL}/teams`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status} ${response.statusText}`);
    }

    const backendData = await response.json();
    console.log('Raw backend data:', JSON.stringify(backendData, null, 2));
    console.log('Data type:', typeof backendData);
    console.log('Is array:', Array.isArray(backendData));
    console.log('Length:', Array.isArray(backendData) ? backendData.length : 'N/A');
    
    if (Array.isArray(backendData) && backendData.length > 0) {
      console.log('First item keys:', Object.keys(backendData[0]));
      console.log('First item:', JSON.stringify(backendData[0], null, 2));
    }

    return NextResponse.json({
      success: true,
      debug: {
        rawData: backendData,
        dataType: typeof backendData,
        isArray: Array.isArray(backendData),
        length: Array.isArray(backendData) ? backendData.length : null,
        firstItemKeys: Array.isArray(backendData) && backendData.length > 0 ? Object.keys(backendData[0]) : null,
        firstItem: Array.isArray(backendData) && backendData.length > 0 ? backendData[0] : null
      }
    });
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Debug failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
