import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import styles from './style';

export const Auth = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [sentOtp, setSentOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignIn = async () => {
    try {
      const userData = {
        email,
        password
      };

      const response = await axios.post('http://192.168.1.30:5001/login-user', userData);

      if (response.data.status === 'ok') {
        Alert.alert('Logged In Successfully');
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Invalid Email or Password');
      }
    } catch (error) {
      Alert.alert('Error', 'Invalid Email or Password');
    }
  };

  const handleSignUp = async () => {
    try {
      if (!isOtpSent) {
        // Send OTP via email
        const response = await axios.post('http://192.168.1.30:5001/send-otp', { email });
        setSentOtp(response.data.otp);
        setIsOtpSent(true);
        Alert.alert('Success', response.data.message);
      } else {
        if (otp !== sentOtp) {
          Alert.alert('Error', 'Invalid OTP');
          return;
        }

        const userData = {
          name,
          email,
          phone: phoneNumber,
          password
        };

        const response = await axios.post('http://192.168.1.30:5001/register', userData);
        Alert.alert('Success', response.data.message);
        navigation.navigate('Home');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps={'always'}>
      <View style={{ backgroundColor: 'white' }}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../assets/app_logo.png')} />
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.text_header}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
          {!isSignUp ? (
            <>
              <View style={styles.action}>
                <FontAwesome name="user-o" color="#420475" style={styles.smallIcon} />
                <TextInput
                  placeholder="Mobile or Email"
                  style={styles.textInput}
                  onChange={e => setEmail(e.nativeEvent.text)}
                />
              </View>
              <View style={styles.action}>
                <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
                <TextInput
                  placeholder="Password"
                  style={styles.textInput}
                  onChange={e => setPassword(e.nativeEvent.text)}
                />
              </View>
              <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 8, marginRight: 10 }}>
                <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
                  <Text style={{ color: '#420475', fontWeight: '700' }}>Don't have an account? Sign up now</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View style={styles.action}>
                <FontAwesome name="user-o" color="#420475" style={styles.smallIcon} />
                <TextInput
                  placeholder="Name"
                  style={styles.textInput}
                  onChange={e => setName(e.nativeEvent.text)}
                />
              </View>
              {!isOtpSent ? (
                <View style={styles.action}>
                  <FontAwesome
                    name="mobile"
                    color="#420475"
                    size={35}
                    style={{ paddingRight: 10, marginTop: -7, marginLeft: 5 }}
                  />
                  <TextInput
                    placeholder="Phone Number"
                    style={styles.textInput}
                    onChange={e => setPhoneNumber(e.nativeEvent.text)}
                    maxLength={10}
                  />
                </View>
              ) : null}
              <View style={styles.action}>
                <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
                <TextInput
                  placeholder="Password"
                  style={styles.textInput}
                  onChange={e => setPassword(e.nativeEvent.text)}
                  secureTextEntry={true}
                />
              </View>
              {!isOtpSent ? (
                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                  <Text style={styles.textSign}>Send OTP</Text>
                </TouchableOpacity>
              ) : (
                <>
                  <View style={styles.action}>
                    <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
                    <TextInput
                      placeholder="Enter OTP"
                      style={styles.textInput}
                      onChange={e => setOtp(e.nativeEvent.text)}
                    />
                  </View>
                  <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.textSign}>Sign Up</Text>
                  </TouchableOpacity>
                </>
              )}
            </>
          )}
        </View>
        {!isSignUp ? (
          <View style={styles.button}>
            <TouchableOpacity style={styles.inBut} onPress={() => handleSignIn()}>
              <View>
                <Text style={styles.textSign}>Sign In</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default Auth;
