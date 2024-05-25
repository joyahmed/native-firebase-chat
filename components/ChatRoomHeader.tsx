import { useResponsive } from '@/hooks/useResponsive';
import { blurhash } from '@/utils/common';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack } from 'expo-router';
import { ExpoRouter } from 'expo-router/types/expo-router';
import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ios = Platform.OS == 'ios';

interface ChatRoomHeaderProps {
	user: any;
	router: ExpoRouter.Router;
}

const ChatRoomHeader = ({ user, router }: ChatRoomHeaderProps) => {
	const { hp, wp } = useResponsive();

	const { top } = useSafeAreaInsets();

	return (
		<View
			style={{ paddingTop: ios ? top : top + 10 }}
			className='flex-row items-center justify-between  mb-4 bg-black/30 rounded-b-3xl px-4 py-6'
		>
			<View className='w-1/3'>
				<TouchableOpacity onPress={() => router.back()}>
					<Entypo name='chevron-left' size={hp(4)} color='white' />
				</TouchableOpacity>
			</View>

			<View className='flex flex-row items-center justify-center gap-4 w-1/3'>
				<Image
					source={{ uri: user?.profileUrl }}
					style={{
						height: hp(6),
						width: hp(6),
						aspectRatio: 1,
						borderRadius: 100
					}}
					placeholder={blurhash}
					transition={500}
				/>
				<Text
					style={{ fontSize: hp(2.5) }}
					className='text-white font-medium'
				>
					{user?.userName}
				</Text>
			</View>

			<View className='flex items-center justify-end flex-row gap-6 w-1/3'>
				<Ionicons name='call' size={hp(2.8)} color={'white'} />
				<Ionicons name='videocam' size={hp(2.8)} color={'white'} />
			</View>
		</View>
	);
};

export default ChatRoomHeader;
