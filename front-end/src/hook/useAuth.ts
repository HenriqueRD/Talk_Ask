import { useContext } from 'react';
import { authContext } from '../context/AuthContext';

export function useAuth() {
    const value = useContext(authContext)

    return value;
}
export function useIsAuth() {
    const { user } = useContext(authContext)

    if(user === undefined) {
        return false;
    }

    return true;
}