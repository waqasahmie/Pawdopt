import responsive from "@/constants/Responsive";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";

const AppointmentHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ zIndex: 10 }}
      >
        <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Appoitments</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 70 : 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(21) : responsive.fontSize(18),
    fontWeight: "500",
    textAlign: "center",
    width: "94%",
  },
});

export default AppointmentHeader;
