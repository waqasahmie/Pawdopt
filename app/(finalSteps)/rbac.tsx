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
import { useUser } from "@clerk/clerk-expo";
import { useAppContext } from "../../hooks/AppContext";
import responsive from "@/constants/Responsive";

export default function RBAC() {
  const navigation = useNavigation();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const { user } = useUser();
  const { updateRegistrationData } = useAppContext();
  const { updateUserData } = useAppContext();

  const handleRoleSelection = async (role: string) => {
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
      profilePicUrl: "",
      organizationName: "",
      longitude: 0,
      latitude: 0,
      address: "",
      callingCode: "",
      countryCode: ""
    });
    setSelectedRole(role);

    const clerkUserId = user?.id;

    if (!clerkUserId) {
      return;
    }

    updateRegistrationData("role", role);

    // Navigate to next screen based on role
    if (role === "Veterinarian") {
      router.push(`/(finalSteps)/vet?role=${role}`);
    } else {
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

          <Text style={styles.pageIndicator}>1/4</Text>
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
        <TouchableOpacity
          style={styles.roleButton}
          onPress={() => handleRoleSelection("Adopter")}
        >
          <Text style={styles.roleText}>Pet Adopter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.roleButton}
          onPress={() => handleRoleSelection("Owner")}
        >
          <Text style={styles.roleText}>Pet Owner</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.roleButton}
          onPress={() => handleRoleSelection("Organization")}
        >
          <Text style={styles.roleText}>Organization</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.roleButton}
          onPress={() => handleRoleSelection("Veterinarian")}
        >
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
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: Platform.OS === "ios" ? 70 : 20,
  },
  topLeftImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "90%",
    height: "40%",
  },
  bottomRightImage: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "96%",
    height: "49%",
  },
  textContainer: {
    width: "100%",
  },
  pageIndicator: {
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    color: "#939393",
  },
  title: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(29) : responsive.fontSize(23),
    fontWeight: "600",
    color: "#000",
    marginTop: 40,
    marginBottom: 10,
  },
  subtitle: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    color: "#939393",
    marginBottom: 30,
    lineHeight: Platform.OS === "ios" ? 24 : 20,
  },
  progressBarContainer: {
    flexDirection: "row",
    width: "70%",
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden",
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
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.1,
    shadowRadius: 4, 
    elevation: 3, // For Android shadow
  },
  roleText: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(17) : responsive.fontSize(14),
    fontWeight: "600",
    color: "#2BBFFF",
  },
});
