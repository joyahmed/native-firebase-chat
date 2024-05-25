import React from 'react';
import { Text, View } from 'react-native';
import { MenuOption } from 'react-native-popup-menu';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp
} from 'react-native-responsive-screen';

interface CustomMenuItemsProps {
	text: string;
	action: () => void;
	value: string | null;
	icon: any;
}

const CustomMenuItem = ({
	text,
	action,
	value,
	icon
}: CustomMenuItemsProps) => {
	return (
		<MenuOption onSelect={() => action()}>
			<View className='flex-row justify-between items-center px-4 py-2'>
				<Text className='text-white'>{text}</Text>
				{icon}
			</View>
		</MenuOption>
	);
};

export default CustomMenuItem;
