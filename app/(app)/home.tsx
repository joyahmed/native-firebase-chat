import ChatListComponent from '@/components/ChatListComponent';
import HomeHeader from '@/components/HomeHeader';
import { useAuth } from '@/context/AuthContext';
import { usersRef } from '@/firebaseConfig';
import { useResponsive } from '@/hooks/useResponsive';
import { StatusBar } from 'expo-status-bar';
import { getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	ImageBackground,
	View
} from 'react-native';

const Home = () => {
	const { user } = useAuth();
	const [users, setUsers] = useState([]);
	const { hp, wp } = useResponsive();

	useEffect(() => {
		if (user?.userId) {
			getUsers();
		}
	}, []);

	const getUsers = async () => {
		const userQuery = query(
			usersRef,
			where('userId', '!=', user?.userId)
		);

		const querySnapshot = await getDocs(userQuery);
		let data: any = [];
		querySnapshot.forEach(doc => {
			data.push({ ...doc.data() });
		});
		setUsers(data);
	};

	return (
		<ImageBackground
			source={require('../../assets/images/chat-bg.png')}
			className='flex-1'
		>
			<HomeHeader />
			<View className='flex-1 bg-black/10'>
				<StatusBar style='light' />
				{users.length ? (
					<ChatListComponent users={users} />
				) : (
					<View className='flex items-center' style={{ top: hp(30) }}>
						<ActivityIndicator size='large' />
					</View>
				)}
			</View>
		</ImageBackground>
	);
};

export default Home;
