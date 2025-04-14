import React from "react";
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
import { router, useLocalSearchParams } from "expo-router";
export default function FindMatch() {
  const navigation = useNavigation();
  const { role } = useLocalSearchParams();
  console.log("Role received:", role);

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
          <Text style={{ color: "#939393", fontSize: 16 }}>2/4</Text>
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
          <Text style={styles.title}>Let’s Find Your Match!</Text>
          <Text style={styles.subtitle}>
            What type of animal are you looking to adopt? Don’t worry you can
            always change this later.
          </Text>
        </View>

        <TouchableOpacity style={styles.categoryButton} onPress={() => router.push(`/(finalSteps)/catBreeds?role=${role}`)}>
          <Text style={styles.categoryText}>A Cat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryButton} onPress={() => router.push(`/(finalSteps)/dogBreeds?role=${role}`)}>
          <Text style={styles.categoryText}>A Dog</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryButton} onPress={() => router.push(`/(finalSteps)/parrotBreeds?role=${role}`)}>
          <Text style={styles.categoryText}>A Parrot</Text>
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
    lineHeight: 24, // 1.5 times the font size (16 * 1.5)
    marginBottom: 70,
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
    width: "50%",
    height: "100%",
    backgroundColor: "#2BBFFF", // Second half blue
    borderRadius: 4,
  },
  categoryButton: {
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
  categoryText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2BBFFF",
  },
});