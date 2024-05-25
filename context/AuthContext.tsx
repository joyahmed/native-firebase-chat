import { auth, db } from '@/firebaseConfig';
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState
} from 'react';

// Define types for the context state and functions
interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean | undefined;
	login: (
		email: string,
		password: string
	) => Promise<{ success: boolean; message?: string }>;
	logout: () => Promise<{
		success: boolean;
		message?: string;
		error?: string;
	}>;
	register: (
		email: string,
		password: string,
		userName: string,
		profileUrl: string
	) => Promise<{
		success: boolean;
		data?: User;
		message?: string;
		error?: string;
	}>;
}

interface User {
	email: string;
	userName: string;
	profileUrl: string;
	userId: string;
}

// Create the AuthContext with a default value of undefined
export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);

interface AuthContextProviderProps {
	children: ReactNode;
}

export const AuthContextProvider = ({
	children
}: AuthContextProviderProps) => {
	const [user, setUser] = useState<User | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState<
		boolean | undefined
	>(undefined);

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, async firebaseUser => {
			if (firebaseUser) {
				const userDoc = await getDoc(
					doc(db, 'users', firebaseUser.uid)
				);
				if (userDoc.exists()) {
					const userData = userDoc.data() as User;
					setUser({
						email: firebaseUser.email!,
						userName: userData.userName,
						profileUrl: userData.profileUrl,
						userId: firebaseUser.uid
					});
					setIsAuthenticated(true);
				}
			} else {
				setIsAuthenticated(false);
				setUser(null);
			}
		});

		return () => unsub();
	}, []);

	const login = async (email: string, password: string) => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			return { success: true };
		} catch (error: any) {
			let errorMessage = error.message;
			if (errorMessage.includes('(auth/invalid-email)'))
				errorMessage = 'Invalid email';
			if (errorMessage.includes('(auth/invalid-credential)'))
				errorMessage = 'Invalid credentials';

			return { success: false, message: errorMessage };
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
			setUser(null);
			setIsAuthenticated(false);
			return { success: true };
		} catch (error: any) {
			return {
				success: false,
				message: error?.message,
				error: error
			};
		}
	};

	const register = async (
		email: string,
		password: string,
		userName: string,
		profileUrl: string
	) => {
		try {
			const response = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			const userId = response.user.uid;
			await setDoc(doc(db, 'users', userId), {
				userName,
				profileUrl,
				userId
			});

			const newUser: User = {
				email: response.user.email!,
				userName,
				profileUrl,
				userId
			};

			setUser(newUser);
			setIsAuthenticated(true);

			return { success: true, data: newUser };
		} catch (error: any) {
			let errorMessage = error.message;
			if (errorMessage.includes('(auth/invalid-email)'))
				errorMessage = 'Invalid email';
			if (errorMessage.includes('(auth/email-already-in-use)'))
				errorMessage = 'This email is already in use';
			if (errorMessage.includes('(auth/weak-password)'))
				errorMessage = 'Password must contain at least 6 characters';
			return { success: false, message: errorMessage };
		}
	};

	return (
		<AuthContext.Provider
			value={{ user, isAuthenticated, login, register, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error(
			'useAuth must be used within an AuthContextProvider'
		);
	}
	return context;
};
