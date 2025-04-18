import React, { useCallback, useEffect, useRef } from 'react';
import { useWindowDimensions, FlatList, ViewToken } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  scrollTo,
  runOnUI,
} from 'react-native-reanimated';
import { CarouselItem } from './carouselItem';

type CoverFlowCarouselProps = {
  images: string[];
};

const ITEM_WIDTH = 200;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<string>);

export const CoverFlowCarousel: React.FC<CoverFlowCarouselProps> = ({ images }) => {
  const flatListRef = useRef<FlatList<string>>(null);
  const { width: windowWidth } = useWindowDimensions();
  const paddingHorizontal = Math.round((windowWidth - ITEM_WIDTH) / 2.6);

  const data = [images[images.length - 1], ...images, images[0]];
  const initialIndex = 1;
  const initialOffset = initialIndex * ITEM_WIDTH;

  const scrollOffset = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.x;
    },
  });

  useEffect(() => {
    // Scroll to the first real item after the list mounts
    setTimeout(() => {
      flatListRef.current?.scrollToOffset({
        offset: initialOffset,
        animated: false,
      });
    }, 50);
  }, []);

  const onMomentumScrollEnd = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / ITEM_WIDTH);

    if (index === 0) {
      // Swiped to the clone at the start
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({
          offset: images.length * ITEM_WIDTH,
          animated: false,
        });
      }, 10);
    } else if (index === data.length - 1) {
      // Swiped to the clone at the end
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({
          offset: ITEM_WIDTH,
          animated: false,
        });
      }, 10);
    }
  };

  const renderItem = useCallback(
    ({ item, index }: { item: string; index: number }) => (
      <CarouselItem
        image={item}
        index={index}
        scrollOffset={scrollOffset}
        itemWidth={ITEM_WIDTH}
      />
    ),
    [scrollOffset]
  );

  return (
    <AnimatedFlatList
      ref={flatListRef}
      data={data}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      horizontal
      pagingEnabled
      snapToInterval={ITEM_WIDTH}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        alignItems: 'center',
        paddingHorizontal,
      }}
      onScroll={onScroll}
      scrollEventThrottle={16}
      onMomentumScrollEnd={onMomentumScrollEnd}
    />
  );
};