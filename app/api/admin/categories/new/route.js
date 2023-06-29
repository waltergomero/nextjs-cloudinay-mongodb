import db from '@/utils/db';
import Category from '@/models/category';


export const POST = async (request, response) => {
    const req = await request.json();
    try {
      await db.connect();
  
      const categoryExists = await Category.findOne({ category_name: req.category.category_name,});

      if (categoryExists) {
          await db.disconnect();
         return  new Response(JSON.stringify({error: `Category name "${req.category.category_name}" already exists`}), { status: 500 });
         } 
     else {
            const newCategory = new Category({
              category_name: req.category.category_name,
              parent_category_id: null,
              status_id: req.category.status_id,
              status_name: req.category.status_name,
            });
          await newCategory.save();       
          await db.disconnect();
          return  new Response(JSON.stringify({sucess: "Category was successfully added."}), { status: 201 });
      
          }
        }
        catch(err){
          return  new Response(JSON.stringify({error: err}), { status: 500 });  
        }
  };
   

  