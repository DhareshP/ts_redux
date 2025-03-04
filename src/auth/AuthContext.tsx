import React, { createContext, useContext, useEffect, useState } from 'react';

// type of authentication context, login accepts a token
interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;  //token returns type void, does not return anythng
  logout: () => void;  //default null
}

// creating context with type AuthContextType
const AuthContext = createContext<AuthContextType | undefined>(undefined); //useContext will check if context is missing to only used within AuthProvider

//Provider components are used to wrap the entire application
//children is a prop that will be passed to the AuthProvider component
// AuthProvider component that will wrap the entire application and provide the authentication context, wraps up parts of the apps taht need 
                            // access to authentication state
        //childern -> nested components inside authProvider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); //default false
//isAuthenticated tracks if user is authenticated or not, default is false

//checks token in local storage, if token is present, sets isAuthenticated to true
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    setIsAuthenticated(!!token);
  }, []);

  //when login is called succes api request, token is stored in local storage and isAuthenticated is set to true
  const login = (token: string) => {
    localStorage.setItem('auth_token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
  };

  //provideing the context value to the children
  //AuthContext.Provider wraps children, rest of the apps that need authentication
  //provides the value of isAuthenticated, login, logout to any child component that calls useAuth()
    return(
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

//custom hook for consuming context
//calls useContext(AuthContext) to read the context
//if useAuth is called outside of AuthProvider, it will throw an error
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export { AuthContext };