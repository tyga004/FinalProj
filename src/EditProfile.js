import { View, StyleSheet, TextInput, Keyboard, Animated, Pressable, Image, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useState, useRef, useEffect } from 'react';
import Custom_Button from '../components/Custom_Button';
import { firebase } from '../config';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const EditProfile = () => {
    const navigation = useNavigation()
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [yearLevel, setYearLevel] = useState('');
    const [year, setYear] = useState('');
    const [course, setCourse] = useState('');
    const [semester, setSemester] = useState();

    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    const fadeAnime = useRef(new Animated.Value(0)).current;

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setSelectedImage(result.uri);
        }
    };

    editUser = async () => {
        try {
            const user = firebase.auth().currentUser;
            navigation.goBack();
            if (!user) {
                alert('User not authenticated.');
                return;
            }

            const yearString = String(year);
            const yearLevelString = String(yearLevel);
            const semesterString = String(semester);

            const updateData = {
                firstName,
                lastName,
                course,
                year: yearString,
                yearLevel: yearLevelString,
                semester: semesterString,
            };

            Object.keys(updateData).forEach((key) => updateData[key] === '' && delete updateData[key]);

            await firebase.firestore().collection('users').doc(user.uid).update(updateData);

            alert('Profile updated successfully');
        } catch (error) {
            alert(error.message);
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

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = firebase.auth().currentUser;

                if (user) {
                    const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
                    const userData = userDoc.data();

                    setFirstName(userData.firstName || '');
                    setLastName(userData.lastName || '');
                    setYearLevel(userData.yearLevel || '');
                    setSemester(userData.semester || '');
                    setYear(userData.year || '');
                    setCourse(userData.course || '');
                }
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };

        const authStateChangedListener = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                fetchUserData();
            }
        });

        return () => {
            authStateChangedListener();
        };
    }, []);

    return (
        <Animated.View style={{ flex: 1, opacity: fadeAnime }}>
            <View style={{ marginTop: 50 }}>
                <View style={styles.container2}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput2}
                            placeholder="First Name"
                            value={firstName || ''}
                            onChangeText={(text) => setFirstName(text)}
                            autoCorrect={false}
                            autoCapitalize="characters"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput2}
                            placeholder="Last Name"
                            value={lastName || ''}
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
                            value={course || ''}
                            onChangeText={(course) => setCourse(course)}
                            autoCorrect={false}
                            autoCapitalize="characters"
                        />
                    </View>
                </View>
            </View>
            <View style={styles.Button_Container}>
                {!isKeyboardVisible && <Custom_Button title='Update Profile'
                    onPress={() => editUser(firstName, lastName,
                        course, year, yearLevel, semester)}
                />}
            </View>

        </Animated.View>

    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50,
        paddingHorizontal: 20,
        backgroundColor: '#ebeae8',
    },
    Image: {
        flex: 1,
    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        width: '100%',
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
    picker: {
        height: 40,
        width: '100%',
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginBottom: 20,
    },
    inputContainer: {
        flex: 1,
        marginHorizontal: 10,
    },
    textInput: {
        paddingTop: 20,
        paddingBottom: 10,
        width: '100%',
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginBottom: 20,
        textAlign: 'center',
    },
    textInput2: {
        paddingTop: 20,
        paddingBottom: 10,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginBottom: 20,
        textAlign: 'center',
        width: '100%',
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
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
});
