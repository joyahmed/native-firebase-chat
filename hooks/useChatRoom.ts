import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebaseConfig';
import { getRoomId } from '@/utils/common';
import { useLocalSearchParams } from 'expo-router';
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
import { createRef, useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const useChatRoom = () => {
	const item = useLocalSearchParams();
	const { user } = useAuth();
	const [messages, setMessages] = useState<DocumentData>([]);
	const textRef = useRef('');
	const inputRef = useRef<TextInput | null>(null);
	const scrollViewRef = useRef<ScrollView>(null);

	const getRoomIdWrapper = () => {
		return getRoomId({
			userId1: user?.userId,
			userId2: item?.userId
		});
	};

	const createRoomIfNotExists = async () => {
		const roomId = getRoomIdWrapper();
		await setDoc(doc(db, 'rooms', roomId), {
			roomId,
			createdAt: Timestamp.fromDate(new Date())
		});
	};

	const handleSendMessage = async () => {
		const message = textRef.current.trim();
		if (!message) return;

		try {
			const roomId = getRoomIdWrapper();
			const docRef = doc(db, 'rooms', roomId);
			const messagesRef = collection(docRef, 'messages');
			textRef.current = '';
			if (inputRef) inputRef?.current?.clear();

			const newDoc = await addDoc(messagesRef, {
				userId: user?.userId,
				text: message,
				profileUrl: user?.profileUrl,
				senderName: user?.userName,
				createdAt: Timestamp.fromDate(new Date())
			});

			console.log('new message id: ', newDoc.id);
		} catch (error: any) {
			Alert.alert('Message', error.message);
		}
	};

	useEffect(() => {
		createRoomIfNotExists();

		const roomId = getRoomIdWrapper();
		const docRef = doc(db, 'rooms', roomId);
		const messagesRef = collection(docRef, 'messages');
		const messagesQuery = query(messagesRef, orderBy('createdAt'));

		const unsub = onSnapshot(messagesQuery, snapshot => {
			const allMessages = snapshot.docs.map(doc => doc.data());
			setMessages([...allMessages]);
		});

		const keyboardDidShowListener = Keyboard.addListener(
			'keyboardDidShow',
			updateScrollView
		);

		return () => {
			unsub;
			keyboardDidShowListener.remove();
		};
	}, []);

	useEffect(() => {
		updateScrollView();
	}, [messages]);

	const updateScrollView = () => {
		setTimeout(() => {
			scrollViewRef?.current?.scrollToEnd({ animated: true }), 100;
		});
	};

	return {
		item,
		user,
		messages,
		inputRef,
		textRef,
		handleSendMessage,
		scrollViewRef
	};
};

export default useChatRoom;
