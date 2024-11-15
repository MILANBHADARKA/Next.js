"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

function Loginpage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/login", user);

      console.log("Login success", response.data);

      router.push("/profile");
    } catch (error: any) {
      console.log("Signup Failed");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <h1 className="m-10 font-extrabold text-3xl">Login</h1>

      <hr />

      {/* email */}
      <div className="flex flex-col justify-center items-center gap-3 mb-10">
        <label className="font-semibold text-xl" htmlFor="email">
          Email
        </label>
        <input
        className="rounded-md p-2 text-black"
          id="email"
          value={user.email}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
          placeholder="Email"
          type="email"
        />
      </div>

      {/* password */}
      <div className="flex flex-col justify-center items-center gap-3">
        <label className="font-semibold text-xl" htmlFor="password">
          Password
        </label>
        <input
        className="rounded-md p-2 text-black"
          id="password"
          value={user.password}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
          placeholder="Password"
          type="password"
        />
      </div>

      <div>
      <h1 className="mt-3">{loading ? "Processing" : ""}</h1>
      </div>

      <div>
        <button className="border-solid border-2 border-white rounded-lg p-3 m-10"
        onClick={onLogin}>
          {buttonDisabled ? "No login" : "Login"}
        </button>
      </div>

      <Link href='/signup' className="text-blue-700">
        Visit Signup page
      </Link>
    </div>
  );
}

export default Loginpage;
