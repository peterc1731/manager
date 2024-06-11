import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Card from './components/Card';
import Animated, {
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useSharedValue,
} from 'react-native-reanimated';

interface Task {
  title: string;
}

const tasks: Task[] = [
  {
    title: 'This is the first task title',
  },
  {
    title:
      'A different task title that maybe flows onto some more lines than the first one',
  },
  {
    title: 'Third task',
  },
  {
    title: 'This is a task title',
  },
  {
    title:
      'A different task title that maybe flows onto some more lines than the first one',
  },
  {
    title: 'Third task',
  },
  {
    title: 'This is a task title',
  },
  {
    title:
      'A different task title that maybe flows onto some more lines than the first one',
  },
  {
    title: 'Third task',
  },
];

function App() {
  const selected = useSharedValue<number | null>(null);
  const listRef = useAnimatedRef<FlatList<Task>>();

  useAnimatedReaction(
    () => {
      return selected.value;
    },
    (currentValue, previousValue) => {
      if (
        tasks.length > 5 &&
        currentValue !== previousValue &&
        currentValue !== null
      ) {
        scrollTo(listRef, 0, (currentValue - 1) * 100, true);
      }
    },
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <Animated.FlatList<Task>
        ref={listRef}
        data={tasks}
        renderItem={({item, index}) => (
          <Card title={item.title} index={index} selected={selected} />
        )}
        ListHeaderComponent={() => (
          <>
            <Text style={styles.title}>Tasks</Text>
            <View style={styles.header} />
          </>
        )}
        ListFooterComponent={() => <View style={{marginBottom: 200}} />}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    fontSize: 44,
    fontWeight: '700',
    marginTop: 64,
    marginLeft: 16,
  },
  header: {
    marginTop: 32,
  },
});

export default App;
