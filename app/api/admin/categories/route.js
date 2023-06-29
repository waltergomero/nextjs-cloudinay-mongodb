import db from '@/utils/db';
import Category from '@/models/category';

export const GET = async (request, { params }) => {
    try {
        await db.connect()

        const data = await Category.find({}).sort({category_name: 1});
        await db.disconnect();

        return new Response(JSON.stringify(data), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch category created by user", { status: 500 })
    }
} 
