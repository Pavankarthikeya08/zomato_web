import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function Sign() {
  const [obj1, setobj] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate=useNavigate()

  const fun = (e) => {
    const { name, value } = e.target;
    setobj((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("User data:", obj1);
    try{
        let res=await axios.post('http://localhost:5000/post',obj1,)
        if(res.status==201){
          navigate('/')
        }
        }catch(err){
            console.log(err);
        } 
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={obj1.name}
          onChange={fun}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <label htmlFor="mail" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          id="mail"
          name="email"
          value={obj1.email}
          onChange={fun}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={obj1.password}
          onChange={fun}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition duration-200"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Sign;
