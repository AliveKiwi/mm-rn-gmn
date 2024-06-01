// 68 the Card Component was added

import { Text, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

// 69 added style prop to implement/mimic cascading nature of CSS
// 69 the style on right in array will override the style on left
function InstructionText({ children, style }) {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
}

export default InstructionText;

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: 'open-sans', // 71 custom font using useFonts({}) hook
    color: Colors.accent500,
    fontSize: 24,
  },
});
