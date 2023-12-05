import React, {useEffect, useRef} from "react";
import Svg, { Ellipse } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import Circle_Indicator from '../components/Circle_Indicator';
import {Image, View, StyleSheet, Animated, Easing} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Welcome = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoPositionY = useRef(new Animated.Value(0)).current;
  const logoPositionX = useRef(new Animated.Value(0)).current;
  const companyNameOpacity = useRef(new Animated.Value(0)).current;
  const companyNamePositionX = useRef(new Animated.Value(-1000)).current;
  const loadingIndicatorOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 0, 
      duration: 1500, 
      useNativeDriver: true, 
      easing: Easing.inOut(Easing.ease),
    }).start();

    Animated.timing(logoOpacity, {
       toValue: 1, 
       duration: 300, 
       delay: 1000, 
       useNativeDriver: true, 
     }).start();

    Animated.sequence([
      Animated.timing(logoPositionY, {
        toValue: hp(-30), 
        duration: 500, 
        delay: 1000, 
        useNativeDriver: true, 
        easing: Easing.linear,
      }),
      Animated.timing(logoPositionY, {
        toValue: hp(-30), 
        duration: 500, 
        useNativeDriver: true, 
      }),
      Animated.timing(logoPositionY, {
        toValue: 0, 
        duration: 500, 
        useNativeDriver: true, 
        easing: Easing.bounce,
      }),
    ]).start(() => {
      Animated.timing(logoPositionX, {
        toValue: wp(-38), 
        duration: 600, 
        useNativeDriver: true, 
        easing: Easing.ease,
      }).start(); 

      Animated.timing(companyNameOpacity, {
        toValue: 1, 
        duration: 500, 
        useNativeDriver: true,
      }).start();

      Animated.timing(companyNamePositionX, {
        toValue: wp(10), // Move the company name and logo to their final position
        duration: 500, // Duration of the animation in milliseconds
        delay: 1000,
        useNativeDriver: true, // Use the native driver for performance
      }).start(() => {
        Animated.timing(loadingIndicatorOpacity, {
          toValue: 1, // Opacity 1 (visible)
          duration: 500, // Duration of the animation in milliseconds
          delay: 1000,
          useNativeDriver: true, // Use the native driver for performance
        }).start();
      });
    });

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000, // Adjust the duration as needed
        useNativeDriver: true,
      }).start();

      const navigationTimeout = setTimeout(() => {
        navigation.navigate('Login'); // Navigate to the 'Login' screen
      }, 10000);
  
      // Clear the timeout to prevent it from triggering if the component unmounts
      return () => clearTimeout(navigationTimeout);
  }, []);

  return(
    <Animated.View style={[styles.Animation_Container, {opacity: fadeAnim}]}>
      <View style={styles.Animation_Area}>

        <View style={styles.Ellipse_Container}>
          <Animated.View style={[{ transform: [{ scale: scaleAnim }] },]}>
            <Svg>
                <Ellipse cx="50%" cy="50%" rx="50%" ry="20%" fill="#483F1E" />
            </Svg>
          </Animated.View>
        </View>

        <View style={styles.Logo_Container}>
            <Animated.Image style={[styles.Logo_Style, 
              {opacity: logoOpacity, 
              transform: [{translateY: logoPositionY}, 
              {translateX: logoPositionX}]}]}
              source={require('./../assets/Logo.png')}/>
        </View>
        <Animated.Image style={[styles.Company_Name,
          {opacity: companyNameOpacity,
          transform: [{translateX: companyNamePositionX}]}]}
          source={require('./../assets/cname.png')}/>
        
        <View style={styles.Loading}>
          <Animated.View style={{opacity: loadingIndicatorOpacity}}>
            <Circle_Indicator/>
          </Animated.View>
        </View>

      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  Animation_Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFCA10',
  },
  Animation_Area: {
    height: hp(50),
    width: wp(100),
    alignItems: 'center', 
    justifyContent: 'center',
  },
  Ellipse_Container: {
    overflow: 'hidden',
    width: wp(80),
    height: hp(20),
    alignSelf: 'center',
  },
  Logo_Container: {
    position: 'absolute',
  },
  LogoandCompany: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  Logo_Style: {
    width: wp(20),
    height: hp(12),
    resizeMode: 'contain'
  },
  Company_Name: {
    width: wp(75),
    height: hp(10),
    resizeMode: 'contain',
    position: 'absolute'
  },
  Loading:{
    position: 'absolute',
    top: '60%'
  }
})

export default Welcome;