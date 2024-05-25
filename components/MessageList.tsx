import { DocumentData } from 'firebase/firestore';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import MessageItem from './MessageItem';

export interface MessageListProps {
	messages: DocumentData;
	currentUser: User | null;
}

const MessageList = ({ messages, currentUser }: MessageListProps) => {
	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ paddingTop: 10 }}
		>
			{messages.map((message: Message, index: number) => (
				<MessageItem key={index} {...{ message, currentUser }} />
			))}
		</ScrollView>
	);
};

export default MessageList;
