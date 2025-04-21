import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function SendInvoice() {
  const navigation = useNavigation();
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const [services, setServices] = useState("");
  const [fees, setFees] = useState("");
  const [notes, setNotes] = useState("");

  const isButtonDisabled = !services || !fees;

  return (
    <KeyboardAvoidingView style={styles.container}>
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
          <Text style={styles.navText}>Payment</Text>
        </View>
        <View style={styles.scrollContainer}>
          <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.card}>
                <View style={styles.info}>
                  <Image
                    source={{ uri: "https://placedog.net/300/200?id=1" }} // Replace with pet image
                    style={styles.image}
                  />
                  <View> 
                    <Text style={styles.name}>Aleysha Amir</Text>
                  </View>
                </View>
              </View>

              {/* Services & Fees */}
              <View style={styles.card}>
                <Text style={styles.label}>Service</Text>
                <TextInput
                  placeholder="e.g. Spaying"
                  value={services}
                  onChangeText={setServices}
                  style={styles.input}
                  multiline
                />
                <Text style={styles.label}>Fees (PKR)</Text>
                <TextInput
                  placeholder="e.g. 2000"
                  value={fees}
                  onChangeText={setFees}
                  style={styles.input}
                  keyboardType="numeric"
                />
              </View>

              {/* Optional Notes */}
              <View style={styles.card}>
                <Text style={styles.label}>Notes (optional)</Text>
                <TextInput
                  placeholder="Additional details..."
                  value={notes}
                  onChangeText={setNotes}
                  style={[styles.input, styles.textArea]}
                  multiline
                  textAlignVertical="top" // Makes text start from top-left like a textarea
                />
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.payButton,
              isButtonDisabled && styles.disabledButton,
            ]}
            disabled={isButtonDisabled}
          >
            <Text style={styles.payText}>Send Invoice</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
    marginTop: Platform.OS === "ios" ? 50 : 20,
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
  scrollContainer: {
    width: "100%",
    marginBottom: "50%",
  },
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DCDCDC",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 40,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  owner: {
    fontSize: 14,
    color: "#777",
  },
  label: {
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 4,
    fontSize: 14,
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
  },
  textArea: {
    height: 100,
    paddingVertical: 10,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 40, // Change to 50 if needed
    width: "100%",
  },
  payButton: {
    backgroundColor: "#2BBFFF",
    width: "100%",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  payText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledButton: {
    backgroundColor: "#E3E5E5",
  },
});
