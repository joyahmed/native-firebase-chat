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
	handleLogin: (email: string, password: string) => Promise<void>;
	handleLogout: () => Promise<void>;
	handleRegister: (
		email: string,
		password: string,
		userName: string,
		profileUrl: string
	) => Promise<void>;
}

interface User {
	email: string;
	userName: string;
	profileUrl: string;
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
		// onAuthStateChanged logic here
		setTimeout(() => setIsAuthenticated(true), 3000);
	}, []);

	const handleLogin = async (email: string, password: string) => {
		try {
			// Login logic here
		} catch (error) {
			console.error(error);
		}
	};

	const handleLogout = async () => {
		try {
			// Logout logic here
		} catch (error) {
			console.error(error);
		}
	};

	const handleRegister = async (
		email: string,
		password: string,
		userName: string,
		profileUrl: string
	) => {
		try {
			// Register logic here
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated,
				handleLogin,
				handleRegister,
				handleLogout
			}}
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
