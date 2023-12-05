import { View, StyleSheet, TextInput, Keyboard, Animated, ScrollView } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import Custom_Button from '../components/Custom_Button';
import { firebase } from '../config';
import { Picker } from '@react-native-picker/picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [studentNumber, setStudentNumber] = useState();
    const [userName, setUserName] = useState();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [yearLevel, setYearLevel] = useState('');
    const [year, setYear] = useState('');
    const [course, setCourse] = useState('');
    const [semester, setSemester] = useState();
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    const fadeAnime = useRef(new Animated.Value(0)).current;


    registerUser = async (firstName, lastName, course, year, yearLevel, semester, studentNumber, userName, email, password, confirmPassword) => {
        if (
            !firstName ||
            !lastName ||
            !course ||
            !year ||
            !yearLevel ||
            !semester ||
            !studentNumber ||
            !userName ||
            !email ||
            !password ||
            !confirmPassword
        ) {
            alert("Please fill in all the fields");
            return;
        }
        if (password !== confirmPassword) {
            alert("Password and Confirm Password do not match");
            return;
        }

        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);

            const user = firebase.auth().currentUser;

            await user.sendEmailVerification({
                url: 'https://responsiveapp1.firebaseapp.com/verify-email',
                handleCodeInApp: true,
            });
            const yearString = String(year);
            const yearLevelString = String(yearLevel);
            const semesterString = String(semester);

            await firebase.firestore().collection('users')
                .doc(user.uid)
                .set({
                    studentNumber,
                    userName,
                    email,
                    password,
                    year: yearString,
                    yearLevel: yearLevelString,
                    semester: semesterString,
                    firstName,
                    lastName,
                    course
                });

            alert('Verification email sent');
        } catch (error) {
            alert(error.message);
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
        <KeyboardAwareScrollView
            contentContainerStyle={styles.scrollViewContainer}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
            extraHeight={Platform.select({ android: 100 })}
        >
            <ScrollView
                contentContainerStyle={styles.scrollViewContainer}
                keyboardShouldPersistTaps="handled"
            >
                <Animated.View style={{ flex: 1, opacity: fadeAnime }}>
                    <View style={styles.container}>
                        <View>
                            <View style={styles.container2}>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.textInput2}
                                        placeholder="Student Number"
                                        onChangeText={(studentNumber) => setStudentNumber(studentNumber)}
                                        autoCorrect={false}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.textInput2}
                                        placeholder="Username"
                                        onChangeText={(userName) => setUserName(userName)}
                                        autoCorrect={false}
                                    />
                                </View>
                            </View>
                            <View style={styles.container2}>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.textInput2}
                                        placeholder="First Name"
                                        onChangeText={(firstName) => setFirstName(firstName)}
                                        autoCorrect={false}
                                        autoCapitalize="characters"
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.textInput2}
                                        placeholder="Last Name"
                                        onChangeText={(lastName) => setLastName(lastName)}
                                        autoCorrect={false}
                                        autoCapitalize="characters"
                                    />
                                </View>
                            </View>
                            <View style={styles.container2}>
                                <View style={styles.inputContainer}>
                                    <Picker
                                        selectedValue={yearLevel}
                                        onValueChange={(itemValue) => setYearLevel(itemValue)}
                                        style={styles.picker}
                                        mode="dropdown"
                                        itemStyle={{ fontSize: 20 }}
                                    >
                                        <Picker.Item label="Year Level" value={null} enabled={false} />
                                        <Picker.Item label="1st Year" value="1st Year" />
                                        <Picker.Item label="2nd Year" value="2nd Year" />
                                        <Picker.Item label="3rd Year" value="3rd Year" />
                                        <Picker.Item label="4th Year" value="4th Year" />
                                        <Picker.Item label="5th Year" value="5th Year" />
                                    </Picker>
                                </View>
                                <View style={styles.inputContainer}>
                                    <Picker
                                        selectedValue={semester}
                                        onValueChange={(itemValue) => setSemester(itemValue)}
                                        style={styles.picker}
                                        mode="dropdown"
                                    >
                                        <Picker.Item label="Semester" value={null} enabled={false} />
                                        <Picker.Item label="1st Semester" value="1st Semester" />
                                        <Picker.Item label="2nd Semester" value="2nd Semester" />
                                        <Picker.Item label="Summer" value="Summer" />
                                    </Picker>
                                </View>
                            </View>
                            <View style={styles.container2}>
                                <View style={styles.inputContainer}>
                                    <Picker
                                        selectedValue={year}
                                        onValueChange={(itemValue) => setYear(itemValue)}
                                        style={styles.picker}
                                        mode="dropdown"
                                        itemStyle={{ fontSize: 20 }}
                                    >
                                        <Picker.Item label="School Year" value={null} enabled={false} />
                                        <Picker.Item label="2023-2024" value="2023-2024" />
                                        <Picker.Item label="2024-2025" value="2023-2024" />
                                    </Picker>
                                </View>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.textInput2}
                                        placeholder="Course"
                                        onChangeText={(course) => setCourse(course)}
                                        autoCorrect={false}
                                        autoCapitalize="characters"
                                    />
                                </View>
                            </View>
                            <TextInput
                                style={styles.textInput}
                                placeholder="T.I.P Email"
                                onChangeText={(email) => setEmail(email)}
                                autoCorrect={false}
                                keyboardType="email-address"
                            />
                            <TextInput
                                style={styles.textInput}
                                placeholder="Password"
                                onChangeText={(password) => setPassword(password)}
                                autoCorrect={false}
                                secureTextEntry={true}
                            />
                            <TextInput
                                style={styles.textInput}
                                placeholder="Confirm Password"
                                onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                                autoCorrect={false}
                                secureTextEntry={true}
                            />
                        </View>
                        <View style={styles.Button_Container}>
                            {!isKeyboardVisible && <Custom_Button title='Register'
                                onPress={() => registerUser(firstName, lastName,
                                    course, year, yearLevel, semester,
                                    studentNumber, userName, email,
                                    password, confirmPassword)}
                            />}
                        </View>
                    </View>
                </Animated.View>
            </ScrollView >
        </KeyboardAwareScrollView>

    )
}

export default Registration

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ebeae8',
    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    picker: {
        height: 40,
        width: '100%',
        marginTop: 5,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    inputContainer: {
        flex: 1,
        marginHorizontal: 10,
    },
    textInput: {
        paddingTop: 20,
        paddingBottom: 10,
        width: 400,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginBottom: 10,
        textAlign: 'center',
    },
    textInput2: {
        paddingTop: 20,
        paddingBottom: 10,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginBottom: 10,
        textAlign: 'center',
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
    Button_Container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    }
});