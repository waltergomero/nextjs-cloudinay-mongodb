/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        public_url: "http://localhost:3000",
        public_url_api: "http://localhost:3000/api",
        secret: 'QyNsdWlzYTE5NjE=', //https://www.base64encode.org/
      },
      images: {
       // formats: ['image/avif', 'image/webp'],
        domains: ['res.cloudinary.com'],
      },
}

module.exports = nextConfig

