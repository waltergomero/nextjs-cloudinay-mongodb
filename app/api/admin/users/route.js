import db from '@/utils/db';
import User from '@/models/user';

export const GET = async (request, { params }) => {
    try {
        await db.connect()

        const data = await User.find({}).sort({last_name: 1});
        await db.disconnect();

        return new Response(JSON.stringify(data), { status: 200 })
    } catch (error) {
        return  new Response(JSON.stringify({error: "Fail to fetch users"}), { status: 500 });
    }
} 
