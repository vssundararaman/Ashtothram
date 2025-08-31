import React from 'react';
import { StyleSheet } from 'react-native';
import { PinchGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

export default function PinchZoomView({ children }) {
  const scale = useSharedValue(1);

  const pinchHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      scale.value = event.scale;
    },
    onEnd: () => {
      if (scale.value < 1) scale.value = 1;
      if (scale.value > 3) scale.value = 3;
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <PinchGestureHandler onGestureEvent={pinchHandler}>
      <Animated.View style={[styles.flex, animatedStyle]}>{children}</Animated.View>
    </PinchGestureHandler>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
