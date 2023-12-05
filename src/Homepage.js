import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity, View, Text, Image, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';

const Homepage = () => {
    const navigation = useNavigation();

    const feed = [
        {
            id: '1',
            userName: 'Jenny Doe',
            userImg: require('./../assets/users/user-1.jpg'),
            postTime: '4 mins ago',
            post:
                'Looking for my tumbler',
            postImg: require('./../assets/posts/post-img-3.png'),
        },
        {
            id: '2',
            userName: 'John Doe',
            userImg: require('./../assets/users/user-2.jpg'),
            postTime: '2 hours ago',
            post:
                'I lost my wallet in Room 5213, did anyone see it?',
            postImg: 'none',
        },
        {
            id: '3',
            userName: 'Ken William',
            userImg: require('./../assets/users/user-3.jpg'),
            postTime: '1 hours ago',
            post:
                'I found a cellphone in congressional area.',
            postImg: require('./../assets/posts/post-img-2.png'),
        },
        {
            id: '4',
            userName: 'Selina Paul',
            userImg: require('./../assets/users/user-4.jpg'),
            postTime: '1 day ago',
            post:
                'Found a beep card',
            postImg: require('./../assets/posts/post-img-4.png'),
        },
        {
            id: '5',
            userName: 'Christy Alex',
            userImg: require('./../assets/users/user-5.jpg'),
            postTime: '2 days ago',
            post:
                'I lost my wallet',
            postImg: 'none',
        },
    ];

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.UserInfo}>
                <Image style={styles.UserImg} source={item.userImg} />
                <View style={styles.userInfotext}>
                    <Text style={styles.userName}>{item.userName}</Text>
                    <Text style={styles.postTime}>{item.postTime}</Text>
                </View>
            </View>
            <Text style={styles.postText}>{item.post}</Text>
            {item.postImg !== 'none' ? (
                <Image style={styles.postImg} source={item.postImg} />
            ) : (
                <View style={styles.Divider}></View>
            )}
            <View style={styles.InteractionWrapper}>
                <TouchableOpacity style={styles.interaction} onPress={() => navigation.navigate('GoClaim')}>
                    <Image
                        style={styles.Info_Logo}
                        source={require('./../assets/claim.png')}
                    />
                    <Text>Claim</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.interaction} onPress={() => navigation.navigate('SendReport')}>
                    <Image
                        style={styles.Info_Logo}
                        source={require('./../assets/report.png')}
                    />
                    <Text>Report</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.Container}>
            <View style={styles.feedcontainer}>
                <FlatList
                    data={feed}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                />
            </View>


            <View style={styles.Navigation}>
                <View style={styles.Icon_Container}>
                    <TouchableOpacity><Image source={require('./../assets/Home_nobg.gif')} style={styles.Icons} /></TouchableOpacity>
                    <Text>Home</Text>
                </View>
                <View style={styles.Icon_Container}>
                    <TouchableOpacity onPress={() => navigation.navigate('UploadPost')}>
                        <Image source={require('./../assets/square-plus.png')} style={styles.Logout} />
                    </TouchableOpacity>
                    <Text>Upload</Text>
                </View>
                <View style={styles.Icon_Container}>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <Image source={require('./../assets/profile_nobg.gif')} style={styles.Icons} />
                    </TouchableOpacity>
                    <Text>Profile</Text>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    feedcontainer: {
        alignItems: 'center',
        padding: 20,
        height: '85%'
    },
    Divider: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        width: '90%',
        alignSelf: 'center',
        marginTop: 15
    },
    card: {
        backgroundColor: '#f8f8f8',
        width: '100%',
        marginBottom: 20,
        borderRadius: 10
    },
    UserInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 15
    },
    UserImg: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    userName: {
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontFamily: 'sans-serif-light'
    },
    userInfotext: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10,
    },
    postTime: {
        fontSize: 12,
        fontFamily: 'monospace',
        color: '#666'
    },
    postText: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium',
        paddingLeft: 15,
        paddingRight: 15
    },
    postImg: {
        width: '100%',
        height: 250,
        marginTop: 15
    },
    InteractionWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15
    },
    interaction: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 5,
    },
    interactionText: {
        fontSize: 12,
        fontFamily: 'sans-serif-medium',
        fontWeight: 'bold',
        color: '#333',
        marginTop: 5,
        marginLeft: 5
    },
    Container: {
        flex: 1,
        backgroundColor: '#ebeae8',
    },
    Content_Container: {
        marginHorizontal: 20,
    },

    text: {
        fontSize: 2,
        color: '#333333'
    },
    Info_Logo: {
        height: hp(3),
        width: wp(10),
        resizeMode: 'contain'
    },
    Header: {
        height: hp(10),
        width: '100%',
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFCA10'
    },
    Logo: {
        height: hp(8),
        width: wp(17),
        resizeMode: 'contain',
    },
    Company_Name: {
        height: hp(10),
        width: wp(73),
        resizeMode: 'contain',
    },
    Title: {
        backgroundColor: 'pink',
        marginVertical: 3,
        fontSize: hp(2.5),
        fontFamily: 'monospace',
        alignItems: 'center',
        justifyContent: 'center'
    },
    Content: {
        flex: 2,
        position: 'absolute',
        backgroundColor: 'tomato',
        height: '100%'
    },
    Navigation: {
        width: '100%',
        height: hp(10),
        backgroundColor: '#FFCA10',
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        bottom: 0,
    },
    Icons: {
        height: hp(7),
        width: wp(15),
        resizeMode: 'contain',
    },
    Logout: {
        height: hp(6),
        width: wp(15),
        resizeMode: 'contain',
        paddingBottom: 5,
    },
    Icon_Container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    ModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ModalContent: {
        backgroundColor: '#FFCA10',
        padding: 10,
        borderRadius: 10,
        width: wp(70),
        alignItems: 'center',
    },
    ModalText: {
        textAlign: 'center',
        fontSize: hp(2)
    }
})

export default Homepage;