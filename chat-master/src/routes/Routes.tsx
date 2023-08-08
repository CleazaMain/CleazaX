import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import RegisterAndLoginForm from "../pages/RegisterAndLoginForm/RegisterAndLoginForm";
const Routes = () => {
  const { userName, id } = useContext(UserContext);
  if(userName) {
    return 'User logged in'
  }
  return <RegisterAndLoginForm />;
};

export default Routes;
