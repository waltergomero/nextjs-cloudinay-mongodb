import db from '@/utils/db';
import Gallery from '@/models/gallery';

export const GET = async (request, { params }) => {
    const query = {};
    const projection = {
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    };
  
    db.connect();
    const data = await Collection.find(query, projection);
    db.disconnect();

    return new Response(JSON.stringify(data), { status: 200 })
} 
