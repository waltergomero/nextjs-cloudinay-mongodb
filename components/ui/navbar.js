import Link from "next/link";
import Login from "./login";


const NavBar = () => {
  return (
    <div className="bg-gradient-to-b from-cyan-50 to-cyan-200 p-2 flex gap-5">
        <Link href="/">Home</Link>
        <Login/>
    </div>
  )
}
export default NavBar