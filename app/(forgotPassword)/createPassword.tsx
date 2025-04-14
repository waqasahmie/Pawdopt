import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, 
  Keyboard, TouchableWithoutFeedback, StatusBar, StyleSheet, KeyboardAvoidingView, Platform 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from "expo-router";

export default function SignupCreatePassword() {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (text: React.SetStateAction<string>) => setPassword(text);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const isValidPassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const dismissKeyboard = () => Keyboard.dismiss();

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.innerContainer}>
          <StatusBar barStyle="dark-content" />

          {/* Back Button */}
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex: 10 }}>
              <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
            </TouchableOpacity>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={styles.emptyHalf} />
            <View style={styles.progressBar} />
          </View>


          {/* Title */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>Create your password.</Text>
            <Text style={styles.passwordHint}>
              Must be at least 8 characters, with one uppercase, one lowercase, one number, and one special character.
            </Text>
          </View>

          {/* Password Input Field */}
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
            <Text style={styles.errorText}>Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.</Text>
          )}

          {/* Terms & Conditions */}
          <Text style={[styles.subsubtitle, !isValidPassword(password) && styles.subsubtitleWithError]}>
            By continuing, you agree to our <Text style={styles.linkText}>Terms of Service</Text> and <Text style={styles.linkText}>Privacy Policy</Text>.
          </Text>

          {/* Continue Button Fixed at Bottom */}
          <View style={styles.bottomContainer}>
            <TouchableOpacity 
              style={[
                styles.continueButton, 
                !isValidPassword(password) && styles.disabledButton
              ]} 
              disabled={!isValidPassword(password)}
              onPress={() => router.push("/(finalSteps)/rbac")}
            >
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
          </View>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    marginTop: Platform.OS === "ios" ? 50 : 20,
  },
  progressBarContainer: {
    flexDirection: "row", // new
    width: "97%",
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    marginTop: 30,
    overflow: "hidden", // Ensures the border radius is applied correctly
  },
  emptyHalf: {
    width: "50%",
    height: "100%",
    backgroundColor: "transparent", // Keeps the first half empty
  },
  progressBar: {
    width: "50%",
    height: "100%",
    backgroundColor: "#2BBFFF", // Second half blue
    borderRadius: 2,
  },
  textContainer: {
    width: "100%",
    marginTop: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "500",
    color: "#000",
    marginBottom: 10,
  },
  passwordHint: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
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
  eyeIcon: {
    padding: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
    textAlign: "left",
    width: "100%",
  },
  subsubtitle: {
    fontSize: 14,
    color: "#000",
    marginTop: 10,
  },
  subsubtitleWithError: {
    marginTop: 5,
  },
  linkText: {
    color: "#2BBFFF",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 40, // Change to 50 if needed
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