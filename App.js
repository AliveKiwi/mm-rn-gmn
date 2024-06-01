import { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import Colors from './constants/colors';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  // 59 Added userNumber to read from <StartGameScreen/> and pass on to <GameScreen/>
  const [userNumber, setUserNumber] = useState();

  // 66 variable to check gameIsOver
  const [gameIsOver, setGameIsOver] = useState(true);

  // 74 variable to keep track of number of Guess
  const [guessRounds, setGuessRounds] = useState(0);

  // 71 package expo-font
  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  // 71 If fonts not loaded
  if (!fontsLoaded) {
    // AppLoading is deprecated
    return <AppLoading />;
  }

  // 59 To read number from StartGameScreen
  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false); // 66 Setting gameIsOver to false on game starting
  }

  // 66 defined function to switch to GameOverScreen
  function GameOverHandler() {
    setGameIsOver(true);
  }

  // 74 function to reset restart game
  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
  }

  // 59 Logic to switch screen
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  // 59 Logic to switch screen
  // 65 passing userNumber as prop to GameScreen
  // 66 passing GameOverHandler as onGameOver prop
  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={GameOverHandler} />
    );
  }

  // 66 Checking when to switch to GameOverScreen
  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={startNewGameHandler}
      />
    );
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
