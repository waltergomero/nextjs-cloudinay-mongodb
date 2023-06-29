import db from '@/utils/db';
import Status from '@/models/status';

export const GET = async (request, { params }) => {
    try {
        await db.connect()

        const projection = { status_typeid: 0, createdAt: 0, updatedAt: 0 };
        const data = await Status.find({}, projection).sort({status_name: 1});
        await db.disconnect();

        return new Response(JSON.stringify(data), { status: 201 })
    } catch (error) {
        return  new Response(JSON.stringify({error: err}), { status: 500 });
    }
} 
