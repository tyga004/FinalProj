import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, StyleSheet, TextInput, Keyboard, Animated } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import Custom_Button from '../components/Custom_Button';
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';
const ForgotPassword = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('');
    const [studentNumber, setStudentNumber] = useState();

    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    const fadeAnime = useRef(new Animated.Value(0)).current;

    const forgetPassword = async () => {
        try {
            const userSnapshot = await firebase
                .firestore()
                .collection('users')
                .where('studentNumber', '==', studentNumber)
                .where('email', '==', email)
                .get();

            if (userSnapshot.empty) {
                alert('Invalid studentNumber or email');
            } else {
                await firebase.auth().sendPasswordResetEmail(email);
                alert('Password reset email sent');
                navigation.goBack();
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
        <Animated.View style={{ flex: 1, marginTop: 20, opacity: fadeAnime, backgroundColor: '#ebeae8', }}>
            <View style={styles.container}>

                <View style={styles.InputBox}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Student Number"
                        onChangeText={(studentNumber) => setStudentNumber(studentNumber)}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                </View>
                <View style={styles.InputBox}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email"
                        onChangeText={(email) => setEmail(email)}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                </View>
                <View style={styles.button}>
                    {!isKeyboardVisible && <Custom_Button title='Recover Password' onPress={() => { forgetPassword() }} />}
                </View>

            </View>

        </Animated.View >
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        marginTop: 100,
        backgroundColor: '#ebeae8',
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
        width: 250,
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'left',
        marginHorizontal: '10%'
    },
    button: {
        marginTop: 0,
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
    }
});
