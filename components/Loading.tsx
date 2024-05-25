import LottieView from 'lottie-react-native';
import React from 'react';
import { View } from 'react-native';

const Loading = ({ size }: { size: number }) => {
	return (
		<View style={{ height: size }}>
			<LottieView
				style={{ flex: 1 }}
				source={require('../assets/images/loading.json')}
				autoPlay
				loop
			/>
		</View>
	);
};

export default Loading;
