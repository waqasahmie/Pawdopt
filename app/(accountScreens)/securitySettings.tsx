import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Switch,
  Pressable,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function SecuritySettings() {
  const navigation = useNavigation();

  // Create state for each switch
  const [switchValue, setswitchValue] = useState(false);

  const toggleSwitch = (value: boolean | ((prevState: boolean) => boolean)) => {
    setswitchValue(value);
  };

  const settingOptions = [
    {
      title: "Change Password",
      subtitle: "Need a new password? Change it in a few steps",
    },
    {
      title: "Ad preferences",
      subtitle: "Manage your ad personalization settings. Tailor your ad experience",
    },
    {
      title: "Data Usage",
      subtitle: "Control how your data is used for analytics. Customize your preferences",
    },
    {
      title: "Download my data",
      subtitle: "Request a copy of your data. Your information, your control",
    },
    {
      title: "Deactivate Account",
      subtitle: "Temporarily deactivate your account. Easily activate when you’re ready",
    },
    {
      title: "Delete Account",
      subtitle: "Permanently delete your account and data. Proceed with caution",
      isLast: true,
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
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
          <Text style={styles.navText}>Account & Security</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
        {/* Toggle Text & Toggle Switch */}
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleText}>Two-Factor Authentication</Text>
          <Switch
            onValueChange={toggleSwitch}
            value={switchValue}
            trackColor={{ true: "#2BBFFF" }} // Change track color
          />
        </View>

        {/* Settings Cards */}
        {settingOptions.map((item, index) => (
          <Pressable key={index} style={styles.cardContainer}
          onPress={() => {
            if (item.title === "Change Password") {
              router.push("/(others)/changePassword"); // Adjust path to match your route file
            }
            else if (item.title === "Delete Account") {
              router.push("/(others)/deleteAccount"); // Adjust path to match your route file
            }
          }}
          >
            <View>
              <Text style={[ styles.cardTitle, item.isLast && { color: "red"},]}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color="#000"
                style={{ marginRight: 15 }}
              />
          </Pressable>
        ))}
        </ScrollView>
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
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "400",
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: 300,
    color: "#939393",
    marginTop: 10,
    width: 260,
    lineHeight: 14 * 1.5,
  },
});

