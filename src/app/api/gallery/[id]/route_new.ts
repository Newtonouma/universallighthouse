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

// Helper function to transform backend gallery data to frontend format
function transformGalleryData(backendItem: Record<string, unknown>): GalleryItem {
  return {
    id: (backendItem.id as number) || 0,
    src: (backendItem.src as string) || (backendItem.imageUrl as string) || (backendItem.image as string) || '',
    alt: (backendItem.alt as string) || (backendItem.title as string) || 'Gallery image',
    title: (backendItem.title as string) || 'Untitled',
    description: (backendItem.description as string) || '',
    category: (backendItem.category as string) || 'general',
    isActive: backendItem.isActive !== undefined ? (backendItem.isActive as boolean) : backendItem.active !== undefined ? (backendItem.active as boolean) : true,
    order: (backendItem.order as number) || (backendItem.sort as number) || 0,
    dateAdded: (backendItem.dateAdded as string) || (backendItem.createdAt as string) || new Date().toISOString().split('T')[0]
  };
}

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
    }

    const response = await fetch(`${BACKEND_BASE_URL}/gallery/${id}`, {
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
            error: `Gallery item with ID ${id} not found` 
          },
          { status: 404 }
        );
      }
      throw new Error(`Backend API error: ${response.status} ${response.statusText}`);
    }

    const backendData = await response.json();
    console.log('Backend gallery item response:', backendData);

    // Transform backend data to frontend format
    let galleryItem: GalleryItem | null = null;
    if (backendData) {
      if (backendData.data) {
        galleryItem = transformGalleryData(backendData.data);
      } else {
        galleryItem = transformGalleryData(backendData);
      }
    }

    if (!galleryItem) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Gallery item not found',
          data: null 
        },
        { status: 404 }
      );
    }

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
