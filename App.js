import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const initalBoard = [
  "", "", "",
  "", "", "",
  "", "", ""
]


export default function App() {
  const [turn, setTurn] = useState(1)
  const [win, setWin] = useState(false)
  const [board, setBoard] = useState(initalBoard)

  function checkWin() {
    let win = false;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      let a = board[winCondition[0]];
      let b = board[winCondition[1]];
      let c = board[winCondition[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        win = true;
        break
      }
    }
    return win
  }

  useEffect(() => {
    let isWin = checkWin()
    setWin(isWin)
    if (isWin) return
    setTurn(turn == 0 ? 1 : 0)
  }, [board])

  const play = (index) => {
    if (board[index] !== "" || win) return
    setBoard(board.map((cell, i) => {
      if (i == index) {
        cell = turn == 0 ? "X" : "O"
      }
      return cell
    }))

  }

  const restart = () => {
    setBoard(initalBoard)
    setTurn(1)
    setWin(false)
  }

  const cell = ({ item, index }) => (
    <Pressable onPress={() => play(index)} style={{ backgroundColor: "#d1dbeb", height: 120, width: 120, justifyContent: "center", margin: 3, borderRadius: 10 }}>
      <Text style={{ textAlign: 'center', fontSize: 33, fontWeight: 'bold' }}>{item}</Text>
    </Pressable>
  )

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <View style={{
        backgroundColor: "#A7C7E7",
        padding: 20
      }}>
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
          Player {turn + 1} is playing
        </Text>
      </View>

      <Text style={{ fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginTop: 10 }}>
        {win ? `Player ${turn + 1} won!` : ''}
      </Text>

      <View style={{ flex: 1, justifyContent: "center" }}>
        <FlatList
          contentContainerStyle={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          numColumns={3}
          keyExtractor={(item, i) => item + i}
          data={board}
          renderItem={cell}
        />
      </View>

      <Pressable style={{
        backgroundColor: '#A7C7E7',
        padding: 10
      }}>
        <Text style={{ textAlign: 'center', fontSize: 22 }} onPress={restart}>Restart</Text>
      </Pressable>
    </SafeAreaView>
  );
}
