import db from '@/utils/db';
import Status from '@/models/status';

export const GET = async (request, { params }) => {
    try {
        await db.connect()

        const data = await Status.find({}).sort({status_name: 1});
        await db.disconnect();

        return new Response(JSON.stringify(data), { status: 200 })
    } catch (err) {
        return  new Response(JSON.stringify({error: err}), { status: 500 });
    }
} 
