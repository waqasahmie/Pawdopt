import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, Image, StyleSheet, StatusBar, 
  Keyboard, TouchableWithoutFeedback,
  Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from "expo-router";
import Animated, { FadeOut } from "react-native-reanimated";
export default function NewPassword() {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);


  const handlePasswordChange = (text: React.SetStateAction<string>) => setPassword(text);
  const handleConfirmPasswordChange = (text: React.SetStateAction<string>) => setConfirmPassword(text);

  const passwordsMatch = password === confirmPassword && password.length > 0;

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const isValidPassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Handle keyboard dismiss on tap
  const dismissKeyboard = () => Keyboard.dismiss();

  return (
    <Animated.View style={styles.container} exiting={FadeOut}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.innerContainer}>
          <StatusBar barStyle="dark-content" />

          {/* Back Button */}
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex: 10 }}>
              <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
            </TouchableOpacity>
          </View>

          {/* Top Left Background Image */}
          <Image source={require("../../assets/images/PawprintT.png")} style={styles.topLeftImage} />

          {/* Bottom Right Background Image */}
          <Image source={require("../../assets/images/PawprintB.png")} style={styles.bottomRightImage} />

          {/* Logo Icon */}
          <Image source={require("../../assets/images/paw.png")} style={styles.pawIcon} />

          {/* Title & Subtitle */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>Secure Your Account</Text>
            <Text style={styles.subtitle}>Almost there! Create a new password for your Pawdopt account to keep it secure. Remember to choose a strong and unique password.</Text>
          </View>

          {/* New Password Input */}
          <View style={styles.textContainer}>
            <Text style={styles.inputHeader}>New Password</Text>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput 
              placeholder="Enter password"
              style={styles.input}
              placeholderTextColor="#939393"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={handlePasswordChange}
            />
            
           <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
             <MaterialIcons name={showPassword ? "visibility" : "visibility-off"} size={18} color="#939393" />
           </TouchableOpacity>
          </View>
          {/* Error Message */}
          {!isValidPassword(password) && password.length > 0 && (
            <Text style={styles.errorText}>Must Contain One Upper Case, Lower Case, Number & Special Character.</Text>
          )}

          {/* Confirm Password Input */}
          <View style={styles.textContainer}>
            <Text style={styles.inputHeader}>Confirm New Password</Text>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput 
              placeholder="Enter password"
              style={styles.input}
              placeholderTextColor="#939393"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              onBlur={() => setConfirmPasswordTouched(true)}
            />
            <TouchableOpacity onPress={toggleShowConfirmPassword} style={styles.eyeIcon}>
              <MaterialIcons name={showConfirmPassword ? "visibility" : "visibility-off"} size={18} color="#939393" />
            </TouchableOpacity>
          </View>
          {/* Error Message */}
          {!passwordsMatch && confirmPasswordTouched && password.length > 0 && (
            <Text style={styles.errorText}>Confirm Password does not match.</Text>
          )}

          {/* Continue Button */}
          <View style={styles.bottomContainer}>
            <TouchableOpacity style={[styles.continueButton, !passwordsMatch && styles.disabledButton]} disabled={!passwordsMatch} onPress={() => router.push('./resetSuccessfully')}>
              <Text style={styles.continueText}>Save New Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    paddingHorizontal: 20,
    paddingVertical: 50,
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
    marginTop: 25,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: Platform.OS === "ios" ? 0 : -20,
  },
  textContainer: {
    alignSelf: "flex-start",
    width: "100%",
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    color: "#000",
    marginTop: 10,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#939393",
    marginBottom: 20,
  },
  inputHeader: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "500",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#d3d3d3",
    marginBottom: 5,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 10,
    textAlign: "left",
    width: "100%",
  },
  eyeIcon: {
    padding: 10,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
  },
  continueButton: {
    backgroundColor: "#2BBFFF",
    width: "100%",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: "#E3E5E5",
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});