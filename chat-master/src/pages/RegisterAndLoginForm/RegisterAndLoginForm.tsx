import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

const RegisterAndLoginForm = () => {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoginOrRegister, setIsLoginOrRegister] = useState("register");
  const { setUserName: setLoggedInUserName, setId } = useContext(UserContext);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const url = isLoginOrRegister === 'register' ? '/register' : '/login'
    const { data } = await axios.post(url, { username, password });
    setLoggedInUserName(username);
    setId(data.id);
  }
  return (
    <div className="bg-slate-100 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
        <input
          value={username}
          type="text"
          placeholder="Username"
          className="block w-full rounded-sm p-2 mb-2 border"
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <input
          value={password}
          type="password"
          placeholder="Password"
          className="block w-full rounded-sm p-2 mb-2 border"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          value={confirmPassword}
          type="password"
          placeholder="Confirm password"
          className="block w-full rounded-sm p-2 mb-2 border"
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></input>
        <button className="bg-sky-600 block w-full rounded-sm p-2 text-white">
          {isLoginOrRegister === "register" ? "Register" : "Login"}
        </button>
        <div className="text-center mt-2">
          {isLoginOrRegister === "register" ? (
            <>
              <p className="inline pr-2">Already a member?</p>
              <button onClick={() => setIsLoginOrRegister("login")}>
                Login
              </button>
            </>
          ) : (
            <>
              <p className="inline pr-2">Not a member?</p>
              <button onClick={() => setIsLoginOrRegister("register")}>
                Register
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegisterAndLoginForm;
