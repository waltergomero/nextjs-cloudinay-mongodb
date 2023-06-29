import db from '@/utils/db';
import User from '@/models/user';
const bcrypt = require('bcryptjs');

export const POST = async (request) => {
  const req = await request.json();
  db.connect()
  try{
  // validate
  const user = await User.findOne({ email: req.user.email, });

    if (user) {
      return  new Response(JSON.stringify({error: `User with this email "${req.user.email}" already exists`}), { status: 500 });
    }
    else {
      // hash password
      const hashed_password = bcrypt.hashSync(req.user.password, 10);   
      const newUser = new User({
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        password: hashed_password,
        role: req.user.role,
      });

      const user = await newUser.save();
  
      await db.disconnect();
      return  new Response(JSON.stringify({sucess: "User was successfully added."}), { status: 201 });
        
      }
  }
  catch(error)
  {
    //throw error;
     return  new Response(JSON.stringify({error: error}), { status: 500 }); 
  }

  };
   
