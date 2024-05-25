import ChatListComponent from '@/components/ChatListComponent';
import HomeHeader from '@/components/HomeHeader';
import { useAuth } from '@/context/AuthContext';
import { usersRef } from '@/firebaseConfig';
import { StatusBar } from 'expo-status-bar';
import { getDocs, query, where } from 'firebase/firestore';

import React, { useEffect, useState } from 'react';
import {
	ActivityIndicator,
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

const dummyUsers = [
	{
		email: 'joythegreatone@gmail.com',
		userName: 'Joy',
		profileUrl:
			'https://lh3.googleusercontent.com/a/ACg8ocIX3n3jjXybQW_yJuA7TdJLRQYStyRncZmrVnlSTsbsVWPHl_IH=s288-c-no',
		userId: '123'
	},
	{
		email: 'amma@gmail.com',
		userName: 'Amma',
		profileUrl:
			'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
		userId: '456'
	}
];

const Home = () => {
	const { user } = useAuth();
	const [users, setUsers] = useState(dummyUsers);

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
				<StatusBar style='dark' />
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
