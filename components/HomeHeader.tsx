import { useAuth } from '@/context/AuthContext';
import { useResponsive } from '@/hooks/useResponsive';
import { blurhash } from '@/utils/common';
import { AntDesign, Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Platform, Text, View } from 'react-native';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomMenuItem from './CustomMenuItem';

const ios = Platform.OS == 'ios';

const HomeHeader = () => {
	const { user, logout } = useAuth();
	const { top } = useSafeAreaInsets();
	const { hp, wp } = useResponsive();

	const handleProfile = () => {};

	const handleLogout = async () => {
		await logout();
	};
	return (
		<View
			style={{ paddingTop: ios ? top : top + 10 }}
			className='flex-row justify-between px-5 pb-6 rounded-b-3xl shadow-xl bg-black/30'
		>
			<View>
				<Text
					style={{ fontSize: hp(3) }}
					className='font-bold text-white'
				>
					Chats
				</Text>
			</View>
			<View className=''>
				<Menu>
					<MenuTrigger
						customStyles={{
							triggerWrapper: {
								height: hp(5.5),
								aspectRatio: 1,
								borderRadius: 100,
								borderColor: 'steelblue',
								borderWidth: 1.5,
								overflow: 'hidden'
							}
						}}
					>
						<Image
							style={{
								height: hp(5.5),
								aspectRatio: 1,
								borderRadius: 100,
								borderColor: 'steelblue',
								borderWidth: 1.5
							}}
							source={user?.profileUrl}
							placeholder={{ blurhash }}
							transition={500}
						/>
					</MenuTrigger>
					<MenuOptions
						customStyles={{
							optionsContainer: {
								borderRadius: 10,
								borderCurve: 'continuous',
								marginTop: 39,
								marginLeft: -5,
								backgroundColor: 'rgba(0, 10, 50, 0.8)',
								shadowOpacity: 0.2,
								shadowOffset: { width: 0, height: 0 },
								width: 160
							}
						}}
					>
						<CustomMenuItem
							{...{
								text: 'Profile',
								action: handleProfile,
								value: null,
								icon: (
									<Feather name='user' size={hp(2.5)} color='white' />
								)
							}}
						/>
						<Divider />
						<CustomMenuItem
							{...{
								text: 'Sign Out',
								action: handleLogout,
								value: null,
								icon: (
									<AntDesign
										name='logout'
										size={hp(2.5)}
										color='white'
									/>
								)
							}}
						/>
					</MenuOptions>
				</Menu>
			</View>
		</View>
	);
};

export default HomeHeader;

const Divider = () => {
	return <View className='p-[1px] w-full bg-white/50'></View>;
};
