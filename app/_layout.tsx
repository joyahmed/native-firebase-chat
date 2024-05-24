import { Slot, useRouter, useSegments } from 'expo-router';
// Import your global CSS file
import { AuthContextProvider, useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import '../global.css';

const MainLayout = () => {
	const { isAuthenticated } = useAuth();
	const segments = useSegments();
	const router = useRouter();

	useEffect(() => {
		// check if user is authenticated or not
		if (typeof isAuthenticated == 'undefined') return;
		const inApp = segments[0] === '(app)';
		if (isAuthenticated && !inApp) {
			// redirect to home
			router.replace('home');
		} else if (isAuthenticated == false) {
			// redirect to signIn
			router.replace('signIn');
		}
	}, [isAuthenticated]);

	return <Slot />;
};

const RootLayout = () => {
	return (
		<AuthContextProvider>
			<MainLayout />
		</AuthContextProvider>
	);
};

export default RootLayout;
