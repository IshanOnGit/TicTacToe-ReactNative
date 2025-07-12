// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */
import React, { useState } from 'react';
import {
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  View,
  Pressable,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Icons from './Components/icons';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

// Main game logic UI
function MainApp() {
  const insets = useSafeAreaInsets();

  const [isCross, setIsCross] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<string>('');
  const [gameState, setGameState] = useState(new Array(9).fill('empty'));

  const reloadGame = () => {
    setIsCross(false);
    setGameWinner('');
    setGameState(new Array(9).fill('empty'));
  };

  const checkIsWinner = () => {
    // Rows
    if (
      gameState[0] === gameState[1] &&
      gameState[1] === gameState[2] &&
      gameState[0] !== 'empty'
    ) {
      setGameWinner(`${gameState[0]} won the game! 😎🤩`);
    } else if (
      gameState[3] === gameState[4] &&
      gameState[4] === gameState[5] &&
      gameState[3] !== 'empty'
    ) {
      setGameWinner(`${gameState[3]} won the game! 😎🤩`);
    } else if (
      gameState[6] === gameState[7] &&
      gameState[7] === gameState[8] &&
      gameState[6] !== 'empty'
    ) {
      setGameWinner(`${gameState[6]} won the game! 😎🤩`);
    }
    // Columns
    else if (
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6] &&
      gameState[0] !== 'empty'
    ) {
      setGameWinner(`${gameState[0]} won the game! 😎🤩`);
    } else if (
      gameState[1] === gameState[4] &&
      gameState[4] === gameState[7] &&
      gameState[1] !== 'empty'
    ) {
      setGameWinner(`${gameState[1]} won the game! 😎🤩`);
    } else if (
      gameState[2] === gameState[5] &&
      gameState[5] === gameState[8] &&
      gameState[2] !== 'empty'
    ) {
      setGameWinner(`${gameState[2]} won the game! 😎🤩`);
    }
    // Diagonals
    else if (
      gameState[0] === gameState[4] &&
      gameState[4] === gameState[8] &&
      gameState[0] !== 'empty'
    ) {
      setGameWinner(`${gameState[0]} won the game! 😎🤩`);
    } else if (
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6] &&
      gameState[2] !== 'empty'
    ) {
      setGameWinner(`${gameState[2]} won the game! 😎🤩`);
    }
    // Draw
    else if (!gameState.includes('empty')) {
      setGameWinner('Game Draw....⏳⏳⏳');
    }
  };

  const onChangeItem = (itemNumber: number) => {
    if (gameWinner) {
      return Snackbar.show({
        text: gameWinner,
        backgroundColor: '#000000',
        textColor: '#FFFFFF',
      });
    }

    if (gameState[itemNumber] === 'empty') {
      const newGameState = [...gameState];
      newGameState[itemNumber] = isCross ? 'cross' : 'circle';
      setGameState(newGameState);
      setIsCross(!isCross);
    } else {
      return Snackbar.show({
        text: 'Position is already filled',
        backgroundColor: 'red',
        textColor: '#FFFFFF',
      });
    }

    checkIsWinner();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom}]}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {gameWinner ? (
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          <Text style={styles.winnerTxt}>{gameWinner}</Text>
        </View>
      ) : (
        <View style={[styles.playerInfo, isCross ? styles.playerX : styles.playerO]}>
          <Text style={styles.gameTurnNext}>Player {isCross ? 'X' : 'O'}'s Turn</Text>
        </View>
      )}

      <FlatList
        numColumns={3}
        data={gameState}
        style={styles.grid}
        renderItem={({ item, index }) => (
          <Pressable key={index} style={styles.card} onPress={() => onChangeItem(index)}>
            <Icons name={item} />
          </Pressable>
        )}
      />

      <Pressable onPress={reloadGame}>
        <Text style={styles.gamebtn}>
          {gameWinner ? 'Start New Game' : 'Reload the Game'}
        </Text>
      </Pressable>
    </View>
  );
}

// Wrap with SafeAreaProvider
export default function App() {
  return (
    <SafeAreaProvider>
      <MainApp />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    backgroundColor: '#080334ff',

  },
  playerInfo: {
    marginTop: 40,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333333',
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  gameTurnNext: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#042c37ff',
  },
  playerO: {
    backgroundColor: '#3e060eff',
  },
  grid: {
    margin: 12,
  },
  card: {
    flex: 1,
    height: 100,
    width: '33.33%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  winnerInfo: {
    borderRadius: 6,
    backgroundColor: '#0a854aff',
    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gamebtn: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
    textAlign: 'center',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 35,
    marginTop: 10,
    marginBottom:20,
    backgroundColor: '#3629efff',
  },
});
