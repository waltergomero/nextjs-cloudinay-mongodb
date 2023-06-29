import db from '@/utils/db';
import User from '@/models/user';
const bcrypt = require("bcryptjs");


export const GET = async (request, { params }) => {
  try {
    const query = { _id: params.id};
    const projection = { _id: 1, first_name: 1, last_name: 1, email:1,  role:1 };
      await db.connect()

      const user = await User.findOne(query, projection);

      await db.disconnect();

      if (!user) 
        return new Response("User Not Found", { status: 404 });

      return new Response(JSON.stringify(user), { status: 200 })

  } catch (error) {
      return new Response("Internal Server Error", { status: 500 });
  }
}

export const PATCH = async (request, { params }) => {
  const req = await request.json();

  try{
     await db.connect();
 
     const user = await User.findOne({ email: req.user.email,});
 
     if (user) {
         if (user._id != params.id) {
           return  new Response(JSON.stringify({error: `User with this email "${req.user.email}" already exists`}), { status: 500 });
         }
       }
     
     let query = "";

     if(req.user.password){
       const hashedpassword = bcrypt.hashSync(req.user.password, 10);   

        query = {
           first_name: req.user.first_name,
           last_name: req.user.last_name,
           email: req.user.email,
           password: hashedpassword,
           role: req.user.role,
       };
      }
      else{
        
        query = {
          first_name: req.user.first_name,
          last_name: req.user.last_name,
          email: req.user.email,
          role: req.user.role,
      };
      }
       await User.updateOne({ _id: params.id}, query);
     
       await db.disconnect();
 
       return  new Response(JSON.stringify({message: "User information was successfully updated."}), { status: 201 });
         
  }
  catch(err){
   return  new Response(JSON.stringify({error: err}), { status: 500 });  
  }
 }



 export const DELETE = async (request, { params }) => {
  
  try{
  db.connect();
  const query = { _id: params.id };
  const delete_user = await User.deleteOne(query);

  db.disconnect();
  return  new Response(JSON.stringify({message: "User record was deleted."}), { status: 201 });
  }
  catch(error){
    throw error;
  }
}
