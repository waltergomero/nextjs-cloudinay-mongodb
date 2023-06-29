import Link from "next/link";
import Image from "next/image";
import { CldImage } from 'next-cloudinary';

const DashboardPage = (props) => {
  //const users = props.data;
  //const role = localStorage.getItem("role");
  return (
    <>
      <div className="flex h-full flex-col rounded p-4 m-2 border border-gray-200">
        <div>
          <Link
            href="/pages/admin/gallery/upload"
            className="px-4 py-1.5 bg-blue-600 text-white font-medium text-xs uppercase rounded"
          >
            Upload Images
          </Link>
        </div>
        <Image
            width="340"
            height="300"
            src="https://res.cloudinary.com/wgomero-dev/image/upload/v1666919434/cld-sample-2.jpg"
            sizes="100vw"
            priority={false}
            alt="Description of my image"
        />
      </div>
    </>
  );
}

export default DashboardPage;