import { AuthContextProvider, useAuth } from '@/context/AuthContext';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { MenuProvider } from 'react-native-popup-menu';
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
		<MenuProvider>
			<AuthContextProvider>
				<MainLayout />
			</AuthContextProvider>
		</MenuProvider>
	);
};

export default RootLayout;
