import { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from './constants/colors';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';

export default function App() {
  // 59 Added userNumber to read from <StartGameScreen/> and pass on to <GameScreen/>
  const [userNumber, setUserNumber] = useState();

  // 59 To read number from StartGameScreen
  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
  }

  // 59 Logic to switch screen
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  // 59 Logic to switch screen
  // 65 passing userNumber as prop to GameScreen
  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} />;
  }

  return (
    // 55 Use npx expo install install expo-linear-gradient to ensure compatibility of package with SDK
    <LinearGradient
      colors={[Colors.primary500, Colors.accent500]}
      style={styles.rootScreen}
    >
      {/* 56 ImageBackground
       * 59 changed from <StartGameScreen/> to {screen}
       */}
      <ImageBackground
        source={require('./assets/images/background.png')}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        {/* 61 Added SafeAreaView to get content under notch, works for iOS
         */}
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: { opacity: 0.15 },
});
