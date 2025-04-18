// components/CustomHeader.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Calendar02Icon } from "@hugeicons/core-free-icons";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const CustomHeader = () => {

  return (
    <View style={styles.headerContainer}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>
          All Services for your Pet’s Health.
        </Text>
      </View>

      <View style={styles.iconRow}>
        <Ionicons name="paw" size={26} color="#2bbfff" onPress={() => router.push('/(tabs)')}/>
        <HugeiconsIcon icon={Calendar02Icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 50 : 40,
    paddingBottom: 10,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    gap: 10,
  },
  greetingContainer: {
    width: "60%",
  },
  greetingText: {
    fontSize: 18,
    fontWeight: "500",
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});

export default CustomHeader;