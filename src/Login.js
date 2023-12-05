import { useNavigation } from '@react-navigation/native'
import { firebase } from '../config'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity, View, Text, Image, StyleSheet, TextInput, Animated, Keyboard } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import Custom_Button from '../components/Custom_Button';

const Login = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const fadeAnime = useRef(new Animated.Value(0)).current;
    loginUser = async (email, password) => {
        try {
           
            const userSnapshot = await firebase
                .firestore()
                .collection('users')
                .where('email', '==', email)
                .get();

            if (userSnapshot.empty) {
                alert('Email not found');
                return;
            }
            await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            alert("Incorrect password");
        }
    }

    useEffect(() => {
        Animated.timing(fadeAnime, {
            toValue: 1,
            duration: 2500,
            useNativeDriver: true,
        }).start();

        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setIsKeyboardVisible(true);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setIsKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <Animated.View style={{ flex: 1, opacity: fadeAnime, backgroundColor: '#ebeae8' }}>
            <View style={styles.container}>
                <View style={styles.InputBox}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email"
                        onChangeText={(email) => setEmail(email)}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                </View>
                <View style={styles.InputBox}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Password"
                        onChangeText={(password) => setPassword(password)}
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={true}
                    />
                </View>

                <View style={styles.Forget}>
                    <View style={[styles.flex_container]}>

                        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                            <Text style={styles.Styled_Text2}>
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>

                <View>
                    {!isKeyboardVisible && <Custom_Button title='Sign In' onPress={() => loginUser(email, password)} />}
                </View>
                <View style={styles.Register}>
                    <View style={[styles.flex_container2]}>
                        <Text style={styles.NText}>Don't have an account yet?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                            <Text style={styles.Styled_Text}> Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Animated.View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        marginTop: 100,
        backgroundColor: '#ebeae8',
        height:'100%'
    },
    flex_container2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    Register: {
        height: 30,
        width: 'auto',
        marginTop: '1%',
        alignSelf: 'center',
    },
    Forget: {
        height: hp(6),
        width: 'auto',
        right: '5%',
        justifyContent: 'space-between',
    },
    NText: {
        fontFamily: 'notoserif',
        fontSize: 15,
        color: 'gray',
    },
    Styled_Text: {
        fontSize: hp(2),
        fontWeight: 'bold'
    },
    Styled_Text2: {
        fontSize: hp(2),
        fontWeight: 'bold',
        position: 'absolute',
        right: 0
    },
    textInput: {
        paddingTop: 20,
        paddingBottom: 10,
        width: 250,
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'left',
        marginHorizontal: '10%'
    },
    button: {
        marginTop: 10,
        height: 90,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    Left_Container: {
        width: wp(30),
    },
    Right_Container: {
        width: wp(40),
    },
    button: {
        marginTop: 20,
        height: 70,
        width: 250,
        backgroundColor: '#026efd',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    Header: {
        height: hp(10),
        backgroundColor: '#FFCA10',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    InputBox: {
        borderRadius: 25,
        alignContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#787878',
        marginHorizontal: 30,
        marginVertical: 10,
        backgroundColor: '#fafafa',
    },
    Company_Logo: {
        height: hp(12),
        width: wp(64),
        resizeMode: 'contain'
    },
    TIP_Logo: {
        height: hp(8),
        width: wp(17),
        resizeMode: 'contain'
    },
    Divider: {
        height: 1,
        width: '90%',
        backgroundColor: 'black',
        alignSelf: 'center',
        marginVertical: 10,
    },
});
