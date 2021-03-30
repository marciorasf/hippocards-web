import React, { createContext, useContext, useState } from "react"

type UserProps = {
  id: number;
  email: string;
};

export interface UserContext {
  user: UserProps;
  setUser: (data: Partial<UserProps>) => void;
}

const UserStore = createContext<UserContext>({} as UserContext)

export const useUserStore = () => useContext(UserStore)

const UserStoreProvider: React.FC = (props) => {
  const { children } = props

  const [user, setUserData] = useState<UserProps>({} as UserProps)

  const setUser = (data: Partial<UserProps>) => {
    setUserData((lastState) => ({
      ...lastState,
      ...data,
    }))
  }

  return (
    <UserStore.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserStore.Provider>
  )
}

export default UserStoreProvider
