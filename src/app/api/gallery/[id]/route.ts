import { NextRequest, NextResponse } from 'next/server';

export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
  category?: string;
  isActive: boolean;
  order: number;
  dateAdded: string;
}

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
          error: 'Gallery item ID is required' 
        },
        { status: 400 }
      );
    }    // Since backend uses UUIDs but frontend uses numeric IDs,
    // we need to fetch all items and return the one at the specified index
    const response = await fetch(`${BACKEND_BASE_URL}/gallery`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status} ${response.statusText}`);
    }

    const backendData = await response.json();
    console.log('Backend gallery response:', backendData);

    if (!Array.isArray(backendData) || backendData.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'No gallery items found' 
        },
        { status: 404 }
      );
    }

    // Convert string ID to number (since we use index-based IDs)
    const itemIndex = parseInt(id) - 1; // Convert to 0-based index
    
    if (itemIndex < 0 || itemIndex >= backendData.length) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Gallery item with ID ${id} not found` 
        },
        { status: 404 }
      );
    }

    const backendItem = backendData[itemIndex];
    const galleryItem = transformGalleryData(backendItem, itemIndex + 1);

    return NextResponse.json({
      success: true,
      data: galleryItem
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching gallery item:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: `Failed to fetch gallery item: ${errorMessage}`,
        details: errorMessage
      },
      { status: 500 }
    );
  }
}

// Helper function to transform backend gallery data to frontend format
function transformGalleryData(backendItem: Record<string, unknown>, index: number): GalleryItem {
  return {
    id: index,
    src: (backendItem.imageUrl as string) || '',
    alt: (backendItem.caption as string) || 'Gallery image',
    title: (backendItem.caption as string) || 'Untitled',
    description: (backendItem.caption as string) || '',
    category: 'general', // Default category since backend doesn't provide this
    isActive: true, // Assume all items are active
    order: index,
    dateAdded: backendItem.createdAt ? new Date(backendItem.createdAt as string).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  };
}
