/**
 * TimeRange Component
 *
 * A scrollable time selector component that displays time options in a vertical list.
 * Features smooth scrolling with snap points, gradient overlays, and time interpolation.
 *
 * @component
 * @example
 * tsx
 * <TimeRange
 *   dates={timeOptions}
 *   onDateChange={(dateMs) => handleTimeChange(dateMs)}
 * />
 * 
 */

import { format } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

/**
 * Props for the TimeRange component
 * @property {Date[]} dates - Array of Date objects representing available time slots
 * @property {(dateMs: number) => void} onDateChange - Callback function called when time selection changes
 */
type TimePickerProps = {
  dates: Date[];
  onDateChange?: (dateMs: number) => void;
};

// Constants for time range dimensions
const ITEM_HEIGHT = 30; // Height of each time item in pixels
const TimeRangeHeight = ITEM_HEIGHT * 4; // Total height of visible time range

export const TimeRange: React.FC<TimePickerProps> = ({
  dates,
  onDateChange,
}) => {
  // Convert dates to timestamps for interpolation
  const datesMs = useMemo(() => dates.map(date => date.getTime()), [dates]);

  // Format dates for display (e.g., "1:00 pm")
  const formattedDates = useMemo(
    () => dates.map(date => format(date, 'h:mm aaa').toLowerCase()),
    [dates],
  );

  /**
   * Renders individual time items in the list
   * @param {Object} param0 - Item data and index
   * @returns {JSX.Element} Rendered time item
   */
  const renderItem = useCallback(
    ({ item, index }: { item: string; index: number }) => (
      <View key={index} style={styles.timeItem}>
        <Text style={styles.timeText}>{item}</Text>
      </View>
    ),
    [],
  );

  /**
   * Handles scroll events and interpolates the selected time
   * Uses Reanimated worklet for smooth performance
   */
  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      const { contentOffset } = event;
      const index = Math.round(contentOffset.y / ITEM_HEIGHT);
      const safeIndex = Math.max(0, Math.min(index, datesMs.length - 1));
      const snappedDate = datesMs[safeIndex];
      onDateChange?.(snappedDate);
    },
  });
  

  return (
    <View style={styles.container}>
      {/* Scrollable time list with snap points */}

      {/* Gradient overlays for fade effect */}
      <Animated.FlatList
        onScroll={onScroll}
        nestedScrollEnabled={true}
        decelerationRate="fast"
        snapToAlignment="center"
        snapToOffsets={datesMs.map((_, i) => i * ITEM_HEIGHT)}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        style={{ width: 100 }}
        data={formattedDates}
        renderItem={renderItem}
        disableIntervalMomentum
      />
      <LinearGradient
        colors={['#fff', '#ffffff00']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.5 }}
        style={[styles.gradient, styles.bottomGradient]}
      />
      <LinearGradient
        colors={['#ffffff00', '#fff']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0, y: 1 }}
        style={[styles.gradient, styles.topGradient]}
      />
    </View>
  );
};

// Styles for the TimeRange component
const styles = StyleSheet.create({
  container: {
    height: TimeRangeHeight,
  },
  scrollViewContent: {
    paddingVertical: TimeRangeHeight / 2 - ITEM_HEIGHT / 2,
  },
  timeItem: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 20,
    color: '#000',
  },
  gradient: {
    pointerEvents: 'none',
    position: 'absolute',
    left: 0,
    right: 0,
    height: TimeRangeHeight,
    zIndex: 100,
  },
  bottomGradient: {
    bottom: 0,
  },
  topGradient: {
    top: 0,
  },
});