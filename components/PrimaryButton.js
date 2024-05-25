import { StyleSheet, View, Text, Pressable } from 'react-native';

function PrimaryButton({ children }) {
  function pressHandler() {
    console.log('Pressed');
  }

  return (
    <View style={styles.buttonOuterContainer}>
      {/*
       * 52
       * The function would be called automatically whenever the button is pressed
       * const { pressed } = pressData
       * All the style ={[]} passed in array is applied to componenet
       */}
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={pressHandler}
        android_ripple={{ color: '#640233' }}
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
    backgroundColor: '#72063c',
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
