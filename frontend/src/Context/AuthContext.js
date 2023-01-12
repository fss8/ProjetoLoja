import React, { createContext, useState, useEffect} from 'react';

const Context = createContext();

function AuthProvider({children}) {

    const [user, setUser] = useState()

    useEffect(() => {
      const userToken = localStorage.getItem("user_token")
      const usersStorage = localStorage.getItem("user_db")

      //Alguma função que recebe um ok de que foi feito o login do backend
      if(userToken && usersStorage) {
        const hasUser = JSON.parse(usersStorage)?.filter(
            (user) => user.email === JSON.parse(userToken).email
        );

        if (hasUser) setUser(hasUser[0])
      }
    
      
    }, [])
    

    const signin = (email, senha, token, id) => {
        //setUser(null)
        localStorage.setItem("user_token", JSON.stringify({email, token, id}))
        setUser({email, senha, id})
    }

    const signup = (email,senha) => {
        //setUser(null)

    }

    const signout = () => {
        setUser(null)
        //Primeiro remover do userstorage numa função handleLogout
        localStorage.removeItem("user_token")
    }

    return (
        //O campo value precisa ser passado para obter os dados de uma rota filho.
        <Context.Provider value={{user, signed: !!user, signin, signup, signout}}>
            {children}
        </Context.Provider>
    )
}

export { Context, AuthProvider };