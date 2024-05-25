import { DocumentData } from 'firebase/firestore';
import React from 'react';
import { ScrollView } from 'react-native';
import MessageItem from './MessageItem';

export interface MessageListProps {
	messages: DocumentData;
	currentUser: User | null;
	scrollViewRef: React.RefObject<ScrollView>;
}

const MessageList = ({
	messages,
	currentUser,
	scrollViewRef
}: MessageListProps) => {
	return (
		<ScrollView
			ref={scrollViewRef}
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
