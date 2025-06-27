import responsive from "@/constants/Responsive";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Animated,
    Dimensions,
    Image,
    Platform,
  } from "react-native";
  
  
  type AccountDisabledProps = {
    closeModal: () => void;
  };
  const screenHeight = Dimensions.get("window").height;

  export const AccountDisabled = ({ closeModal }: AccountDisabledProps) => {
    const [slideAnim] = useState(new Animated.Value(screenHeight * 0.9));
    useEffect(() => {
      Animated.timing(slideAnim, {
        toValue: 0, 
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, [slideAnim]); 
  
    
    const handleClose = (callback: () => void) => {
      Animated.timing(slideAnim, {
        toValue: screenHeight * 0.9, 
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        closeModal();
  
        setTimeout(() => {
          callback(); 
        }, 50); 
      });
    };

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
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() =>
            handleClose(() => router.push("/(onboarding)/getStarted"))
          }
        >
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
    },
    title: {
      marginTop: 20,
      marginBottom: 5,
      fontSize: Platform.OS === "ios" ? responsive.fontSize(25) : responsive.fontSize(20),
      fontWeight: "500",
      width: "85%",
    },
    subTitle: {
      width: "85%",
      fontSize: Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
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
      width: "85%",
      shadowColor: "#000", 
      shadowOffset: { width: 0, height: 4 }, 
      shadowOpacity: 0.05, 
      shadowRadius: 4,
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
      fontSize: Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
      color: "#fff",
      fontWeight: "700",
    },
  });