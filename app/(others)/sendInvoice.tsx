import React, { useRef, useState } from "react";
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
import { useLocalSearchParams } from 'expo-router';
import { useAppContext } from '@/hooks/AppContext';
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import responsive from "@/constants/Responsive";
import Toast from "@/components/utils/toast";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SendInvoice() {
  const navigation = useNavigation();
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const toastRef = useRef<any>({});
  const [services, setServices] = useState("");
  const [fees, setFees] = useState("");
  const [notes, setNotes] = useState("");
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();
  const { appointments } = useAppContext();
  const isButtonDisabled = !services || !fees;
  const appt = appointments.find(a => a.id === bookingId);

  const handleSendInvoice = async () => {
    if (!bookingId) return;

    try {
      const apptRef = doc(db, "appointments", bookingId);
      await updateDoc(apptRef, {
        service: services,
        fees: Number(fees),
        notes,
        invoiceSentAt: serverTimestamp(),
      });
      toastRef.current.show({
        type: "success",
        title: "Success",
        description: "Invoice sent successfully.",
      });
      
      navigation.goBack();
    } catch (err) {
      console.error("Error saving invoice:", err);
    }
  };
  

  return (
    <KeyboardAvoidingView style={styles.container}>
      <SafeAreaView style={styles.innerContainer}>
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
                <Image source={{ uri: appt?.picture }} style={styles.image} />
                  <View> 
                    <Text style={styles.name}>{appt?.name}</Text>
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
                  textAlignVertical="top" 
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
            onPress={handleSendInvoice}
          >
            <Text style={styles.payText}>Send Invoice</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Toast ref={toastRef} />
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
    marginTop: Platform.OS === "ios" ? 20 : 20,
    marginBottom: 40,
  },
  navText: {
    fontSize: Platform.OS === "ios" ? responsive.fontSize(21) : responsive.fontSize(18),
    fontWeight: "500",
    color: "#000",
    position: "absolute",
    textAlign: "center",
    left: 0,
    right: 0,
  },
  scrollContainer: {
    width: "100%",
    marginBottom: "10%",
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
    fontSize: Platform.OS === "ios" ? responsive.fontSize(17) : responsive.fontSize(14),
    fontWeight: "bold",
    marginRight: 10,
  },
  owner: {
    fontSize: Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
    color: "#777",
  },
  label: {
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 4,
    fontSize: Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 10,
    fontSize: Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
  },
  textArea: {
    height: 100,
    paddingVertical: 10,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 40, 
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
    fontSize: Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    fontWeight: "600",
  },
  disabledButton: {
    backgroundColor: "#E3E5E5",
  },
});
