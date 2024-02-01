import TextInput from "@/components/TextInput";
import authServices from "@/services/auth-services";
import useAuthStore from "@/store/auth";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const validator = useRef(
    new SimpleReactValidator({
      className: "validation-error",
    })
  );
  const [forceUpdate, setForceUpdate] = useState(1);

  const handleLogin = async () => {
    if (!validator.current.allValid()) {
      validator.current.showMessages();
      setForceUpdate(forceUpdate + 1);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        email: loginData.email,
        password: loginData.password,
      };
      const response = await authServices.login(payload);
      const userId = response.data.user_id;

      useAuthStore.setState({
        authToken: response.token,
        isLoggedIn: true,
        userDetail: response.data,
      });
      toast.success(response.message);
      setLoading(false);
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
    // Add your login logic here
    console.log("Login button clicked!");
  };

  const inputHandler = (val: string, type: string) => {
    setLoginData({ ...loginData, [type]: val });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="flex flex-col bg-white shadow-[0px_0px_120px_1px_#2a4365] p-6 rounded-2xl  w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div className="mb-4">
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
          onClick={handleLogin}
        >
          {loading ? "Logging in.." : "Login"}
        </button>
        <p className="text-sm mt-4 self-end">
          {`Make a new account! `}
          <Link className="text-blue-500" to={"/sign-up"}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
