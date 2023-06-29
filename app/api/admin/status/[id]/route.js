import db from '@/utils/db';
import Status from '@/models/status';


export const GET = async (request, { params }) => {
  try {
    const query = { _id: params.id};
    const projection = { _id: 1, status_name: 1, status_typeid: 1 };
      await db.connect()

      const status = await Status.findOne(query, projection);

      await db.disconnect();

      if (!status) 
        return  new Response(JSON.stringify({error: "Status not found"}), { status: 404 });
        
      return new Response(JSON.stringify(status), { status: 201 })

  } catch (err) {
    return  new Response(JSON.stringify({error: err}), { status: 500 });
  }
}

export const PATCH = async (request, { params }) => {
 const req = await request.json();

 try{
    await db.connect();

    const statusExists = await Status.findOne({  status_name: req.status.status_name, status_typeid: req.status.status_typeid,});

    if (statusExists) {
        if (statusExists._id != params.id) {
          await db.disconnect();
          return  new Response(JSON.stringify({error: `Status name "${req.status.status_name}" already exists`}), { status: 500 });
        }
      }
        const query = {
        status_name: req.status.status_name,
        status_typeid: req.status.status_typeid,
      };
      
      await Status.updateOne({ _id: params.id}, query);
    
      await db.disconnect();

      return new Response(JSON.stringify({success: "Successfully updated the status"}), { status: 201 });
 }
 catch(err){
  return  new Response(JSON.stringify({error: err}), { status: 500 });
 }
}

  export const DELETE = async (request, { params }) => {
    try {
        await db.connect();
        // Find the prompt by ID and remove it
        await Status.findByIdAndRemove(params.id);

        await db.disconnect();

        return new Response(JSON.stringify({success: "Status was deleted Successfully "}), { status: 201 });
    } catch (err) {
        return new Response(JSON.stringify({error: err}), { status: 500 });
    }
  };
  