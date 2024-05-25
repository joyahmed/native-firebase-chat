import HomeHeader from '@/components/HomeHeader';
import { Stack } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, View } from 'react-native';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp
} from 'react-native-responsive-screen';

const Layout = () => {
	return (
		<Stack>
			<Stack.Screen
				name='home'
				options={{
					headerShown: false
				}}
			/>
		</Stack>
	);
};

export default Layout;
