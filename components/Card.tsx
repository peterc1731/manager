import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {trigger} from 'react-native-haptic-feedback';
import Animated, {
  SharedValue,
  runOnJS,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface Props {
  title: string;
  selected: SharedValue<number | null>;
  index: number;
}

function Card({title, selected, index}: Props) {
  const tapGesture = Gesture.Tap()
    .maxDistance(5)
    .onEnd(() => {
      runOnJS(trigger)('selection');
      selected.value = selected.value === index ? null : index;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    marginTop: withSpring(selected.value === index ? -500 : -700, {
      mass: 0.8,
      damping: 18,
      stiffness: 200,
    }),
  }));

  return (
    <>
      <GestureDetector gesture={tapGesture}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </GestureDetector>
      <Animated.View style={animatedStyles} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 800,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#fae8cf',
    padding: 24,
    shadowColor: '#914d11',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowRadius: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '500',
    color: '#09014a',
  },
});

export default Card;
