import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, StyleSheet, TextInput, Keyboard, Animated, Text, Pressable, Image } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import Custom_Button from '../components/Custom_Button';
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';
const Security = () => {
    const [password, setPassword] = useState('');
    const navigation = useNavigation()
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    const fadeAnime = useRef(new Animated.Value(0)).current;

    const security = async () => {
        if (password !== confirmPassword) {
            alert("Password and Confirm Password do not match");
            return;
        }

        try {
            const userSnapshot = await firebase
                .firestore()
                .collection('users')
                .where('email', '==', email)
                .get();

            if (userSnapshot.empty) {
                alert('Invalid email');
            } else {
                const passwordSnapshot = await firebase
                    .firestore()
                    .collection('users')
                    .where('password', '==', password)
                    .get();

                if (passwordSnapshot.empty) {
                    alert('Invalid Password');
                } else {
                    await firebase.auth().sendPasswordResetEmail(email);
                    alert('Password reset email sent');
                    navigation.goBack();
                }
            }
        } catch (error) {
            alert(error);
        }
    };

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
        <Animated.View style={{ flex: 1, opacity: fadeAnime }}>
            <View style={styles.Container}>

                <View style={{ marginTop: 100 }}>
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
                    <View style={styles.InputBox}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Confirm Password"
                            onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry={true}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    {!isKeyboardVisible && <Custom_Button title='Reset Password' onPress={() => { security() }} />}
                </View>
            </View>



        </Animated.View >
    )
}

export default Security

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 100,
        backgroundColor: '#ebeae8',
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
    button: {
        marginTop: 0,
        height: 90,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    headerStyle: {
        height: 150,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: '#FFCA10',
        shadowColor: '#000',
        elevation: 25
    },
    BackContainer: {
        position: 'absolute',
        top: 50,
        left: 0,
        paddingHorizontal: 20,
    },
    Back_Button: {
        height: hp(3.5),
        width: wp(3.5),
    },
    Title: {
        fontSize: 30,
        paddingHorizontal: 20,
        paddingTop: 40,
        marginTop: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
    },
    Container: {
        flex: 10,
    },
    Header: {
        height: hp(35),
        backgroundColor: '#FFCA10',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Styled_Text: {
        fontSize: hp(2),
        textDecorationLine: 'underline',
        fontWeight: 'bold'
    },
    Styled_Text2: {
        fontSize: hp(2),
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        position: 'absolute',
        right: 0
    },
    textInput: {
        paddingTop: 20,
        paddingBottom: 10,
        width: 400,
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'left',
        paddingHorizontal: 10
    },
    Bottom: {
        height: hp(10),
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    Company_Logo: {
        height: hp(12),
        width: wp(64),
        resizeMode: 'contain'
    },
    TIP_Logo: {
        height: hp(8),
        width: wp(17),
        resizeMode: 'contain'
    }
});
