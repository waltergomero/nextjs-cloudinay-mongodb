import db from '@/utils/db';
import Status from '@/models/status';

export const POST = async (request, response) => {
    const req = await request.json();
    try {
        await db.connect();
        const statusExists = await Status.findOne({  status_name: req.status.status_name, status_typeid: req.status.status_typeid,});
  
        if (statusExists) {
          await db.disconnect();
         return  new Response(JSON.stringify({error: `Status name "${req.status.status_name}" already exists`}), { status: 500 });
         } 
        else {
            const newStatus = new Status({
              status_name: req.status.status_name,
              status_typeid: req.status.status_typeid,
            });
        
          await newStatus.save();       
          await db.disconnect();
          return new Response(JSON.stringify(newStatus), { status: 201 })
          }
        }
        catch(error){
            throw error;
        }
  };
   
  