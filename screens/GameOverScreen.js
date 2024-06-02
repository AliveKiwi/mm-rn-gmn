import {
  Image,
  Text,
  StyleSheet,
  View,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import React from 'react';

import Title from '../components/ui/Title';
import PrimaryButton from '../components/ui/PrimaryButton';
import Colors from '../constants/colors';

function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {
  // 88
  const { width, height } = useWindowDimensions();

  let imageSize = 300;

  // 88
  if (width < 380) {
    imageSize = 150;
  }

  // 88
  if (height < 400) {
    imageSize = 80;
  }

  // 88
  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  return (
    // 88 added ScrollView and screen style
    <ScrollView style={styles.screen}>
      <View style={styles.rootContainer}>
        <Title>GAME OVER!</Title>
        {/* 88 */}
        <View style={[styles.imageContainer, imageStyle]}>
          <Image
            style={styles.image}
            source={require('../assets/images/success.png')}
          />
        </View>
        <Text style={styles.summaryText}>
          Your phone needed
          <Text style={styles.highlight}> {roundsNumber} </Text>
          rounds to guess the number
          <Text style={styles.highlight}> {userNumber} </Text>.
        </Text>
        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
      </View>
    </ScrollView>
  );
}

export default GameOverScreen;

// const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  // 88
  screen: {
    flex: 1,
  },

  // 72
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // 72
  imageContainer: {
    // width: deviceWidth < 380 ? 150 : 300, //88 commented
    // height: deviceWidth < 380 ? 150 : 300, //88 commented
    // borderRadius: deviceWidth < 380 ? 75 : 150, //88 commented
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: 'hidden',
    margin: 36,
  },

  // 72
  image: {
    width: '100%',
    height: '100%',
  },
  // 73
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  // 73
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary500,
  },
});
