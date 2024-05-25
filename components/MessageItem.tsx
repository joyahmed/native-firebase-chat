import { useResponsive } from '@/hooks/useResponsive';
import React from 'react';
import { Text, View } from 'react-native';

interface MessageItemProps {
	message: Message;
	currentUser: User | null;
}

const MessageItem = ({ message, currentUser }: MessageItemProps) => {
	const { hp, wp } = useResponsive();
	if (currentUser?.userId === message?.userId) {
		return (
			<View className='flex-row justify-end mb-3 mr-3'>
				<View style={{ width: wp(80) }}>
					<View className='flex self-end p-3 rounded-2xl bg-black/70'>
						<Text
							style={{ fontSize: hp(1.9) }}
							className='text-white'
						>
							{message?.text}
						</Text>
					</View>
				</View>
			</View>
		);
	} else {
		return (
			<View style={{ width: wp(80) }} className='ml-3 mb-3'>
				<View className='flex  self-start p-3 px-4 rounded-2xl bg-black/60'>
					<Text style={{ fontSize: hp(1.9) }} className='text-white'>
						{message?.text}
					</Text>
				</View>
			</View>
		);
	}
};

export default MessageItem;
