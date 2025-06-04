import { NextRequest, NextResponse } from 'next/server';
const BACKEND_BASE_URL = 'https://universallighthouse-backend-production.up.railway.app/api';

// GET /api/gallery - Get all gallery items
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const isActive = searchParams.get('active');

    // Build the query string for the external API
    const queryParams = new URLSearchParams();
    if (category && category !== 'all') {
      queryParams.append('category', category);
    }
    if (isActive !== null) {
      queryParams.append('active', isActive);    }

    const url = `${BACKEND_BASE_URL}/gallery${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    console.log('Attempting to fetch gallery from:', url);
    
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Universal Lighthouse Frontend/1.0',
      },
      signal: controller.signal,    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status} ${response.statusText}`);
    }
    
    const backendData = await response.json();
    console.log('Backend gallery response:', backendData);
    
    // Transform the backend data to match our frontend interface
    const transformedData = Array.isArray(backendData) ? backendData.map((item: Record<string, unknown>, index: number) => ({
      id: index + 1, // Use index as ID since backend uses UUID
      src: (item.imageUrl as string) || '',
      alt: (item.caption as string) || 'Gallery image',
      title: (item.caption as string) || 'Untitled',
      description: (item.caption as string) || '',
      category: 'general', // Default category since backend doesn't provide this
      isActive: true, // Assume all items are active
      order: index + 1,
      dateAdded: item.createdAt ? new Date(item.createdAt as string).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    })) : [];

    return NextResponse.json({
      success: true,
      data: transformedData,
      total: transformedData.length
    });
  } catch (error) {
    console.error('Error fetching gallery items from backend:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch gallery items',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
