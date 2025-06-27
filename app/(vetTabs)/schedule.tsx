import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import dayjs from "dayjs";
import { useAppContext } from "../../hooks/AppContext";
import { router } from "expo-router";
import responsive from "@/constants/Responsive";
import { useUser } from "@clerk/clerk-expo";
import { RefreshControl } from "react-native";

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

export default function ScheduleScreen() {
  const dateOptions = getNext7Days();
  const [selectedDate, setSelectedDate] = useState(dateOptions[0].fullDate);
  const { fetchAppointments, appointments, statusMap, updateStatus, vetData } =
    useAppContext();

  function formatTime(raw: string) {
    const cleanedTime = raw.replace(/[\u202F\u00A0]/g, " ").trim();
    const [timePart, period] = cleanedTime.split(" "); 
    const timeWithoutSeconds = timePart.split(":").slice(0, 2).join(":");
    const formattedTime = `${timeWithoutSeconds} ${period}`;
    return formattedTime;
  }

  const { user } = useUser();
  const [refreshing, setRefreshing] = useState(false);
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

  const filteredBookings = appointments
    .filter((booking) => {
      const status = booking.status;
      return (
        dayjs(booking.appointmentDate.toDate()).format("YYYY-MM-DD") ===
          selectedDate &&
        (status === "pending" || status === "confirmed")
      );
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

  useEffect(() => {
  }, [statusMap]);

  const renderBookingItem = ({ item }: { item: any }) => {
    const booking = item;
    const status = booking.status;

    return (
      <View key={booking.id} style={styles.card}>
        <View style={styles.cardHeader}>
          <Image source={{ uri: booking.picture }} style={styles.cardImage} />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>{booking.name}</Text>
          </View>
          <Text
            style={[
              styles.statusBadge,
              status === "pending" && styles.pending,
              status === "confirmed" && styles.confirmed,
              status === "cancelled" && styles.cancelled,
              status === "completed" && styles.completed,
            ]}
          >
            {status}
          </Text>
        </View>

        <View style={styles.cardDetails}>
          <Text style={styles.cardDetailText}>
            👤 {vetData.title} {vetData.firstName}
          </Text>
          <Text style={styles.cardDetailText}>
            ⏰ {formatTime(booking.appointmentTime)}
          </Text>
        </View>

        {status === "pending" && (
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() =>
                updateStatus(booking.id, "confirmed", booking.patientId)
              }
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() =>
                updateStatus(booking.id, "cancelled", booking.patientId)
              }
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}

        {(status === "confirmed" || status === "completed") && (
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => {
              updateStatus(booking.id, "completed", booking.patientId);
              router.push({
                pathname: "/(others)/sendInvoice",
                params: { bookingId: booking.id },
              });
            }}
          >
            <Text style={styles.confirmButtonText}>Mark as Complete</Text>
          </TouchableOpacity>
        )}
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
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#2bbfff"
              colors={["#2bbfff"]}
              progressBackgroundColor="#f2fbff"
            />
          }
          ListFooterComponent={
            filteredBookings.length > 0 ? (
              <Text style={styles.note}>
                Looks like you've reached the end!
              </Text>
            ) : null
          }
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
    paddingBottom: 8,
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
    marginTop: 20,
    paddingBottom: 70,
    paddingHorizontal: 20,
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
  cardDetails: {
    marginTop: 10,
  },
  cardDetailText: {
    color: "#374151",
    marginBottom: 4,
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  confirmButton: {
    backgroundColor: "#2bbfff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
  },
  cancelButton: {
    borderColor: "#d1d5db",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  cancelButtonText: {
    color: "#374151",
    fontWeight: "600",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
  },
  completeButton: {
    backgroundColor: "#2bbfff",
    paddingVertical: 10,
    marginTop: 12,
    borderRadius: 10,
  },
  noAppointmentsText: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: 40,
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 12,
  },
  modalName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  textArea: {
    width: "100%",
    padding: 10,
    marginBottom: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    height: 80,
  },
  modalButtons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  note: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(8),
    fontWeight: "400",
    alignSelf: "center",
    color: "#ACACAC",
    marginBottom: 50,
  },
});
