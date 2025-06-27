import React, { useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  Platform,
  BackHandler,
} from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";
import { router, useFocusEffect } from "expo-router";
import { useAppContext } from "@/hooks/AppContext";
import responsive from "@/constants/Responsive";
import { useSSO } from "@clerk/clerk-expo";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useClerk } from "@clerk/clerk-react";
import * as AuthSession from "expo-auth-session";

export default function GetStarted() {
  const { updateUserData } = useAppContext();
  const { setTempEmail, setTempPhone } = useAppContext();
  const { client } = useClerk();
  const { startSSOFlow } = useSSO();

  useFocusEffect(
    React.useCallback(() => {
      if (Platform.OS !== "android") return;

      const onBackPress = () => {
        BackHandler.exitApp();
        return true; 
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [])
  );

  const onPressGoogle = useCallback(async () => {
    try {
      const result = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: AuthSession.makeRedirectUri(),
      });

      const { createdSessionId, setActive, signUp, signIn } = result;

      if (!createdSessionId) {
        return;
      }

      await setActive!({ session: createdSessionId });

      // Get the active session from Clerk client
      const session = client.sessions.find((s) => s.id === createdSessionId);
      const userId = session?.user?.id;

      if (!userId) {
        return;
      }

      const email = signUp?.emailAddress || signIn?.identifier;

      if (email) {
        setTempEmail(email);
        setTempPhone("");
      }

      // Firestore check
      const userDocRef = doc(db, "users", userId);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        router.replace("/(finalSteps)/rbac");
        return;
      }

      const role = userSnap.data().role;

      if (role == "vet") {
        router.replace("/(vetTabs)");
      } else {
        router.replace("/(tabs)");
      }
    } catch (err) {
      console.error("Google SSO failed", JSON.stringify(err, null, 2));
    }
  }, []);
  return (
    <Animated.View style={styles.container} entering={FadeIn.duration(500)}>
      <View style={styles.innerContainer}>
        <StatusBar barStyle="dark-content" />

        {/* Top Left Background Image */}
        <Image
          source={require("../../assets/images/PawprintT.png")}
          style={styles.topLeftImage}
        />

        {/* Bottom Right Background Image */}
        <Image
          source={require("../../assets/images/PawprintB.png")}
          style={styles.bottomRightImage}
        />

        <Image
          source={require("../../assets/images/paw.png")}
          style={styles.pawIcon}
        />
        <Text style={styles.title}>Let’s Get Started!</Text>
        <Text style={styles.subtitle}>
          Join us and find your new furry friend!
        </Text>

        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome
            name="facebook"
            size={20}
            color="#1877F2"
            style={styles.socialIcon}
          />
          <Text style={styles.socialText}>Continue with Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <AntDesign
            name="twitter"
            size={20}
            color="#1DA1F2"
            style={styles.socialIcon}
          />
          <Text style={styles.socialText}>Continue with Twitter</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}  onPress={onPressGoogle}
        >
          <Image
            source={require("../../assets/images/google.png")}
            style={styles.googleIcon}
          />
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <AntDesign
            name="apple1"
            size={22}
            color="black"
            style={styles.socialIcon}
          />
          <Text style={styles.socialText}>Continue with Apple</Text>
        </TouchableOpacity>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => {
              updateUserData({
                animalType: null,
                backCNIC: "",
                cnicNumber: "",
                email: "",
                favoriteBreeds: [],
                firstName: "",
                frontCNIC: null,
                gender: "",
                lastName: "",
                phone: "",
                role: null,
                profilePicUrl: '',
                organizationName: "",
                longitude: 0,
                latitude: 0,
                address: "",
                callingCode: "",
                countryCode: ""
              }); //reset data
              router.push("/signup");
            }}
          >
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signinButton}
            onPress={() => {
              updateUserData({
                animalType: null,
                backCNIC: '',
                cnicNumber: '',
                email: '',
                favoriteBreeds: [],
                firstName: '',
                frontCNIC: null,
                gender: '',
                lastName: '',
                phone: '',
                role: null,
                profilePicUrl: '',
                organizationName: "",
                longitude: 0,
                latitude: 0,
                address: "",
                callingCode: "",
                countryCode: ""
              }); //reset data
              router.push("/signin"); 
            }}
          >
            <Text style={styles.signinText}>Sign in</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Privacy Policy</Text>
          <Text style={styles.footerText2}> - </Text>
          <Text style={styles.footerText}>Terms Of Services</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal:20,
    paddingVertical:50,
  },
  topLeftImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "90%",
    height: "40%",
    resizeMode: "contain",
  },
  bottomRightImage: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "96%",
    height: "49%",
    resizeMode: "contain",
  },
  pawIcon: {
    width: 61,
    height: 63,
    marginBottom: 10,
    marginTop: 55,
  },
  title: {
    fontSize: Platform.OS === "ios" ? responsive.fontSize(29): responsive.fontSize(26),
    fontWeight: "700",
    color: "#000",
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: Platform.OS === "ios" ? responsive.fontSize(15): responsive.fontSize(14),
    color: "#939393",
    marginBottom:20,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 90, 
    width: "100%",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    width: "100%",
    padding: 15,
    borderRadius: 30,
    marginBottom: 15,
    marginVertical:5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 4, 
    elevation: 3, // For Android shadow
  },
  socialText: {
    fontSize: Platform.OS === "ios" ? responsive.fontSize(15): responsive.fontSize(13),
    fontWeight: "600",
    color: "#000",
  },
  socialIcon: {
    position: "absolute",
    left: 20, 
  },
  googleIcon: {
    position: "absolute",
    left: 20,
    width: 20,
    height: 20,
  },
  signupButton: {
    backgroundColor: "#2BBFFF",
    width: "100%",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 30,
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.1,
    shadowRadius: 4, 
    elevation: 3, // For Android shadow
  },
  signupText: {
    color: "#fff",
    fontSize: Platform.OS === "ios" ? responsive.fontSize(15): responsive.fontSize(13),
    fontWeight: "600",
  },
  signinButton: {
    backgroundColor: "#F2FBFF",
    width: "100%",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.1,
    shadowRadius: 4, 
    elevation: 3, // For Android shadow
  },
  signinText: {
    color: "#2BBFFF",
    fontSize: Platform.OS === "ios" ? responsive.fontSize(15): responsive.fontSize(13),
    fontWeight: "600",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  footerText: {
    color: "#808080",
    fontSize: Platform.OS === "ios" ? responsive.fontSize(13): responsive.fontSize(10),
  },
  footerText2: {
    color: "#808080",
    marginHorizontal: 20,
  },
});
