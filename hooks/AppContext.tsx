import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AppContextType {
  statusMap: { [key: string]: string };
  updateStatus: (id: string, newStatus: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [statusMap, setStatusMap] = useState<{ [key: string]: string }>({});
  
  const updateStatus = (id: string, newStatus: string) => {
    setStatusMap((prev) => ({ ...prev, [id]: newStatus }));
    console.log("Updated statusMap:", statusMap); // Log updated statusMap
  };
  


  return (
    <AppContext.Provider value={{ statusMap, updateStatus }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};