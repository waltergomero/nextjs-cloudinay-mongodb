import db from '@/utils/db';
import Category from '@/models/category';


export const GET = async (request, { params }) => {
  try {
    const query = { _id: params.id};
    const projection = { _id: 1, category_name:1, status_name: 1, status_id: 1 };
      await db.connect()

      const category = await Category.findOne(query, projection);
      await db.disconnect();

      if (!category)
      {
        return  new Response(JSON.stringify({error: `Category name "${req.category.category_name}" not found`}), { status: 404 });
      }

      return new Response(JSON.stringify(category), { status: 201 })

  } catch (err) {
    return  new Response(JSON.stringify({error: err}), { status: 500 });
  }
}

export const PATCH = async (request, { params }) => {
 const req = await request.json();

 try{
    await db.connect();

    const categoryExists = await Category.findOne({ category_name: req.category.category_name,});
    
    if (categoryExists) {
        if (categoryExists._id != params.id) {
          return  new Response(JSON.stringify({error: `Category name "${req.category.category_name}" already exists`}), { status: 500 });
        }
      }
    
    const query = {
          category_name: req.category.category_name,
          status_name: req.category.status_name,
          status_id: req.category.status_id,
      };
      
      await Category.updateOne({ _id: params.id}, query);
    
      await db.disconnect();

      return  new Response(JSON.stringify({sucess: "Category was successfully updated."}), { status: 201 });
        
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
  