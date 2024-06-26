import { Dimensions, StyleSheet, View } from 'react-native';
import React from 'react';

import Colors from '../../constants/colors';

function Card({ children }) {
  return <View style={styles.inputContainer}>{children}</View>;
}

export default Card;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'center', // 53 To center TextInput
    alignItems: 'center', // 53 To center TextInput
    marginTop: deviceWidth < 380 ? 18 : 36,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    elevation: 4, // Android only concept
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});
