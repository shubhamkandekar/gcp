import { NextRequest, NextResponse } from "next/server";

export async function GET(req) {
    try {
        const API_URL = 'https://servers.sanboxes.soulharsh007.dev/api/projects';
        const API_TOKEN = '3105ea72-b9c9-4395-bd4b-92650502a040';
    
        const response = await fetch(API_URL, {
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
          },
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch data from external API');
        }
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching projects:', error);
        return NextResponse.status(500).json({ error: 'Internal Server Error' });
    }
}
