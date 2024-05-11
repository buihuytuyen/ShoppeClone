import { User } from '@/types/user.type';
import { getAccessTokenFromLs, getProfileFromLS } from '@/utils/auth';
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

interface AppContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;

  profile: User | null;

  setProfile: Dispatch<SetStateAction<User | null>>;
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLs()),
  setIsAuthenticated: () => {},
  profile: getProfileFromLS(),
  setProfile: () => {}
};

export const AppContext = createContext<AppContextInterface>(initialAppContext);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated);
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile);

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, profile, setProfile }}>
      {children}
    </AppContext.Provider>
  );
};
