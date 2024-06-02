// 64 When component was created

import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Colors from '../../constants/colors';

function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

export default NumberContainer;

// screen = width and height including statusbar
// window = width and height without statusbar

const deviceWidth = Dimensions.get('window').width;

console.log(deviceWidth);

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding: deviceWidth < 380 ? 12 : 24,
    margin: deviceWidth < 380 ? 12 : 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    fontFamily: 'open-sans-bold', // 71 custom font using useFonts({}) hook
    color: Colors.accent500,
    fontSize: deviceWidth < 380 ? 28 : 36,
    // fontWeight: 'bold',
  },
});
