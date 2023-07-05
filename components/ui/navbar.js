import Link from "next/link";
import Login from "./login";


const NavBar = () => {
  return (
    <div className="bg-black p-2 flex gap-5">
        <Link className="text-gray-100" href="/">Home</Link>
        <Login/>
    </div>
  )
}
export default NavBar