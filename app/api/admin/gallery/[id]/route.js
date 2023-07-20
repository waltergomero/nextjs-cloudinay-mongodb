import db from '@/utils/db';
import Gallery from '@/models/gallery';


export const GET = async (request, { params }) => {
  try {
    const query = { _id: params.id};

      await db.connect()

      const data = await Gallery.findOne(query);
      await db.disconnect();

      return new Response(JSON.stringify(data), { status: 201 })

  } catch (err) {
    return  new Response(JSON.stringify({error: err}), { status: 500 });
  }
}

export const PATCH = async (request, { params }) => {
 const req = await request.json();
console.log("pass image info: ", req)
console.log("params:", params)
 try{
    await db.connect();

    const query = {
          category_name: req.imageInformation.category_name,
          category_id: req.imageInformation.category_id,
          title: req.imageInformation.title,
          description: req.imageInformation.description,
          user_id: req.imageInformation.user_id,
          email: req.imageInformation.email,
      };
      
      await Gallery.updateOne({ _id: params.id}, query);
    
      await db.disconnect();

      return  new Response(JSON.stringify({sucess: "Gallery was successfully updated."}), { status: 201 });
        
 }
 catch(err){
  return  new Response(JSON.stringify({error: err}), { status: 500 });  
 }
}

async function checkIfCategoryExists(_category_name) {
  const query = { category_name: _category_name };
  const projection = { category_name: 1 };
  return await Category.findOne(query, projection).then((result) => {
    const data = JSON.parse(JSON.stringify(result));
    return Promise.resolve(data);
  });
}

  

  export const DELETE = async (request, { params }) => {
    try {
        await db.connect();
        // Find the prompt by ID and remove it
        await Category.findByIdAndRemove(params.id);

        await db.disconnect();

        return  new Response(JSON.stringify({success: "Category deleted successfully"}), { status: 201 });  
    } catch (err) {
      return  new Response(JSON.stringify({error: err}), { status: 500 }); 
    }
  };
  