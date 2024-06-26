import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import ChatItem from './ChatItem';

interface ChatListComponentProps {
	users: User[];
	currentUser: User | null
}

const ChatListComponent = ({ users, currentUser }: ChatListComponentProps) => {
	const router = useRouter();
	return (
		<View className='flex-1'>
			<FlatList
				data={users}
				contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
				keyExtractor={item => Math.random().toString()}
				showsVerticalScrollIndicator={false}
				renderItem={({ item, index }) => (
					<ChatItem {...{ user: item, index, router:router, currentUser }} />
				)}
			/>
		</View>
	);
};

export default ChatListComponent;
