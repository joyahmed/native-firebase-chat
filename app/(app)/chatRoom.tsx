import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const ChatRoom = () => {
  const item = useLocalSearchParams();

  console.log(item.user)
	return (
		<View>
			<Text>ChatRoom</Text>
		</View>
	);
};

export default ChatRoom;
