import { useState } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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
  if (userNumber) {
    screen = <GameScreen />;
  }

  return (
    // 55 Use npx expo install install expo-linear-gradient to ensure compatibility of package with SDK
    <LinearGradient colors={['#ddb52f', '#4e0329']} style={styles.rootScreen}>
      {/* 56 ImageBackground
       * 59 changed from <StartGameScreen/> to {screen}
       */}
      <ImageBackground
        source={require('./assets/images/background.png')}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        {screen}
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
