import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp
} from 'react-native-responsive-screen';

export const useResponsive = () => {
	return { hp, wp };
};
