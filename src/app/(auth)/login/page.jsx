"use client"
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { PulseLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import Link from "next/link"
export default function Login() {
  const router = useRouter();
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!authData.email || !authData.password) {
        toast.error("All Fields are the required to login");
        return;
      }

      const res = await axios.post("/api/login", {
        email: authData.email,
        password: authData.password,
      });

      if (res.status === 200) {
        // Successful login
       
        router.push('/dashboard')
        toast.success("User Logged in Successfully");
      }
    } catch (error) {
      console.error(error);
      toast.info("Incorrect Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="flex w-full h-full items-center justify-center bg-opacity-50"
      
    >
      <section className="flex items-center justify-center">
        <div className="right rounded-lg bg-slate-100 bg-opacity-75  shadow-sm shadow-white border-white p-8">
          <div className="flex flex-col items-center justify-center my-5">
            <h1 className="text-4xl font-extrabold mb-4 text-sky-900">
              Welcome Back
            </h1>
            
          </div>
          <div className="flex flex-col items-center my-5">
            <h2 className="text-3xl font-extrabold text-gradient-bg text-gradient-bg1">
              Login
            </h2>
            <h3 className="text-lg font-semibold text-center text-gradient-bg1">
              Please login to continue
            </h3>
            <form action="#" method="POST" className="mt-3">
              <div className="Email mb-2 w-full">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-600"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border rounded outline-blue-500 focus:border-blue-500 text-sky-900"
                  placeholder="Enter your Email"
                  onChange={(e) =>
                    setAuthData({ ...authData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="password  w-full mb-2">
                <label
                  htmlFor="password "
                  className="text-sm font-semibold text-gray-600"
                >
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-2 border rounded outline-blue-500 focus:border-blue-500 text-sky-900"
                  placeholder="Enter your password"
                  onChange={(e) =>
                    setAuthData({ ...authData, password: e.target.value })
                  }
                  required
                />
              </div>
              <Link href='/register' className="text-sm text-blue-400 text-right w-full">dont have account? Signup </Link> 
              <button
                className="bg-blue-500 w-full mt-5 text-white p-2 rounded hover:bg-blue-700"
                onClick={handleSubmit}
              >
                {loading ? <PulseLoader color="#fff" size={8} /> : "Login"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
