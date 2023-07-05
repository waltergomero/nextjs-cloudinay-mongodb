import db from '@/utils/db';
import Gallery from '@/models/gallery';

export const GET = async (request, { params }) => {
    try {
        await db.connect()
        const data = await  Gallery.aggregate([ { $sample: { size: 10 } } ]); 
        await db.disconnect();

        return new Response(JSON.stringify(data), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch category created by user", { status: 500 })
    }
} 
