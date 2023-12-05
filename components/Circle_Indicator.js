import React from "react";
import { Component } from "react";
import { View, Animated, Easing, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class Circle_Indicator extends Component {
    constructor(props) {
        super(props);

        this.rotation = new Animated.Value(0);
    }

    componentDidMount() {
        this.animateRotation();
    }

    animateRotation() {
        this.rotation.setValue(0);
          Animated.timing(this.rotation, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }).start(() => this.animateRotation());
    }
    
    render() {
        const spin = this.rotation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        });
    
        return (
          <View style={styles.container}>
            <Animated.View style={[styles.circle, { transform: [{ rotate: spin }] }]} />
          </View>
        );
      }
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        circle: {
          width: 60,
          height: 60,
          borderRadius: 60,
          borderWidth: 4,
          borderColor: 'yellow', // Change the color as needed
          borderStyle: 'solid',
          borderTopColor: 'transparent',
          marginHorizontal: 10,
        },
      });

export default Circle_Indicator;    