// 62 When Component was created

import { StyleSheet, Text, Platform } from 'react-native';

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

console.log(Platform);

const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold', // 71 custom font using useFonts({}) hook
    fontSize: 24,
    // fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    // borderWidth: Platform.OS === 'android' ? 2 : 0,
    // borderWidth: Platform.select({ ios: 0, android: 2 }), // alternate to above
    borderWidth: 2,
    borderColor: 'white',
    padding: 12,
    maxWidth: '80%', // 81 width won't be greater than 300
    width: 300, // 81
  },
});
