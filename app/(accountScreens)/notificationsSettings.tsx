import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Switch, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function NotificationSettings() {
  const navigation = useNavigation();

  // Create state for each switch
  const [switches, setSwitches] = useState(Array(7).fill(false));

  const toggleSwitch = (index: number) => {
    setSwitches(prevState => {
      const updatedSwitches = [...prevState];
      updatedSwitches[index] = !updatedSwitches[index];
      return updatedSwitches;
    });
  };

  const toggleButtons = [
    "Security Alerts",
    "Shelter Updates",
    "Event Reminders",
    "Adoption Updates",
    "General App Updates",
    "App Tips and Tutorials",
    "Important Announcements",
  ]

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <StatusBar barStyle="dark-content" />

        {/* Back Button (Positioned Below Status Bar) */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex: 10 }}>
            <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
          </TouchableOpacity>
          <Text style={styles.navText}>Notification & Privacy</Text>
        </View>

        {/* Toggle Text & Switch Components */}
        {toggleButtons.map((label, index) => (
          <View key={index} style={styles.toggleContainer}>
            <Text style={styles.toggleText}>{label}</Text>
            <Switch
              onValueChange={() => toggleSwitch(index)}
              value={switches[index]}
              trackColor={{ true: "#2BBFFF" }}
            />
          </View>
        ))}
      </View>
    </SafeAreaView>
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
    width: "100%",
    marginTop: 20,
    marginBottom: 40,
  },
  navText: {
    fontSize: 24,
    fontWeight: "500",
    color: "#000",
    position: "absolute",
    textAlign: "center",
    left: 0,
    right: 0,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  toggleText: {
    fontSize: 22,
    fontWeight: "400",
    color: "#000",
    width: "80%",
  },
});

