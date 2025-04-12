import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Animated,
    Dimensions,
    Image,
  } from "react-native";
  
  
  export const AccountDisabled = () => {
  
    return (
      <Animated.View
        style={styles.container}
      >
        
        <Text style={styles.title}>We’ll miss you!</Text>
            <Text style={styles.subTitle}>
              Your account is now disabled. Your data will be deleted within 30 days.
            </Text>
            <Image
              source={require("../../assets/images/pets.jpg")}
              style={styles.image}
            />
  
  
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      width: "95%",
      backgroundColor: "#fff",
      borderRadius: 30,
      alignItems: "center",
      paddingBottom: 20,
      paddingTop:80,
      // gap: 20,
    },
    title: {
      marginTop: 20,
      marginBottom: 5,
      fontSize: 26,
      fontWeight: "500",
      width: "85%",
    },
    subTitle: {
      width: "85%",
      fontSize: 16,
      color: "#939393",
      marginBottom: 20, 
    },
    image: {
      width: "85%",
      height: 200,
      borderRadius: 10,
      marginBottom: 20,
    },
    buttonsContainer: {
      flexDirection: "row-reverse",
      alignItems: "center",
      width: "85%", // Ensures proper spacing
      shadowColor: "#000", // Shadow color
      shadowOffset: { width: 0, height: 4 }, // Moves shadow downwards
      shadowOpacity: 0.05, // Adjust shadow visibility
      shadowRadius: 4, // Blur effect for shadow
      elevation: 1, // For Android shadow
    },
    closeButton: {
      width: 110,
      alignItems: "center",
      paddingVertical: 12,
      borderRadius: 30,
      backgroundColor: "#2BBFFF",
    },
    closeText: {
      fontSize: 16,
      color: "#fff",
      fontWeight: "700",
    },
  });