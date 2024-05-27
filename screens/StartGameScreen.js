import { useState } from 'react';
import { TextInput, View, StyleSheet, Alert } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import Colors from '../constants/colors';

// 59 destructuring prop onPickNumber
function StartGameScreen({ onPickNumber }) {
  // 57 declared number holder
  const [enteredNumber, setEnteredNumber] = useState('');

  // 57 function to set number
  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  // 58  reset number to empty string / initial state
  function resetInputHandler() {
    setEnteredNumber('');
  }

  // 58
  function confirmInputHandler() {
    const choosenNumber = parseInt(enteredNumber);

    if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99) {
      // SHOW ALERT ... alert(title,message,{behaviour})
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
      );
      return;
    }

    // 59 Passing the number to App screen
    onPickNumber(choosenNumber);
  }

  return (
    <View style={styles.inputContainer}>
      {/* 
      50 style and maxLength
      51 keyboardType, autoCapitalize 
      53 wrapped PrimaryButton in View, and added buttonsContainer & buttonContainer
      57 autoCorrect, onChangeText, value
      */}
      <TextInput
        style={styles.numberInput}
        maxLength={2}
        keyboardType="number-pad"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={numberInputHandler}
        value={enteredNumber}
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          {/* 58 added onPress*/}
          <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>
          {/* 57 added onPress*/}
          <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
        </View>
      </View>
    </View>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  // 49
  inputContainer: {
    justifyContent: 'center', // 53 To center TextInput
    alignItems: 'center', // 53 To center TextInput
    marginTop: 100,
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
  // 50
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center', // Align text to center of text box / TextInput
  },
  // 53
  buttonsContainer: {
    flexDirection: 'row', // Set buttons in rows
  },
  // 53
  buttonContainer: {
    flex: 1, // Make button expand to container
  },
});
