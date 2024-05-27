import { StyleSheet, View, Text, Pressable } from 'react-native';

// 63 importing color from constants
import Colors from '../../constants/colors';

// 57 onPress name is user given in PrimaryButton declaration
function PrimaryButton({ children, onPress }) {
  // onPress directly passed to onPress
  // function pressHandler() {
  //   onPress();
  // }

  return (
    <View style={styles.buttonOuterContainer}>
      {/*
       * 52
       * The function would be called automatically whenever the button is pressed
       * const { pressed } = pressData
       * All the style ={[]} passed in array is applied to componenet
       *
       * 57
       * onPress={onPress}
       * onPress on left is prebuilt attribute
       * onPress on right is user defined prop name
       */}
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        // 63 replaced #hex code with Colors variable
        android_ripple={{ color: Colors.primary600 }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  // 52
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden', // It will ensure if any effect from inside the container goes outside of container, then it will clip the effect
  },
  // 52
  buttonInnerContainer: {
    backgroundColor: Colors.primary500, // 63 replaced #hex code by Colors variable
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2, // Works only in android
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  // 52 For effect in iOS
  pressed: { opacity: 0.75 },
});
