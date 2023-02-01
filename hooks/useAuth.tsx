import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	User,
} from 'firebase/auth';
import Router, { useRouter } from 'next/router';
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { auth } from '../firebase';

interface IAuth {
	user: User | null;
	signUp: (email: string, password: string) => Promise<void>;
	signIn: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	error: string | null;
	loading: boolean;
}

const AuthContext = createContext<IAuth>({
	user: null,
	signUp: async () => {},
	signIn: async () => {},
	logout: async () => {},
	error: null,
	loading: false,
});

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState<User | null>(null);
	const [error, setError] = useState(null);
	const [initialLoading, setInitialLoading] = useState(true);
	const router = useRouter();

	useEffect(
		() =>
			onAuthStateChanged(auth, (user) => {
				if (user) {
					// Logged in...
					setUser(user);
					setLoading(false);
				} else {
					// Not logged in...
					setUser(null);
					setLoading(true);
					router.push('/login');
				}

				setInitialLoading(false);
			}),
		[auth]
	);

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
			// TODO: Error UI
			console.log(e);
			setLoading(false);
		}
	};

	const signIn = async (email: string, password: string) => {
		setLoading(true);
		try {
			const newUserCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			setUser(newUserCredential.user);
			router.push('/');
			setLoading(false);
		} catch (e) {
			// TODO: Error UI
			window.alert(e);
			setLoading(false);
		}
	};

	const logout = async () => {
		setLoading(true);
		try {
			await signOut(auth);
			setUser(null);
			setLoading(false);
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	};

	const memoizedUser = useMemo(
		() => ({
			user,
			signUp,
			signIn,
			loading,
			error,
			logout,
		}),
		[user, loading, error]
	);

	return (
		<AuthContext.Provider value={memoizedUser}>
			{!initialLoading && children}
		</AuthContext.Provider>
	);
};

export default function useAuth() {
	return useContext(AuthContext);
}
