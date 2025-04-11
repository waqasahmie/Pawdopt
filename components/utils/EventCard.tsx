import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Image, StyleSheet } from 'react-native';

export default function EventCard({ event }: { event: any }) {
  return (
    <View style={styles.cardContainer}>
      <Image source={event.image} style={styles.backgroundImage} />
      <BlurView intensity={3} style={styles.blurContainer}>
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.5)', 'rgba(0,0,0,0.8)']}
          style={StyleSheet.absoluteFill}
        />
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    borderRadius: 24, // rounded-3xl = 24px
  },
  backgroundImage: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  blurContainer: {
    height: 96, // h-24 = 96px
    width: '100%',
    justifyContent: 'center',
  },
  cardText: {
    textAlign: 'center',
    fontSize: 24, // text-2xl
    color: 'white',
  },
});