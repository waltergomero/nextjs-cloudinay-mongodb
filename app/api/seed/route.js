import Category from "@/models/category";
import Gallery from "@/models/gallery";
import Status from "@/models/status";
import User from "@/models/user";
import Collection from "@/models/collection";
import data from "@/utils/data";
import db from "@/utils/db";


export const POST = async (request, response) => {
  await db.connect();
  // await User.deleteMany();
  // await User.insertMany(data.users);
   //await Category.deleteMany();
   //await Category.insertMany(data.category);
  // await Status.deleteMany();
  // await Status.insertMany(data.status);
   await Gallery.deleteMany();
   await Gallery.insertMany(data.gallery);
  // await Collection.deleteMany();
  // await Collection.insertMany(data.collection);

  await db.disconnect();
  return  new Response(JSON.stringify({sucess: "Seeded successfully."}), { status: 201 });
      
};

