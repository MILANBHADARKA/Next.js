"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/signup", user);

      console.log("Signup success", response.data);

      router.push("/login");
    } catch (error: any) {
      console.log("Signup Failed");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <h1 className="m-10 font-extrabold text-3xl">Signup</h1>

      <hr />

      {/* username */}
      <div className="flex flex-col justify-center items-center gap-3 mb-10">
        <label className="font-semibold text-xl" htmlFor="username">
          Username
        </label>
        <input
        className="rounded-md p-2 text-black"
          id="username"
          value={user.username}
          onChange={(e) => {
            setUser({ ...user, username: e.target.value });
          }}
          placeholder="Username"
          type="text"
        />
      </div>

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
        onClick={onSignup}>
          {buttonDisabled ? "No signup" : "Signup"}
        </button>
      </div>

      <Link href='/login' className="text-blue-700">
        Visit login page
      </Link>
    </div>
  );
}

export default SignupPage;
