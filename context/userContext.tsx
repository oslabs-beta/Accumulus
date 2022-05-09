import React, { useState, FC } from 'react';

interface IUserData {
  arn: string;
  externalId: string;
  region: string;
}

interface IUserContext {
  user: IUserData;
  setUser?: (arg: IUserData) => void;
}

const defaultUser: IUserContext = {
  user: {
    arn: 'default',
    externalId: 'default',
    region: 'default',
  },
};

const UserContext = React.createContext<IUserContext>(defaultUser);

interface Props {
  children: React.ReactNode;
}

export const UserWrapper = ({ children }: Props) => {
  const [user, setUser] = useState(defaultUser.user);

  // const confirmedUser = (arg: any): any => setUser(user);
  const storeDetails = (arg: IUserData) => {
    setUser(arg);
    console.log(`Data inside setUser: ${user}`);
  };

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </>
  );
};

export function useUserContext() {
  return React.useContext(UserContext);
}
