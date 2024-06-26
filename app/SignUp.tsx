import Loading from '@/components/Loading';
import { useAuth } from '@/context/AuthContext';
import { Feather, Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import {
	Alert,
	Image,
	Pressable,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp
} from 'react-native-responsive-screen';

const SignIn = () => {
	const router = useRouter();
	const { register } = useAuth();
	const [loading, setLoading] = useState<boolean>(false);
	const emailRef = useRef<string>('');
	const usernameRef = useRef<string>('');
	const passwordRef = useRef<string>('');
	const profileRef = useRef<string>('');

	const handleRegister = async () => {
		setLoading(true);
		if (
			!emailRef.current ||
			!passwordRef.current ||
			!usernameRef ||
			!profileRef
		) {
			Alert.alert('Sign Up', 'Please fill all the fields!');
			setLoading(true);
			return;
		}

		let response = await register(
			emailRef.current,
			passwordRef.current,
			usernameRef.current,
			profileRef.current
		);

		setLoading(false);

		console.log(`register result => =>`, response);
		if (!response.success) {
			Alert.alert('Sign Up', response.message);
		}
	};

	return (
		<View className='flex-1'>
			<StatusBar style='dark' />
			<View className='relative flex-1 items-center gap-12 bg-black'>
				<Image
					style={{ height: hp(100) }}
					resizeMode='cover'
					source={require('../assets/images/register-image.png')}
					className='absolute'
				/>

				<View
					style={{ paddingHorizontal: wp(5) }}
					className='flex-1 items-center justify-center'
				>
					<View className='flex py-5 px-2 items-center justify-center gap-10 w-full bg-black/30 rounded-xl'>
						<Text
							style={{ fontSize: hp(4.5) }}
							className='font-bold tracking-wider text-center text-white'
						>
							Sign Up
						</Text>
						{/* inputs */}
						<View className='gap-4'>
							<View
								style={{ height: hp(7) }}
								className='flex-row gap-4 px-4 border-[1px] border-blue-900/70 items-center rounded-xl w-full'
							>
								<Feather name='user' size={hp(2.7)} color='white' />
								<TextInput
									onChangeText={value =>
										(usernameRef.current = value)
									}
									style={{ fontSize: hp(2) }}
									className='flex-1 font-semibold text-white w-full'
									placeholder='User name'
									placeholderTextColor={'white'}
								/>
							</View>
							<View
								style={{ height: hp(7) }}
								className='flex-row gap-4 px-4 border-[1px] border-blue-900/70 items-center rounded-xl w-full'
							>
								<Octicons name='mail' size={hp(2.7)} color='white' />
								<TextInput
									onChangeText={value => (emailRef.current = value)}
									style={{ fontSize: hp(2) }}
									className='flex-1 font-semibold text-white w-full'
									placeholder='Email address'
									placeholderTextColor={'white'}
								/>
							</View>
							<View className='gap-4'>
								<View
									style={{ height: hp(7) }}
									className='flex-row gap-4 px-4 border-[1px] border-blue-900/70 items-center rounded-xl'
								>
									<Octicons
										name='lock'
										size={hp(2.7)}
										color='white'
									/>
									<TextInput
										onChangeText={value =>
											(passwordRef.current = value)
										}
										style={{ fontSize: hp(2) }}
										className='flex-1 font-semibold text-white'
										placeholder='Password'
										secureTextEntry
										placeholderTextColor={'white'}
									/>
								</View>
							</View>
							<View className='gap-4'>
								<View
									style={{ height: hp(7) }}
									className='flex-row gap-4 px-4 border-[1px] border-blue-900/70 items-center rounded-xl'
								>
									<Feather
										name='image'
										size={hp(2.7)}
										color='white'
									/>
									<TextInput
										onChangeText={value =>
											(profileRef.current = value)
										}
										style={{ fontSize: hp(2) }}
										className='flex-1 font-semibold text-white'
										placeholder='Avatar url'
										placeholderTextColor={'white'}
									/>
								</View>
							</View>
						</View>

						{/* submit button */}

						<View className='flex items-center justify-center w-full'>
							{loading ? (
								<View className='justify-center'>
									<Loading size={hp(6.5)} />
								</View>
							) : (
								<TouchableOpacity onPress={handleRegister}>
									<View
										style={{ height: hp(6.5) }}
										className='flex bg-red-600 rounded-xl items-center justify-center w-full'
									>
										<Text
											style={{ fontSize: hp(2.7) }}
											className=' text-white font-bold tracking-wider w-full min-w-[97%] text-center'
										>
											Sign Up
										</Text>
									</View>
								</TouchableOpacity>
							)}
						</View>

						{/* sign up text */}

						<View className='flex-row justify-center'>
							<Text
								style={{ fontSize: hp(1.8) }}
								className='font-semibold text-neutral-100'
							>
								Already have an account?{' '}
							</Text>
							<Pressable onPress={() => router.push('signIn')}>
								<Text
									style={{ fontSize: hp(1.8) }}
									className='font-bold text-red-500'
								>
									Sign In
								</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
};

export default SignIn;
