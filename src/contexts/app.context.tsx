import { ExtendedPurchase } from '@/types/purchase.type';
import { User } from '@/types/user.type';
import { getAccessTokenFromLs, getProfileFromLS } from '@/utils/auth';
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

interface AppContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;

  profile: User | null;

  setProfile: Dispatch<SetStateAction<User | null>>;

  extendedPurchases: ExtendedPurchase[];

  setExtendedPurchases: Dispatch<SetStateAction<ExtendedPurchase[]>>;
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLs()),
  setIsAuthenticated: () => {},
  profile: getProfileFromLS(),
  setProfile: () => {},
  extendedPurchases: [],
  setExtendedPurchases: () => {}
};

export const AppContext = createContext<AppContextInterface>(initialAppContext);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated);
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>(initialAppContext.extendedPurchases);
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile);

  return (
    <AppContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, profile, setProfile, extendedPurchases, setExtendedPurchases }}
    >
      {children}
    </AppContext.Provider>
  );
};
