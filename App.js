import { NavigationContainer } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { firebase } from './config';
import Login from './src/Login';
import Welcome from './src/Welcome';
import Registration from './src/Registration';
import ForgotPassword from './src/ForgotPassword';
import Security from './src/Security';
import EditProfile from './src/EditProfile';
import SendReport from './src/SendReport';
import GoClaim from './src/GoClaim';
import Homepage from './src/Homepage';
import Profile from './src/Profile';
import Header from './components/Header';
import { View, Image, StyleSheet, Text, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import UploadPost from './src/UploadPost';

const Stack = createStackNavigator();

function App() {
  const navigation = useNavigation()

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [])
  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle: () => <Header name="" />,
            headerStyle: {
              height: 150,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              backgroundColor: '#FFCA10',
              shadowColor: '#000',
              elevation: 25
            },
            headerLeft: () => (
              <Image
                source={require('./assets/cname.png')}
                style={styles.Cname}
              />
            ),
            headerRight: () => (
              <Image
                source={require('./assets/TIP_Logo.png')}
                style={styles.Company_Logo}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{
            headerTitle: () => <Header name="Registration" />,
            headerStyle: {
              height: 150,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              backgroundColor: '#FFCA10',
              shadowColor: '#000',
              elevation: 25
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              textAlign: 'center',
              alignSelf: 'center',
            },

          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerTitle: () => <Header name="Forgot Password" />,
            headerStyle: {
              height: 150,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              backgroundColor: '#FFCA10',
              shadowColor: '#000',
              elevation: 25
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              textAlign: 'center',
              alignSelf: 'center',
            },
          }}
        />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home Page"
        component={Homepage}
        options={{
          headerTitle: () => <Header name="" />,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            backgroundColor: '#FFCA10',
            shadowColor: '#000',
            elevation: 25
          },
          headerLeft: () => (
            <Image
              source={require('./assets/Logo.png')}
              style={styles.Company_Logo}
            />
          ),
          headerRight: () => (
            <Image
              source={require('./assets/cname.png')}
              style={styles.Cname1}
            />
          ),
        }}
      />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerTitle: () => <Header name="Edit Profile" />,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            backgroundColor: '#FFCA10',
            shadowColor: '#000',
            elevation: 25
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            textAlign: 'center',
            alignSelf: 'center',
          },
        }}
      />
      <Stack.Screen
        name="Security"
        component={Security}
        options={{
          headerTitle: () => <Header name="Change Password" />,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            backgroundColor: '#FFCA10',
            shadowColor: '#000',
            elevation: 25
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            textAlign: 'center',
            alignSelf: 'center',
          },
        }}
      />
      <Stack.Screen
        name="SendReport"
        component={SendReport}
        options={{
          headerTitle: () => <Header name="Report Post" />,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            backgroundColor: '#FFCA10',
            shadowColor: '#000',
            elevation: 25
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            textAlign: 'center',
            alignSelf: 'center',
          },
        }}
      />
      <Stack.Screen
        name="GoClaim"
        component={GoClaim}
        options={{
          headerTitle: () => <Header name="Claim Item" />,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            backgroundColor: '#FFCA10',
            shadowColor: '#000',
            elevation: 25
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            textAlign: 'center',
            alignSelf: 'center',
          },
        }}
      />
      <Stack.Screen
        name="UploadPost"
        component={UploadPost}
        options={{
          headerTitle: () => <Header name="Upload Post" />,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            backgroundColor: '#FFCA10',
            shadowColor: '#000',
            elevation: 25
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            textAlign: 'center',
            alignSelf: 'center',
          },
        }}
      />
    </Stack.Navigator>

  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}


const styles = StyleSheet.create({
  Company_Logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 16,
  },
  Cname: {
    width: 225,
    height: 250,
    resizeMode: 'contain',
    marginLeft: 15
  },
  Cname1: {
    width: 225,
    height: 250,
    resizeMode: 'contain',
    marginRight: 20
  }
})