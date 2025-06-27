import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import responsive from "@/constants/Responsive";

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
    paddingTop: Platform.OS === "ios" ? 70 : 20,
    paddingBottom: 10,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
  
  },
 
  title: {
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(21) : responsive.fontSize(18),
    fontWeight: "500",
  },
 
});

export default ScheduleHeader;