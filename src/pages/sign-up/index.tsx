import PageTitle from "@/components/PageTitle";
import TextInput from "@/components/TextInput";
import authServices from "@/services/auth-services";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";

const SignUp = () => {
  const navigate = useNavigate();
  const validator = useRef(
    new SimpleReactValidator({
      className: "validation-error",
    })
  );
  const [forceUpdate, setForceUpdate] = useState(1);
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSignUp = async () => {
    if (!validator.current.allValid()) {
      validator.current.showMessages();
      setForceUpdate(forceUpdate + 1);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        user_name: loginData.username,
        email: loginData.email,
        password: loginData.password,
      };
      const response = await authServices.signUp(payload);
      console.log(document?.cookie, "cooookiees");
      toast.success(response.message);
      setLoading(false);
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const inputHandler = (val: string, type: string) => {
    setLoginData({ ...loginData, [type]: val });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="flex flex-col bg-white shadow-[0px_0px_120px_1px_#2a4365] p-6 rounded-2xl  w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <div className="flex flex-col mb-4 gap-y-2">
          <TextInput
            label="User Name"
            onChangeText={(val) => inputHandler(val, "username")}
            value={loginData.username}
            placeholder="Enter your username"
            required={true}
            validator={[validator, "required"]}
          />
          <TextInput
            label="email"
            onChangeText={(val) => inputHandler(val, "email")}
            value={loginData.email}
            placeholder="Enter your email"
            required={true}
            validator={[validator, "required|email"]}
          />
          <TextInput
            label="Password"
            onChangeText={(val) => inputHandler(val, "password")}
            value={loginData.password}
            placeholder="Enter your password"
            type="password"
            required={true}
            validator={[validator, "required|min:6"]}
          />
        </div>

        <button
          type="button"
          className="bg-white text-primary px-4 py-2 border-primary border-opacity-70  rounded-md hover:outline-none"
          onClick={handleSignUp}
        >
          {loading ? "Signing in..." : "Sign up"}
        </button>

        <p className="text-sm mt-4 self-end">
          {`Already have an account ! `}
          <Link className="text-blue-500" to={"/login"}>
            login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
