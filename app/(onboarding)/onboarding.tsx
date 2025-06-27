import { BlurView } from "expo-blur";
import { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, Platform, ActivityIndicator } from "react-native";
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  SlideInUp,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth, useUser } from "@clerk/clerk-expo";
import EventCard from "@/components/utils/EventCard";
import Marquee from "@/components/utils/Marquee";
import { useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import responsive from "@/constants/Responsive";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const events = [
  {
    id: 1,
    image: require("../../assets/images/onboardOne.jpeg"),
  },
  {
    id: 2,
    image: require("../../assets/images/onboardTwo.jpeg"),
  },
  {
    id: 3,
    image: require("../../assets/images/onboardThree.jpeg"),
  },
  {
    id: 4,
    image: require("../../assets/images/onboardFour.jpeg"),
  },
  {
    id: 5,
    image: require("../../assets/images/onboardFive.jpeg"),
  },
  {
    id: 6,
    image: require("../../assets/images/onboardSix.jpeg"),
  },
  {
    id: 7,
    image: require("../../assets/images/onboardSeven.jpeg"),
  },
  {
    id: 8,
    image: require("../../assets/images/onboardEight.jpeg"),
  },
];

export default function WelcomeScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const onButtonPress = () => {
    router.push("/getStarted");
  };
  useEffect(() => {
    const checkUserRoleAndRedirect = async () => {
      if (!isSignedIn || !user) return;

      try {
        const userId = user.id;
        const userDocRef = doc(db, "users", userId);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          const role = userData.role;

          if (role === "vet") {
            router.replace("/(vetTabs)");
          } else {
            router.replace("/(tabs)");
          }
        }
      } catch (error) {
      } 
    };

    checkUserRoleAndRedirect();
  }, [isSignedIn, user]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isLoaded) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#381700" />
      </View>
    );
  }
  if (isSignedIn) {
    return null; 
  }
  return (
    <Animated.View style={styles.container} exiting={FadeOut.duration(500)}>
      <Animated.Image
        key={events[activeIndex].image}
        source={events[activeIndex].image}
        style={styles.backgroundImage}
        resizeMode="cover"
        entering={FadeIn.duration(1000)}
        exiting={FadeOut.duration(1000)}
      />

      <View style={styles.overlay} />

      <BlurView intensity={70} style={styles.flex}>
        <SafeAreaView edges={["bottom"]} style={styles.flex}>
          <Animated.View
            style={styles.topContainer}
            entering={SlideInUp.springify().mass(1).damping(30)}
          >
            <Marquee
              items={events}
              renderItem={({ item }: { item: any }) => (
                <EventCard event={item} />
              )}
              onIndexChange={setActiveIndex}
            />
          </Animated.View>

          <View style={styles.bottomContainer}>
            <Animated.Text
              style={styles.subheading}
              entering={FadeInUp.springify().mass(1).damping(30).delay(500)}
            >
              Welcome to
            </Animated.Text>

            <Animated.Text
              style={styles.heading}
              entering={FadeIn.duration(500).delay(500)}
            >
              Pawdopt
            </Animated.Text>

            <Animated.Text
              style={styles.description}
              entering={FadeInUp.springify().mass(1).damping(30).delay(500)}
            >
              Embark on a heart warming journey to find your perfect companion.
              Explore, match, and open your heart to a new furry friend.
            </Animated.Text>

            <AnimatedPressable
              onPress={onButtonPress}
              style={styles.button}
              entering={FadeInUp.springify().mass(1).damping(30).delay(500)}
            >
              <Text style={styles.buttonText}>Let's Get Started</Text>
            </AnimatedPressable>
          </View>
        </SafeAreaView>
      </BlurView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3b1700trrr", 
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  flex: {
    flex: 1,
  },
  topContainer: {
    marginTop: 80, 
    height: "50%",
    width: "100%",
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 16,
    padding: 16,
  },
  subheading: {
    textAlign: "center",
    fontSize: Platform.OS === "ios" ? responsive.fontSize(19) : responsive.fontSize(16), 
    fontWeight: "bold",
    color: "rgba(255,255,255,0.6)",
  },
  heading: {
    textAlign: "center",
    fontSize: Platform.OS === "ios" ? responsive.fontSize(39) : responsive.fontSize(36),
    fontWeight: "bold",
    color: "white",
  },
  description: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: Platform.OS === "ios" ? responsive.fontSize(17) : responsive.fontSize(14), 
    color: "rgba(255,255,255,0.6)",
  },
  button: {
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 9999, 
  },
  buttonText: {
    fontSize: Platform.OS === "ios" ? responsive.fontSize(17) : responsive.fontSize(14), 
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', 
  },
  
});
