import ChatRoomHeader from '@/components/ChatRoomHeader';
import MessageList from '@/components/MessageList';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebaseConfig';
import useChatRoom from '@/hooks/useChatRoom';
import { useResponsive } from '@/hooks/useResponsive';
import { getRoomId } from '@/utils/common';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
	DocumentData,
	Timestamp,
	addDoc,
	collection,
	doc,
	onSnapshot,
	orderBy,
	query,
	setDoc
} from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import {
	Alert,
	ImageBackground,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';

const ChatRoom = () => {
	const router = useRouter();
	const {
		item,
		user,
		messages,
		inputRef,
		textRef,
		handleSendMessage
	} = useChatRoom();
	const { hp} = useResponsive();

	return (
		<ImageBackground
			source={require('../../assets/images/chat-bg.png')}
			className='flex-1'
		>
			<View className='flex-1'>
				<StatusBar style='light' />
				<ChatRoomHeader {...{ user: item, router }} />
				<View className='flex-1 justify-between overflow-visible'>
					<View className='flex-1'>
						<MessageList {...{messages, currentUser: user}} />
					</View>
					<View style={{ marginBottom: hp(1.7) }} className='pt-2'>
						<View className='flex-row items-center justify-between bg-black/30 p-2 rounded-full mx-3'>
							<TextInput
								ref={inputRef}
								onChangeText={value => (textRef.current = value)}
								style={{ fontSize: hp(2) }}
								placeholder='Type message...'
								placeholderTextColor={'white'}
								className='flex-1 mr-2 text-white px-2'
							/>
							<TouchableOpacity onPress={handleSendMessage}>
								<Feather
									name='send'
									size={hp(2.7)}
									color='white'
									className='mr-1.5'
								/>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		</ImageBackground>
	);
};

export default ChatRoom;
