import { FaGithub } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between w-full mb-2 border-b-2 border-pink-300 p-2 px-6 bg-gray-800">
      <section className="flex justify-center items-center flex-row gap-2">
        <h1 className="text-3xl italic font-extrabold text-pink-400">Fastvey</h1>
        <div className="flex justify-center items-center gap-4 ml-5">
          <Link to="/" className="flex justify-center items-center gap-1 text-xl">
            <MdDashboard size={22} /> Dashboard
          </Link>
          <Link to="/" className="flex justify-center items-center gap-1 text-xl">
            <FaGithub size={22} /> GitHub
          </Link>
        </div>
      </section>
      <Link to="/" className="flex justify-center items-center gap-1 text-xl">
        <FiLogOut size={22} /> Logout
      </Link>
    </nav>
  )
}

export default Navbar