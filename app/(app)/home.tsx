import { useAuth } from '@/context/AuthContext';
import React from 'react';
import { Button, Pressable, Text, View } from 'react-native';

const Home = () => {
	const { logout, user } = useAuth();

	const handleLogout = async () => {
		await logout();
	};
	console.log(`user => =>`, user);
	return (
		<View>
			<Text>Home</Text>
			<Button title='Sign Out' onPress={handleLogout} />
			<Pressable onPress={handleLogout}>
				<Text>Sign Out</Text>
			</Pressable>
		</View>
	);
};

export default Home;
