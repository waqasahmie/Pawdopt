import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";

export default function RBAC() {
  const navigation = useNavigation();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleSelection = (role: string) => {
    setSelectedRole(role); // Update selected role state
    
    if (role === "Veterinarian") {
    // Navigate to a different screen if the role is 'Veterinarian'
    router.push(`/(finalSteps)/vet?role=${role}`);
  } else {
    // Navigate to the default screen for other roles
    router.push(`/(finalSteps)/findMatch?role=${role}`);
  }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <StatusBar barStyle="dark-content" />

        {/* Back Button (Positioned Below Status Bar) */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ zIndex: 10 }}
          >
            <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
          </TouchableOpacity>

          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar} />
          </View>

          <Text style={{ fontSize: 16, color: "#939393" }}>1/4</Text>
        </View>

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

        {/* Welcome Text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Tell us about yourself</Text>
          <Text style={styles.subtitle}>
            Are you a pet owner or organization ready to find loving homes? or a
            pet adopter looking for a new best friend? or are you a veterinarian
            dedicated to ensuring the health and well-being of pets?
          </Text>
        </View>

        {/* Role Buttons */}
        <TouchableOpacity style={styles.roleButton} onPress={() => handleRoleSelection("Adopter")}>
          <Text style={styles.roleText}>Pet Adopter</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.roleButton} onPress={() => handleRoleSelection("Owner")}>
          <Text style={styles.roleText}>Pet Owner</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.roleButton} onPress={() => handleRoleSelection("Organization")}>
          <Text style={styles.roleText}>Organization</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.roleButton} onPress={() => handleRoleSelection("Veterinarian")}>
          <Text style={styles.roleText}>Veterinarian</Text>
        </TouchableOpacity>
      </View>
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
    paddingVertical: 50,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Back button left & email right
    width: "100%",
    marginTop: Platform.OS === "ios" ? 0 : -20,
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
  textContainer: {
    width: "100%", // Ensures full width
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    color: "#000",
    marginTop: 40,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#939393",
    marginBottom: 30,
    lineHeight: 24, // 1.5 times the font size (16 * 1.5)
  },
  progressBarContainer: {
    flexDirection: "row", // new
    width: "70%",
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden", // Ensures the border radius is applied correctly
  },
  progressBar: {
    width: "25%",
    height: "100%",
    backgroundColor: "#2BBFFF",
    borderRadius: 4,
  },
  roleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2FBFF",
    width: "90%",
    padding: 18,
    borderRadius: 30,
    marginBottom: 15,
    marginVertical: 5,
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Moves shadow downwards
    shadowOpacity: 0.1, // Adjust shadow visibility
    shadowRadius: 4, // Blur effect for shadow
    elevation: 3, // For Android shadow
  },
  roleText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2BBFFF",
  },
});