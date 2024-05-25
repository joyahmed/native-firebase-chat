import React from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp
} from 'react-native-responsive-screen';

const StartPage = () => {
	return (
		<View className='relative flex-1 items-center justify-center'>
			<Image
				style={{ height: hp(100) }}
				resizeMode='cover'
				source={require('../assets/images/main-bg.png')}
				className='absolute'
			/>
			<ActivityIndicator size='large' color='white' />
		</View>
	);
};

export default StartPage;
