"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";


const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="w-[230px] h-screen bg-indigo-50   ">
      <h1 className="text-2xl font-extrabold mb-4 text-center mt-5  text-gradient-bg2 border-b-[3px] border-slate-300 pb-2">
        <span className="text-blue-500">G</span> 
        <span className="text-red-500">o</span> 
        <span className="text-orange-500">o</span> 
        <span className="text-blue-500">g</span> 
        <span className="text-green-500">l</span> 
        <span className="text-red-500">e</span> Cloud
      </h1>
      <ul>
        <li
          className={
            pathname === "/dashboard"
              ? "bg-white rounded-l-lg text-slate-900 ml-2 font-semibold"
              : ""
          }
        >
          <Link
            href="/dashboard"
            className={`pl-2 flex items-center font-medium ${
              pathname === "/dashboard" ? "text-blue-900" : "text-white"
            } hover:bg-gray-100 px-2 hover:text-slate-900`}
          >
            {/* <span>{dash}</span> */}
            <span className="p-3 ">Projects</span>
          </Link>
        </li>
    </ul>
    </aside>
  );
};

export default Sidebar;

