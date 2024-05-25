import { db } from '@/firebaseConfig';
import { blurhash, getRoomId } from '@/utils/common';
import { Image } from 'expo-image';
import { ExpoRouter } from 'expo-router/types/expo-router';
import {
	DocumentData,
	collection,
	doc,
	onSnapshot,
	orderBy,
	query
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp
} from 'react-native-responsive-screen';

interface ChatItemProps extends ChatProps {
	currentUser: User | null;
}

const ChatItem = ({ user, router, currentUser }: ChatItemProps) => {
	const [lastMessage, setLastMessage] = useState<DocumentData | null>(
		null
	);
	const openChatRoom = () => {
		router.push({
			pathname: '/chatRoom',
			params: user
		});
	};

	useEffect(() => {
		const roomId = getRoomId({
			userId1: currentUser?.userId,
			userId2: user?.userId
		});
		const docRef = doc(db, 'rooms', roomId);
		const messagesRef = collection(docRef, 'messages');
		const messagesQuery = query(
			messagesRef,
			orderBy('createdAt', 'desc')
		);

		const unsub = onSnapshot(messagesQuery, snapshot => {
			const allMessages = snapshot.docs.map(doc => doc.data());
			setLastMessage(allMessages[0] ? allMessages[0] : null);
		});

		return () => {
			unsub;
		};
	}, []);

	const renderTime = () => {
		return 'Time';
	};

	const renderLastMessage = () => {
		if (typeof lastMessage === 'undefined') return 'Loading...';
		if (lastMessage) {
			if (currentUser?.userId === lastMessage.userId)
				return `You: ${lastMessage.text}`;
			return lastMessage?.text;
		} else {
			return 'Say Hi 👋';
		}
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
						{renderLastMessage()}
					</Text>
				</View>
				<Text
					style={{ fontSize: hp(1.6) }}
					className='text-white font-medium'
				>
					{renderTime()}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default ChatItem;
