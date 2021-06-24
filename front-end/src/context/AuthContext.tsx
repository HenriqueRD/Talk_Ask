import { createContext, useState, useEffect, ReactNode } from 'react';
import { auth, firebase } from '../services/firebase';

type User = {
    id: string,
    name: string,
    photo: string
}

type AuthContext = {
    user: User | undefined,
    signInWithGoogle: () => Promise<void>,
}

type AuthContextProviderProps = {
    children: ReactNode
}

export const authContext = createContext({} as AuthContext);

function AuthContextProvider(props: AuthContextProviderProps) {

    const [user, setUser] = useState<User>();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
                const { displayName, photoURL, uid } = user;

                if(!displayName || !photoURL) {
                    throw new Error('Erro!!!');
                }

                setUser({
                    id: uid,
                    name: displayName,
                    photo: photoURL
                });
            }
        });
        
        return () => {
        unsubscribe();
        }

    }, []);
  
    async function signInWithGoogle() {

        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await auth.signInWithPopup(provider);

        if(result.user) { 
            const { displayName, photoURL, uid } = result.user;

            if(!displayName || !photoURL) {
                throw new Error('Erro!!!');
            }

            setUser({
                id: uid,
                name: displayName,
                photo: photoURL
            });
        }
    }

    return (
        <authContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </authContext.Provider>
    );
}


export default AuthContextProvider;