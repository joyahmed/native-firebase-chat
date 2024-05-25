import HomeHeader from '@/components/HomeHeader';
import { useAuth } from '@/context/AuthContext';

import React from 'react';
import {
	Button,
	Image,
	ImageBackground,
	Pressable,
	Text,
	View
} from 'react-native';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp
} from 'react-native-responsive-screen';

const Home = () => {
	const { logout, user } = useAuth();

	const handleLogout = async () => {
		await logout();
	};
	return (
		<ImageBackground
			source={require('../../assets/images/chat-bg.png')}
			className='flex-1'
		>
			<HomeHeader />
			<View className='flex-1 bg-black/10'>
				<Button title='Sign Out' onPress={handleLogout} />
				<Pressable onPress={handleLogout}>
					<Text>Sign Out</Text>
				</Pressable>
			</View>
		</ImageBackground>
	);
};

export default Home;
