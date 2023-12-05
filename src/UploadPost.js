import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Image, Animated, Keyboard, Alert, StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import Custom_Button from '../components/Custom_Button';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/compat';
const UploadPost = () => {
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
    const [pickedImage, setPickedImage] = useState();
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const [userName, setUsername] = useState('');
    const [post, setPost] = useState();
    const navigation = useNavigation();

    const uploadpost = async () => {
        try {
            if (!post) {
                alert('There is no content to share.');
                return;
            }
            const userSnapshot = await firebase
                .firestore()
                .collection('users')
                .where('userName', '==', userName)
                .get();

            if (userSnapshot.empty) {
                alert('The provided username is invalid.');
            }

            else {
                const userId = userSnapshot.docs[0].id;

                await firebase.firestore().collection('users').doc(userId).update({
                    post,
                });

                alert('The post will undergo a review process prior to being published.');
                navigation.goBack();

            }
        } catch (error) {
            alert(error);
        }
    };
    const fadeAnime = useRef(new Animated.Value(0)).current;

    async function verifyPermission() {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        return true;
    }

    const camerapressHandler = async () => {
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
            return;
        }
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });
        setPickedImage(image.assets);
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
        <View style={styles.Container}>
            <View style={styles.InputWrapper}>
                <View style={styles.InputBox}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Username"
                        onChangeText={(userName) => setUsername(userName)}
                        autoCorrect={false}
                    />
                </View>
                {pickedImage && (
                    <View style={styles.imagepreviewcontainer}>
                        <Image source={{ uri: pickedImage[0].uri }} style={styles.imageStyle} />
                    </View>
                )}
                <TextInput
                    style={styles.InputField}
                    placeholder="What to post?"
                    onChangeText={(post) => setPost(post)}
                    multiline
                    numberOfLines={4}
                />
                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor="#9b59b6" title="Take Photo" onPress={camerapressHandler}>
                        <Icon name="camera-outline" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
                <View style={styles.Button_Container}>
                    {!isKeyboardVisible && (
                        <Custom_Button title="Post" onPress={() => uploadpost(post, pickedImage)} />
                    )}
                </View>
            </View>
        </View>
    );
};

export default UploadPost;

const styles = StyleSheet.create({
    imagepreviewcontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 200,
        backgroundColor: '#f0cced',
        marginVertical: 8,
        borderRadius: 8,
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
    Button_Container: {
        marginTop: 30,
        width: '60%',
        alignItems: 'center',
    },
    previewText: {
        color: '#592454',
    },
    imageStyle: {
        width: '100%',
        height: '100%',
    },
    Container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    InputWrapper: {
        flex: 1,
        marginTop: 30,
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#2e64e515',
    },
    InputField: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        textAlign: 'center',
        width: '90%'
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
})