import { useState, useEffect } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Title from '../components/ui/Title';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import GuessLogItem from '../components/game/GuessLogItem';

// 65 Setting the initial state for RNG()
let minBoundary = 1;
let maxBoundary = 100;

// 64 Logic to generate random number
function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  // Ensures that the game don't guess number in first try
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else return rndNum;
}

// 64 userNumber prevent generation of user inputed number in first try
function GameScreen({ userNumber, onGameOver }) {
  // 64 setting initalGuess and currentGuess
  // 66 re-enabled
  const initialGuess = generateRandomBetween(1, 100, userNumber);

  // 65 replaced the static values from previous line
  // 66 commented
  // const initialGuess = generateRandomBetween(
  //   minBoundary,
  //   maxBoundary,
  //   userNumber
  // );

  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  // 75 keep track of number of guess
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  // 87
  const { width, height } = useWindowDimensions();

  // 66 Game Over logic when rng() guess correct user's number
  useEffect(() => {
    if (currentGuess === userNumber) {
      // 66 from App.js file
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  // 74 Reset when component rerender for first time
  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  // 64 defined nextGuessHandler
  function nextGuessHandler(direction) {
    // if check to prevent user from lying or misleading in game
    // Example if user input 10, RNG() guess 15, then user need to press lower(-)
    // Example if user input 10, RNG() guess 5, then user need to press greater(+)
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ]);
      return;
    }

    // 65 Updating the maxBoundary for next rng() function call
    if (direction === 'lower') {
      maxBoundary = currentGuess;
    }

    // 65 Updating the minBoundary for next rng() function call
    if (direction === 'greater') {
      minBoundary = currentGuess + 1; // + 1 so computer don't reguess same number
    }

    // 65 Updating currentGuess
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
  }

  const guessRoundsListLength = guessRounds.length;

  // 87 if in portrait mode then render this content
  let content = (
    <>
      {/* 64 Added NumberContainer */}
      <NumberContainer>{currentGuess}</NumberContainer>
      {/* 68 Replaced View with new Card Component */}
      <Card>
        {/* 68 Replaced Text with new InstructionText Component
         * Passing style as prop to InstructionText UC
         */}
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        {/* 65 Added + - Button
         * 69 added View and style to PrimaryButton
         */}
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              {/* 70 added @expo/vector-icons, is peer dependency of expo */}
              <Ionicons name="remove-outline" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
              {/* 70 added @expo/vector-icons, is peer dependency of expo */}
              <Ionicons name="add-outline" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  // 87 if in landscape mode then render this content
  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons name="remove-outline" size={24} color="white" />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <Ionicons name="add-outline" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      {/* 63 Added Title */}
      <Title>Opponent's Guess</Title>
      {content}
      {/* 75 <View>LOG ROUNDS</View> */}
      {/*
        {guessRounds.map((guessRound) => (
          <Text key={guessRound}>{guessRound}</Text>
        ))}
      */}
      <View style={styles.listContainer}>
        {/* 76 FlatList
         * 77 GuessLogItem
         */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            >
              {itemData.item}
            </GuessLogItem>
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 24,
    alignItems: 'center', // 81
  },

  instructionText: { marginBottom: 12 },

  // 69
  buttonsContainer: {
    flexDirection: 'row', // Set buttons in rows
  },

  // 69
  buttonContainer: {
    flex: 1, // Make button expand to container
  },

  // 87 for landscape mode
  buttonContainerWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // 78
  listContainer: {
    flex: 1,
    // padding:24 // 87 commented
    paddingTop: 4, // 87 adjustment for landscape mode
    paddingHorizontal: 24, // 87 adjustment for landscape mode
  },
});
