import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Platform,
  BackHandler,
} from "react-native";
import dayjs from "dayjs";
import { useAppContext } from "../../hooks/AppContext"; 
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { db } from "@/config/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { EventSubscription } from "expo-notifications";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "../../components/utils/notifications";
import { RefreshControl } from "react-native";
import responsive from "@/constants/Responsive";

export default function VetDashboardHomeScreen() {
  const todayDate = dayjs().format("YYYY-MM-DD");
  const [loading, setLoading] = useState(true);

  // Use AppContext to access the statusMap
  const {
    appointments,
    statusMap,
    updateStatus,
    fetchAppointments,
    vetData,
    updateVetData,
  } = useAppContext();

  const { user } = useUser();
  const notificationListener = useRef<EventSubscription | null>(null);
  const responseListener = useRef<EventSubscription | null>(null);

  const [refreshing, setRefreshing] = useState(false); // Add refresh state

  // Add this refresh handler function
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (user?.id) {
      fetchAppointments(user.id)
        .then(() => setRefreshing(false))
        .catch(() => setRefreshing(false));
    } else {
      setRefreshing(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const setup = async () => {
        const token = await registerForPushNotificationsAsync();
        if (token) {
          await setDoc(
            doc(db, "users", user.id),
            { expoPushToken: token },
            { merge: true }
          );
        }

        notificationListener.current =
          Notifications.addNotificationReceivedListener((notification) => {
            console.log("Foreground notification:", notification);
          });

        responseListener.current =
          Notifications.addNotificationResponseReceivedListener((response) => {
            console.log("User tapped notification:", response);
          });
      };

      setup();

      return () => {
        if (notificationListener.current) {
          Notifications.removeNotificationSubscription(
            notificationListener.current
          );
        }
        if (responseListener.current) {
          Notifications.removeNotificationSubscription(
            responseListener.current
          );
        }
      };
    }
  }, [user]);

  useEffect(() => {
    if (user?.id) {
      const updateLoggedInStatus = async () => {
        await updateDoc(doc(db, "users", user.id), {
          loggedIn: true,
        });
      };
      updateLoggedInStatus();
    }
  }, [user?.id]);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        setLoading(true);
        try {
          await fetchAppointments(user.id);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    const fetchVetData = async () => {
      if (!user?.id) return;

      try {
        const vetDocRef = doc(db, "users", user.id); 
        const vetSnap = await getDoc(vetDocRef);

        if (vetSnap.exists()) {
          const fetchedVetData = vetSnap.data();
          updateVetData("title", fetchedVetData.title);
          updateVetData("firstName", fetchedVetData.firstName);
          updateVetData("lastName", fetchedVetData.lastName);
          updateVetData("clinicName", fetchedVetData.clinicName);
          updateVetData("startTime", fetchedVetData.startTime); // convert Firestore timestamp
          updateVetData("endTime", fetchedVetData.endTime);
          updateVetData("gender", fetchedVetData.gender);
          updateVetData("license", fetchedVetData.license);
          updateVetData("email", fetchedVetData.email);
          updateVetData("phoneNumber", fetchedVetData.phone);
          updateVetData("cnic", fetchedVetData.cnicNumber);
          updateVetData("cnicFront", fetchedVetData.frontCNICUrl);
          updateVetData("cnicBack", fetchedVetData.backCNICUrl);
          updateVetData("role", fetchedVetData.role);
          updateVetData("experience", fetchedVetData.experience || "");
          updateVetData("profilePicUrl", fetchedVetData.profilePicUrl);
          updateVetData("callingCode", fetchedVetData.callingCode);
          updateVetData("countryCode", fetchedVetData.countryCode);
        }
      } catch (err) {
        console.error("Failed to fetch vet data:", err);
      }
    };

    fetchVetData();
  }, [user]);

  const todayAppointments = appointments.filter((appt) => {
    const apptDate = dayjs(appt.appointmentDate.toDate()).format("YYYY-MM-DD");
    return (
      apptDate === todayDate && ["confirmed", "pending"].includes(appt.status)
    );
  });

  useFocusEffect(
    React.useCallback(() => {
      if (Platform.OS !== "android") return;

      const onBackPress = () => {
        BackHandler.exitApp();
        return true; // consume the event
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [])
  );

  const todayConfirmedAppointments = appointments
    .filter((appt) => {
      const apptDate = dayjs(appt.appointmentDate.toDate()).format(
        "YYYY-MM-DD"
      );
      return apptDate === todayDate && ["confirmed"].includes(appt.status);
    })
    .sort((a, b) => {
      const datetimeA = dayjs(
        `${dayjs(a.appointmentDate.toDate()).format("YYYY-MM-DD")} ${
          a.appointmentTime
        }`,
        ["YYYY-MM-DD HH:mm:ss", "YYYY-MM-DD h:mm A"]
      );
      const datetimeB = dayjs(
        `${dayjs(b.appointmentDate.toDate()).format("YYYY-MM-DD")} ${
          b.appointmentTime
        }`,
        ["YYYY-MM-DD HH:mm:ss", "YYYY-MM-DD h:mm A"]
      );
      return datetimeA.isBefore(datetimeB) ? -1 : 1;
    });

  // Count for today
  const todayCount = todayAppointments.length;

  // Count pending this whole week
  const pendingWeekCount = appointments.filter(
    (appt) => appt.status === "pending"
  ).length;

  function formatTime(raw: string) {

    const cleanedTime = raw.replace(/[\u202F\u00A0]/g, " ").trim();
    const [timePart, period] = cleanedTime.split(" "); 
    const timeWithoutSeconds = timePart.split(":").slice(0, 2).join(":");

    const formattedTime = `${timeWithoutSeconds} ${period}`;
    return formattedTime;
  }
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" color="#2bbfff" />
      </View>
    );
  }

  const renderAppointmentItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Image source={{ uri: item.picture }} style={styles.cardImage} />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>{item.name}</Text>
          </View>
          <Text style={styles.statusBadge}>{item.status}</Text>
        </View>

        <View style={styles.cardDetails}>
          <Text style={styles.cardDetailText}>
            👤 {vetData?.title} {vetData?.firstName}
          </Text>
          <Text style={styles.cardDetailText}>
            ⏰ {formatTime(item.appointmentTime)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.completeButton}
          onPress={() => {
            updateStatus(item.id, "completed", item.patientId);
            router.push({
              pathname: "/(others)/sendInvoice",
              params: { bookingId: item.id },
            });
          }}
        >
          <Text style={styles.confirmButtonText}>Mark as Complete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>Today’s Appointments</Text>
            <Text style={styles.summaryCount}>{todayCount}</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>Pending Requests</Text>
            <Text style={styles.summaryCount}>{pendingWeekCount}</Text>
          </View>
        </View>

        <FlatList
          data={todayConfirmedAppointments}
          keyExtractor={(item) => item.id}
          renderItem={renderAppointmentItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.cardsContainer,
            todayConfirmedAppointments.length === 0
              ? { flex: 1}
              : undefined,
          ]}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#2bbfff"
              colors={["#2bbfff"]}
              progressBackgroundColor="#f2fbff"
            />
          }
          ListEmptyComponent={
            <Text style={styles.noAppointmentsText}>
              No Confirmed Appointments for today
            </Text>
          }
          ListFooterComponent={
            todayConfirmedAppointments.length > 0 ? (
              <Text style={styles.note}>
                Looks like you've reached the end!
              </Text>
            ) : null
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "flex-start",
    gap: 20,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  summaryBox: {
    backgroundColor: "#f2fbff",
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 6,
  },
  summaryCount: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(21) : responsive.fontSize(18),
    fontWeight: "bold",
    color: "#111827",
  },
  summaryLabel: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
    color: "#6b7280",
    marginTop: 4,
  },
  cardsContainer: {
    marginHorizontal: 20,
    paddingBottom: 60 
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardImage: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: 12,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(17) : responsive.fontSize(14),
    fontWeight: "600",
  },
  statusBadge: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(9),
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#bbf7d0",
    color: "#166534",
  },
  cardDetails: {
    marginTop: 10,
  },
  cardDetailText: {
    color: "#374151",
    marginBottom: 4,
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
  },
  noAppointmentsText: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: 40,
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
  },
  completeButton: {
    backgroundColor: "#2bbfff",
    paddingVertical: 10,
    marginTop: 12,
    borderRadius: 10,
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
  },
  note: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(8),
    fontWeight: "400",
    alignSelf: "center",
    color: "#ACACAC",
    marginBottom: 40,
  },
});
