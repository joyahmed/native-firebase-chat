import { blurhash } from '@/utils/common';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ExpoRouter } from 'expo-router/types/expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp
} from 'react-native-responsive-screen';

interface ChatItemProps {
	user: User;
	router: ExpoRouter.Router;
}

const ChatItem = ({ user, router }: ChatItemProps) => {

	return (
		<TouchableOpacity onPress={() => {}}>
			<View className='flex flex-row items-center justify-between mx-4 gap-3 mb-4 pb-2  bg-black/50 rounded-md p-5'>
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
				<View className='flex-1 gap-1 '>
					<View className='flex-row justify-between'>
						<Text
							style={{ fontSize: hp(1.8) }}
							className='text-white font-semibold'
						>
							{user?.userName}
						</Text>
						<Text
							style={{ fontSize: hp(1.6) }}
							className='text-white font-medium'
						>
							Time
						</Text>
					</View>
					<Text
						style={{ fontSize: hp(1.6) }}
						className='font-medium text-white'
					>
						Last Message
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default ChatItem;
