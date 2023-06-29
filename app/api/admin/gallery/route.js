import db from '@/utils/db';
import Gallery from '@/models/gallery';

export const GET = async (request, { params }) => {
    const req = request.json();
    try {
        await db.connect()

        let category_id = "0";
        let query = "{}";

        if (params.id != category_id) {
            query = { user_id: req.user.userid, category_id: params.id };
          } else {
            query = { user_id: req.user.userid };
          }
        

        const data = await Gallery.find(query);
        await db.disconnect();

        return new Response(JSON.stringify(data), { status: 200 })
    } catch (err) {
        return  new Response(JSON.stringify({error: err}), { status: 500 });
    }
} 
