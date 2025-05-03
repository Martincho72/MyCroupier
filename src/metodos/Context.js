import { createContext, useState } from 'react';

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [informacionUsuario, setInformacionUsuario] = useState(null);
  const [online, setOnline] = useState(false);

  return (
    <Context.Provider value={{ informacionUsuario, setInformacionUsuario, online, setOnline }}>
      {children}
    </Context.Provider>
  );
};

export default {
  Context,
  Provider: ContextProvider,
};