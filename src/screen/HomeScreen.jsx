import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../utils/color';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import styles from '../css/style';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if(trimmedEmail ==='admin' && trimmedPassword === 'Admin@123'){
      navigation.navigate('MAHA');
    } else {
      setErrorMessage('Invalid Email or Password');
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/mahaLogo.png')}
        style={styles.bannerImage}
      />
      <Text style={styles.title}>Welcome To </Text>
      <Text style={styles.title2}>MAHA CONNECT 3</Text>
      <Text style={styles.subTitle}>DIGITAL PHONE DIRECTORY</Text>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name={'mail-outline'} size={25} color={colors.secondary} />

          <TextInput
            style={styles.TextInput}
            placeholder="Enter your email"
            placeholderTextColor={colors.secondary}
            keyboardType="email-address"
            value={email}
            onChangeText={text => {
              setEmail(text);
              console.log('Email:', text); // Log the email input
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <SimpleLineIcons name={'lock'} size={29} color={colors.secondary} />

          <TextInput
            style={styles.TextInput}
            placeholder="Enter your password"
            placeholderTextColor={colors.secondary}
            secureTextEntry={secureEntry}
            value={password}
            onChangeText={text => {
              setPassword(text);
              console.log('Password:', text); // Log the password input
            }}
          />

          <TouchableOpacity
            onPress={() => {
              setSecureEntry(prev => !prev);
            }}>
            <Ionicons
              name={secureEntry ? 'eye-off' : 'eye'}
              size={20}
              color={colors.secondary}
            />
          </TouchableOpacity>
        </View>
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.loginButtonWrapper,
              {backgroundColor: colors.skyblue},
            ]}
            onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
              style={[styles.loginButtonWrapper]}
              onPress={handleSignup}>
              <Text style={styles.signupButtonText}>Sign-up</Text>
            </TouchableOpacity> */}
        </View>
        <TouchableOpacity>
          <Text style={styles.forgetPasswordText}>Forget Password?</Text>
        </TouchableOpacity>
      </View>
      {/* <Image source={require('../assets/mahaLogo.png')} style={styles.logo} />
      <Text>Version - 0.1</Text> */}
    </View>
  );
};

export default HomeScreen;