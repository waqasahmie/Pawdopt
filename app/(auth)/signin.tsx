import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  BackHandler,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import { useCallback, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { useSSO } from "@clerk/clerk-expo";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { useAuth } from "@clerk/clerk-expo";
import { useClerk } from "@clerk/clerk-react";
import responsive from "@/constants/Responsive";
import Toast from "@/components/utils/toast";
import { useAppContext } from "../../hooks/AppContext";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
  const { setTempEmail, setTempPhone } = useAppContext();
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation();
  const dismissKeyboard = () => Keyboard.dismiss();
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const { startSSOFlow } = useSSO();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { client } = useClerk();
  const [loading, setLoading] = useState(false);
  const toastRef = useRef<any>({});
  useWarmUpBrowser();
  


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


  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showKeyboard = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideKeyboard = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showKeyboard.remove();
      hideKeyboard.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.innerContainer}>
          <StatusBar barStyle="dark-content" />

          {/* Back Button (Positioned Below Status Bar) */}
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => router.replace("/(onboarding)/getStarted")}
              style={{ zIndex: 10 }}
            >
              <MaterialIcons
                name="arrow-back-ios-new"
                size={16}
                color="black"
              />
            </TouchableOpacity>
          </View>

          {/* Logo Icon */}
          <Image
            source={require("../../assets/images/paw.png")}
            style={styles.pawIcon}
          />

          {/* Welcome Text */}
          <View style={styles.textContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>Welcome Back!</Text>
              <Image
                source={require("../../assets/images/paws.png")}
                style={styles.paws}
              />
            </View>
            <Text style={styles.subtitle}>
              A world of furry possibilities awaits you.
            </Text>
          </View>

          {/* Input Fields */}
          <TextInput
            placeholder="Email or Phone number"
            style={styles.input}
            placeholderTextColor="#939393"
            autoCapitalize="none"
            value={emailAddress}
            onChangeText={setEmailAddress}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#939393"
            value={password}
            onChangeText={setPassword}
          />

          <View style={{ width: "90%", alignItems: "flex-end" }}>
            <TouchableOpacity
              onPress={() => {
                if (!emailAddress) {
                  toastRef.current.show({
                    type: "error",
                    title: "Input Required",
                    description: "Please enter your email.",
                  });
                  return;
                }

                if (!checked) {
                  toastRef.current.show({
                    type: "error",
                    title: "Action Required",
                    description: "Please agree to the Terms & Conditions.",
                  });
                  return;
                }

                router.push("/forgotPassword");
              }}
            >
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Terms & Conditions Checkbox */}
          <View style={styles.termsContainer}>
            <TouchableOpacity
              style={[styles.checkbox, checked && styles.checkedBox]}
              onPress={() => setChecked(!checked)}
            >
              {checked ? (
                <Feather name="check" size={16} color="white" />
              ) : null}
            </TouchableOpacity>
            <Text style={styles.termsText}>
              I agree to Pawdopt{" "}
              <Text style={styles.linkText}>Terms & Conditions</Text>
            </Text>
          </View>

          {/* Sign Up Link */}
          <Text style={styles.signupText}>
            Don’t have an account? <Text style={styles.linkText} onPress={() => router.push("/signup")}>Sign up</Text>
          </Text>
          {/* Social Logins */}

          <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>
              {"   "} or {"   "}
            </Text>
            <View style={styles.line} />
          </View>

          {/* Social Buttons */}
          {!isKeyboardVisible && (
            <View style={styles.bottomContainer}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={onPressGoogle}
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

              {/* Continue Button */}
              <TouchableOpacity
                style={styles.continueButton}
                onPress={async () => {
                  if (!emailAddress || !password) {
                    toastRef.current.show({
                      type: "error",
                      title: "Input Required",
                      description: "Please enter your email and password.",
                    });
                    return;
                  }
                
                  if (!checked) {
                    toastRef.current.show({
                      type: "error",
                      title: "Action Required",
                      description: "Please agree to the Terms & Conditions.",
                    });
                    return;
                  }
                
                  if (!isLoaded) return;
                  setLoading(true);
                
                  try {
                    const signInAttempt = await signIn.create({
                      identifier: emailAddress,
                      password,
                    });
                
                    if (signInAttempt.status === "complete") {
                      const sessionId = signInAttempt.createdSessionId;
                      const session = client.sessions.find((s) => s.id === sessionId);
                
                      const userId = session?.user?.id;
                      if (!userId) throw new Error("User session not found");
                
                      const userDocRef = doc(db, "users", userId);
                      const userSnap = await getDoc(userDocRef);
                
                      if (!userSnap.exists()) {
                        throw new Error("User document not found");
                      }
                
                      const role = userSnap.data().role;
                
                      await setActive({ session: sessionId });
                
                      if (role === "vet") {
                        router.replace("/(vetTabs)");
                      } else {
                        router.replace("/(tabs)");
                      }
                    }
                  } catch (err) {
                    toastRef.current.show({
                      type: "error",
                      title: "Signin Failed",
                      description: "Incorrect email or password.",
                    });
                    setLoading(false);
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                <Text style={styles.continueText}>
                  {" "}
                  {loading ? "Loading..." : "Continue"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
      <Toast ref={toastRef} />
    </View>
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
    paddingHorizontal: 20,
 
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: Platform.OS === "ios" ? 70 : 20,
  },
  pawIcon: {
    width: 61,
    height: 63,
    marginBottom: 10,
    marginTop: 25,
  },
  textContainer: {
    alignSelf: "flex-start",
    width: "100%",
    paddingHorizontal: 15,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(29) : responsive.fontSize(23),
    fontWeight: "600",
    color: "#000",
    marginTop: 20,
    marginBottom: 10,
  },
  paws: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginBottom: 15,
  },
  subtitle: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    color: "#939393",
    marginBottom: 20,
  },
  input: {
    width: "90%",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#d3d3d3",
    marginBottom: 5,
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
  },
  forgotPassword: {
    color: "#2BBFFF",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(10),
    marginBottom: 10,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    marginBottom: 10,
    marginLeft: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#2BBFFF",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  checkedBox: {
    backgroundColor: "#2BBFFF",
    borderColor: "#2BBFFF",
  },
  termsText: {
    color: "#000",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
  },
  linkText: {
    color: "#2BBFFF",
  },
  signupText: {
    color: "#000",
    marginTop: 30,
    marginBottom: 30,
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#d3d3d3",
  },
  orText: {
    color: "#939393",
    marginVertical: 10,
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
    marginVertical: 5,
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 4, 
    elevation: 3, // For Android shadow
  },
  socialText: {
    marginLeft: 10,
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
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
  bottomContainer: {
    position: "absolute",
    bottom: 50,
    width: "100%",
  },
  continueButton: {
    backgroundColor: "#2BBFFF",
    width: "100%",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  continueText: {
    color: "#fff",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    fontWeight: "600",
  },
});
