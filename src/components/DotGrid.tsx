import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { colors } from '../theme';

const GRID_SIZE = 20; // Space between dots
const DOT_SIZE = 2;

export const DotGrid = () => {
  const { width, height } = Dimensions.get('window');
  const rows = Math.ceil(height / GRID_SIZE);
  const cols = Math.ceil(width / GRID_SIZE);
  const dots = useRef<Animated.Value[][]>([]).current;

  // Initialize dots animation values
  useEffect(() => {
    for (let i = 0; i < rows; i++) {
      dots[i] = [];
      for (let j = 0; j < cols; j++) {
        dots[i][j] = new Animated.Value(0);
      }
    }
    startRandomAnimations();
  }, []);

  const animateDot = (row: number, col: number) => {
    Animated.sequence([
      Animated.timing(dots[row][col], {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(dots[row][col], {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const startRandomAnimations = () => {
    setInterval(() => {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      animateDot(row, col);
    }, 100);
  };

  return (
    <View style={styles.container}>
      {Array(rows).fill(0).map((_, i) => (
        <View key={i} style={styles.row}>
          {Array(cols).fill(0).map((_, j) => (
            <Animated.View
              key={`${i}-${j}`}
              style={[
                styles.dot,
                {
                  opacity: dots[i]?.[j] || 0,
                  transform: [{
                    scale: (dots[i]?.[j] || new Animated.Value(0)).interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.5],
                    }),
                  }],
                },
              ]}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: GRID_SIZE / 2,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: colors.textTertiary,
    marginHorizontal: GRID_SIZE / 2,
  },
}); 