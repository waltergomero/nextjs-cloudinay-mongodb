import db from '@/utils/db';
import Gallery from '@/models/gallery';


export const POST = async (request, response) => {
    const req = await request.json();

    try {
      await db.connect();

       let _islandscape = true;

       if(req.height > req.width){
          _islandscape = false;
       }

        const newImage = new Gallery({
          image_name: req.image_name,
          url: req.url,
          description: req.imageInformation.description,
          islandscape: _islandscape,
          title: req.imageInformation.title,
          height: req.height,
          width: req.width,
          category_id: req.imageInformation.category_id,
          category_name: req.imageInformation.category_name,
          user_id: req.imageInformation.user_id,
          email: req.imageInformation.email,        
            });

          await newImage.save();       

          await db.disconnect();
          return  new Response(JSON.stringify({sucess: "Image was successfully added."}), { status: 201 });
      
        }
        catch(err){
          return  new Response(JSON.stringify({error: err}), { status: 500 });  
        }
  };
   

  