import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, View, Easing } from 'react-native';
import Svg, { Ellipse } from 'react-native-svg';
import Circle_Indicator from './Components/Circle_Indicator';
import { useNavigation } from '@react-navigation/native';
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
    // Add an animation sequence to scale the Ellipse from 0 to 30%
    Animated.timing(scaleAnim, {
      toValue: 0, 
      duration: 1500, 
      useNativeDriver: true, 
      easing: Easing.inOut(Easing.ease),
    }).start();

    // Fade in the logo when the ellipse reaches 30%
    Animated.timing(logoOpacity, {
      toValue: 1, 
      duration: 400, 
      delay: 900, 
      useNativeDriver: true, 
    }).start();

    Animated.sequence([
      Animated.timing(logoPositionY, {
        toValue: -150, 
        duration: 500, 
        delay: 1000, 
        useNativeDriver: true, 
        easing: Easing.linear,
      }),
      Animated.timing(logoPositionY, {
        toValue: -150, 
        duration: 250, 
        useNativeDriver: true, 
      }),
      Animated.timing(logoPositionY, {
        toValue: 0, 
        duration: 1500, 
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

      // Slide in the company name and logo
      Animated.timing(companyNameOpacity, {
        toValue: 1, // Opacity 1 (visible)
        duration: 500, // Duration of the animation in milliseconds
        useNativeDriver: true, // Use the native driver for performance
      }).start();

      Animated.timing(companyNamePositionX, {
        toValue: wp(-39), // Move the company name and logo to their final position
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
      duration: 3000, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();

    const navigationTimeout = setTimeout(() => {
      navigation.navigate('Login'); // Navigate to the 'Login' screen
    }, 10000);

    // Clear the timeout to prevent it from triggering if the component unmounts
    return () => clearTimeout(navigationTimeout);
  }, []);

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <View style={styles.ellipseContainer}>
        <Animated.View style={[{ transform: [{ scale: scaleAnim }] },]}>
          <Svg height={hp(10)} width={wp(80)}>
            <Ellipse cx={wp(40)} cy={hp(5)} rx={wp(40)} ry={hp(3.5)} fill="483F1E" />
          </Svg>
        </Animated.View>
      </View>
        <View style={styles.logoContainer}>
          <Animated.View style={styles.logoAndNameContainer}>
              <Animated.Image
                source={require('./../assets/Logo.png')} // Replace with the path to your logo image
                style={[
                  styles.logo,
                  { opacity: logoOpacity, transform: [{ translateY: logoPositionY }, {translateX: logoPositionX}] },
                ]}
              />
              <Animated.Image
              source={require('./../assets/cname.png')}
              style={[
                styles.companyName,
                { opacity: companyNameOpacity, transform: [{ translateX: companyNamePositionX }] },
              ]}
              />
            </Animated.View>
        </View>
        <View style={styles.Loading}>
          <Animated.View style={{opacity: loadingIndicatorOpacity}}>
            <Circle_Indicator/>
          </Animated.View>
        </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFCA10',
  },
  ellipseContainer: {
    overflow: 'hidden',
    width: wp(80),
    height: hp(10),
    alignSelf: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: '50%', // Center the logo vertically within the ellipse
    left: '50%', // Center the logo horizontally within the ellipse
    transform: [{ translateX: -40 }, { translateY: -40 }], // Adjust the values based on logo size
  },
  logoAndNameContainer: {
    flexDirection: 'row', // Arrange logo and company name side by side
    alignItems: 'center', // Vertically center logo and company name
  },
  logo: {
    width: wp(20), // Adjust the width of the logo as needed
    height: hp(10), // Adjust the height of the logo as needed
    marginRight: 5,
    resizeMode: 'contain',
  },
  companyName: {
    resizeMode: 'contain',
    width: wp(75),
    height: hp(10),
  },
  Loading:{
    position: 'absolute',
    top: '55%'
  }
});

export default Welcome;