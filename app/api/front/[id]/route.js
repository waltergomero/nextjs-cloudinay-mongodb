import db from '@/utils/db';
import Gallery from '@/models/gallery';


export const GET = async (request, { params }) => {
  try {
    console.log("params: ", params.id)
    const query = { category_id: params.id};
    
      await db.connect()

      const data = await Gallery.find(query);

      await db.disconnect();

      if (!data) 
        return  new Response(JSON.stringify({error: "Status not found"}), { status: 404 });
        
      return new Response(JSON.stringify(data), { status: 201 })

  } catch (err) {
    return  new Response(JSON.stringify({error: err}), { status: 500 });
  }
}
