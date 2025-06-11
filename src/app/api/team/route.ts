import { NextRequest, NextResponse } from 'next/server';

export interface TeamMember {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  contact?: string;
  email?: string;
  facebook?: string;
  tiktok?: string;
  twitter?: string;
  linkedin?: string;
}

export async function GET(request: NextRequest) {
  try {
    // Ensure API_URL is defined
    const API_URL = process.env.API_URL || 'https://universallighthouse-backend-production.up.railway.app/api';
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    // Build the query string for the external API
    const endpoint = category && category !== 'All' ? `/teams?category=${category}` : '/teams';
        
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
        
    const response = await fetch(`${API_URL}${endpoint}`, {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    });
        
    clearTimeout(timeoutId);
        
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
        
    const backendData = await response.json();
    console.log('Backend response:', backendData);    // Transform the backend data to match our frontend interface
    const transformedData = Array.isArray(backendData) ? backendData.map((member: Record<string, unknown>) => {
      // Filter out null values and unwanted fields
      const filtered: Record<string, unknown> = {
        id: member.id,
        name: member.name || 'Unknown',
        description: typeof member.description === 'string' ? member.description.trim() : '',
        imageUrl: member.imageUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop'
      };

      // Add non-null contact information
      if (member.contact && member.contact !== null) {
        filtered.contact = member.contact;
      }
      if (member.email && member.email !== null) {
        filtered.email = member.email;
      }

      // Add non-null social media links
      if (member.facebook && member.facebook !== null) {
        filtered.facebook = member.facebook;
      }
      if (member.tiktok && member.tiktok !== null) {
        filtered.tiktok = member.tiktok;
      }
      if (member.twitter && member.twitter !== null) {
        filtered.twitter = member.twitter;
      }
      if (member.linkedin && member.linkedin !== null) {
        filtered.linkedin = member.linkedin;
      }      return filtered;
    }).filter((member: Record<string, unknown>) => {
      // Enhanced filtering to prevent duplicates and invalid entries
      return member.name && 
             member.name !== 'Unknown' && 
             typeof member.name === 'string' && 
             member.name.trim().length > 0 &&
             member.description &&
             typeof member.description === 'string' &&
             member.description.trim().length > 0;
    }) : [];

    // Remove duplicate team members based on name and description combination
    const uniqueMembers = transformedData.filter((member, index, self) => 
      index === self.findIndex((m) => 
        m.name === member.name && m.description === member.description
      )
    );    return NextResponse.json({
      success: true,
      data: uniqueMembers,
      total: uniqueMembers.length
    });
  } catch (error) {
    console.error('Error fetching team members from backend:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch team members',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}