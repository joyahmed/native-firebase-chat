import { blurhash } from '@/utils/common';
import { Image } from 'expo-image';
import { ExpoRouter } from 'expo-router/types/expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp
} from 'react-native-responsive-screen';

const ChatItem = ({ user, router }: ChatProps) => {
	const openChatRoom = () => {
		router.push({
			pathname: '/chatRoom',
			params: user
		});
	};
	return (
		<TouchableOpacity onPress={openChatRoom}>
			<View className='flex-row items-center justify-between gap-3 mb-4  bg-black/30 rounded-md px-4 py-6'>
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
				{/* name and last message */}
				<View className='flex-1 justify-center gap-1'>
					<View className='flex-row items-center justify-between'>
						<Text
							style={{ fontSize: hp(1.8) }}
							className='text-white font-semibold'
						>
							{user?.userName}
						</Text>
					</View>
					<Text
						style={{ fontSize: hp(1.6) }}
						className='font-medium text-white'
					>
						Last Message
					</Text>
				</View>
				<Text
					style={{ fontSize: hp(1.6) }}
					className='text-white font-medium'
				>
					Time
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default ChatItem;
