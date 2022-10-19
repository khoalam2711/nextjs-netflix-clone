import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	User,
} from 'firebase/auth';

import Router, { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth } from '../firebase';

const useAuth = () => {
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState<User | null>();
	const router = useRouter();

	const signUp = async (email: string, password: string) => {
		setLoading(true);
		try {
			const newUserCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			setUser(newUserCredential.user);
			router.push('/');
			setLoading(false);
		} catch (e) {
			setLoading(false);
			console.log(e)
		}
	};
};

export default useAuth;
