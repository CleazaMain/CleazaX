import axios from "axios";
import { ReactNode, createContext, useState, useEffect } from "react";

interface Props {
  children?: ReactNode;
}

export const UserContext = createContext<{
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
}>({
  userName: '',
  setUserName: () => undefined,
  id: '',
  setId: () => undefined,
});

export function UserContextProvider({ children }: Props) {
  const [userName, setUserName] = useState<string>('');
  const [id, setId] = useState<string>('');
  useEffect(() => {
    axios.get("/profile").then(response => {
      setId(response.data.id)
      setUserName(response.data.username)
    })
  }, [])
  return (
    <UserContext.Provider value={{ userName, setUserName, id, setId }}>
      {children}
    </UserContext.Provider>
  );
}
