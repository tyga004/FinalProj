import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Custom_Button = ({ title, onPress }) => {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };
 
  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#FFCA10', // Custom background color
      paddingVertical: 10, // Vertical padding
      paddingHorizontal: 10, // Horizontal padding
      borderRadius: 50, // Border radius
      alignSelf: 'center',
      width: '70%',
    },
    buttonText: {
      color: 'white', // Text color
      fontSize: hp(3), // Text size
      fontWeight: 'bold',
      textAlign: 'center', // Text alignment
      fontFamily: 'monospace',
    },
  });

  export default Custom_Button;