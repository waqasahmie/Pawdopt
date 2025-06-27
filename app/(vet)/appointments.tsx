import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from "react-native";
import dayjs from "dayjs";
import { useUser } from "@clerk/clerk-expo";
import { useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useAppContext } from "../../hooks/AppContext";
import responsive from "@/constants/Responsive";

const getNext7Days = () => {
  return [...Array(7).keys()].map((offset) => {
    const date = dayjs().add(offset, "day");
    return {
      id: offset,
      day: date.format("ddd"),
      date: date.format("D"),
      fullDate: date.format("YYYY-MM-DD"),
    };
  });
};

type VetInfo = {
  title: string;
  firstName: string;
  lastName: string;
  profilePicUrl: string;
};
type Appointment = {
  id: string;
  appointmentDate: any;
  appointmentTime: string;
  name: string;
  patientId: string;
  picture: string;
  status: string;
  vetId: string;
  vet?: VetInfo;
};

export default function Appointments() {
  const dateOptions = getNext7Days();
  const [selectedDate, setSelectedDate] = useState(dateOptions[0].fullDate);
  const { user } = useUser();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const filteredBookings = appointments
    .filter(
      (booking) =>
        dayjs(booking.appointmentDate.toDate()).format("YYYY-MM-DD") ===
        selectedDate
    )
    .sort((a, b) => {
      const aDateTime = dayjs(
        `${dayjs(a.appointmentDate.toDate()).format("YYYY-MM-DD")}T${
          a.appointmentTime
        }`
      );
      const bDateTime = dayjs(
        `${dayjs(b.appointmentDate.toDate()).format("YYYY-MM-DD")}T${
          b.appointmentTime
        }`
      );
      return aDateTime.isBefore(bDateTime) ? -1 : 1;
    });

  const { userData } = useAppContext();

    const fetchAppointments = async () => {
      try {
        const q = query(
          collection(db, "appointments"),
          where("patientId", "==", user?.id)
        );

        const snapshot = await getDocs(q);

        const rawAppointments = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Appointment[];

        const enrichedAppointments = await Promise.all(
          rawAppointments.map(async (appointment) => {
            const vetRef = doc(db, "users", appointment.vetId);
            const vetSnap = await getDoc(vetRef);

            if (vetSnap.exists()) {
              const vetData = vetSnap.data() as VetInfo;
              return {
                ...appointment,
                vet: vetData,
              };
            } else {
              return appointment;
            }
          })
        );

        setAppointments(enrichedAppointments);
      } catch (error) {
        console.log("Error fetching appointments:", error);
      }
    };
    useEffect(() => {
      if (user?.id) {
        fetchAppointments();
      }
    }, [user?.id]);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        setLoading(true);
        try {
          await fetchAppointments();
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [user]);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2bbfff" />
      </View>
    );
  }

  const renderBookingItem = ({ item: booking }: { item: any }) => {
    const cleanedTime = booking.appointmentTime
    .replace(/[\u202F\u00A0]/g, " ")
    .trim();

  const [timePart, period] = cleanedTime.split(" ");
  const timeWithoutSeconds = timePart.split(":").slice(0, 2).join(":");
  const formattedTime = `${timeWithoutSeconds} ${period}`;
    return (
      <View key={booking.id} style={styles.card}>
        <View style={styles.cardHeader}>
          <Image
            source={{ uri: booking.vet?.profilePicUrl }}
            style={styles.cardImage}
          />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>
              {booking.vet
                ? `${booking.vet.title} ${booking.vet.firstName} ${booking.vet.lastName}`
                : "Unknown Vet"}
            </Text>
            <Text
              style={[
                styles.statusBadge,
                booking.status === "pending" && styles.pending,
                booking.status === "confirmed" && styles.confirmed,
                booking.status === "cancelled" && styles.cancelled,
                booking.status === "completed" && styles.completed,
              ]}
            >
              {booking.status}
            </Text>
          </View>
        </View>

        <View style={styles.cardDetails}>
          <Text style={styles.cardDetailText}>
            👤 {userData?.firstName} {userData?.lastName}
          </Text>
          <Text style={styles.cardDetailText}>
          ⏰ {dayjs(booking.appointmentDate.toDate()).format("dddd")} at {formattedTime}
        </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={{ marginHorizontal: 10, marginTop: 10 }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={dateOptions}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.datePillsContainer}
            renderItem={({ item }) => {
              const isSelected = item.fullDate === selectedDate;
              return (
                <TouchableOpacity
                  onPress={() => setSelectedDate(item.fullDate)}
                  style={[
                    styles.datePill,
                    isSelected ? styles.selectedPill : styles.unselectedPill,
                  ]}
                >
                  <Text
                    style={[
                      styles.pillDateText,
                      isSelected && styles.selectedPillText,
                    ]}
                  >
                    {item.date}
                  </Text>
                  <Text
                    style={[
                      styles.pillDayText,
                      isSelected && styles.selectedPillText,
                    ]}
                  >
                    {item.day}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <FlatList
          data={filteredBookings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderBookingItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.cardsContainer,
            filteredBookings.length === 0 && {
              flex: 1,
            },
          ]}
          ListEmptyComponent={
            <Text style={styles.noAppointmentsText}>
              No Appointments for this date
            </Text>
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
  },
  datePillsContainer: {
    paddingVertical: 8,
  },
  datePill: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginHorizontal: 6,
    width: 64,
    height: 64,
  },
  selectedPill: {
    backgroundColor: "#2bbfff",
  },
  unselectedPill: {
    borderWidth: 1,
    borderColor: "#dcdcdc",
  },
  pillDateText: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(17) : responsive.fontSize(14),
    fontWeight: "bold",
    color: "#000",
  },
  pillDayText: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
    color: "#939393",
  },
  selectedPillText: {
    color: "#fff",
  },
  cardsContainer: {
    marginTop: 10,
    marginBottom: 80,
    marginHorizontal: 20,
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
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(17) : responsive.fontSize(14),
    fontWeight: "600",
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
    marginTop: 20,
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
  },
  statusBadge: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(9),
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    left: 3,
  },
  pending: {
    backgroundColor: "#fde68a",
    color: "#92400e",
  },
  confirmed: {
    backgroundColor: "#bbf7d0",
    color: "#166534",
  },
  cancelled: {
    backgroundColor: "#fecaca",
    color: "#991b1b",
  },
  completed: {
    backgroundColor: "#dbeafe",
    color: "#1e3a8a",
  },
});
