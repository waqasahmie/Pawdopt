// components/CustomHeader.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import { ms, vs } from "react-native-size-matters"; // assuming you're using this
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  Notification03Icon,
  Search01Icon,
  Stethoscope02Icon,
} from "@hugeicons/core-free-icons";

const ScheduleHeader = () => {


  return (
    <View style={styles.headerContainer}>
          <Text style={styles.title}>Schedule</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
   
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 50 : 40,
    paddingBottom: 10,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
  
  },
 
  title: {
    fontSize: 22,
    fontWeight: "600",
  },
 
});

export default ScheduleHeader;