import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import dayjs from "dayjs";
import { useAppContext } from "../../hooks/AppContext";
import { router } from "expo-router";

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

const dummyBookings = [
  {
    id: "1",
    name: "Aleysha Amir",
    owner: "Dr Asad",
    time: "2025-04-20T14:30:00",
    image: "https://placedog.net/300/200?id=1",
  },
  {
    id: "2",
    name: "Faisal Awan",
    owner: "Dr Saif",
    time: "2025-04-20T11:00:00",
    image: "https://placedog.net/300/200?id=2",
  },
  {
    id: "3",
    name: "Waqas Ahmed",
    owner: "Dr Alizay",
    time: "2025-04-22T16:00:00",
    image: "https://placedog.net/300/200?id=3",
  },
  {
    id: "4",
    name: "Aleysha Amir",
    owner: "Dr Asad",
    time: "2025-04-21T14:30:00",
    image: "https://placedog.net/300/200?id=1",
  },
  {
    id: "5",
    name: "Aleysha Amir",
    owner: "Dr Asad",
    time: "2025-04-22T14:30:00",
    image: "https://placedog.net/300/200?id=1",
  },
  {
    id: "6",
    name: "Aleysha Amir",
    owner: "Dr Asad",
    time: "2025-04-15T14:30:00",
    image: "https://placedog.net/300/200?id=1",
  },
  {
    id: "7",
    name: "Aleysha Amir",
    owner: "Dr Asad",
    time: "2025-04-15T14:30:00",
    image: "https://placedog.net/300/200?id=1",
  },
];

export default function ScheduleScreen() {
  const dateOptions = getNext7Days();
  const [selectedDate, setSelectedDate] = useState(dateOptions[0].fullDate);
  const { statusMap, updateStatus } = useAppContext();
  

 
  
  // Filter bookings based on selected date
  const filteredBookings = dummyBookings.filter(
    (booking) => dayjs(booking.time).format("YYYY-MM-DD") === selectedDate && statusMap[booking.id] !== "cancelled"  
  );

  // Log statusMap whenever it updates
  useEffect(() => {
    console.log("statusMap updated:", statusMap);
  }, [statusMap]);

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
          <View style={{ marginHorizontal: 20 }}>
        {/* Appointments List */}
        <ScrollView style={styles.cardsContainer}>
          {filteredBookings.length === 0 ? (
            <Text style={styles.noAppointmentsText}>
              No Appointments for this date
            </Text>
          ) : (
            filteredBookings.map((booking) => {
              console.log("Rendering Booking:", booking.id);
              console.log("Current Status Map:", statusMap);

              const status = statusMap[booking.id] || "pending";
              console.log("Status for Booking:", status);

              return (
                <View key={booking.id} style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Image
                      source={{ uri: booking.image }}
                      style={styles.cardImage}
                    />
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
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Text>
                  </View>

                  <View style={styles.cardDetails}>
                    <Text style={styles.cardDetailText}>
                      👤 {booking.owner}
                    </Text>
                    <Text style={styles.cardDetailText}>
                      ⏰ {dayjs(booking.time).format("dddd, h:mm A")}
                    </Text>
                  </View>

                  {status === "pending" && (
                    <View style={styles.buttonGroup}>
                      <TouchableOpacity
                        style={styles.confirmButton}
                        onPress={() => updateStatus(booking.id, "confirmed")}
                      >
                        <Text style={styles.confirmButtonText}>Confirm</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => updateStatus(booking.id, "cancelled")}
                      >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {(status === "confirmed" || status === "completed") && (
                    <TouchableOpacity
                      style={styles.completeButton}
                      onPress={() => {
                        updateStatus(booking.id, "completed");
                          router.push("/(others)/sendInvoice"); // replace with your actual screen name
                        }}
                      
                    >
                      <Text style={styles.confirmButtonText}>
                        Mark as Complete
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })
          )}
        </ScrollView>
        </View>
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
    //paddingHorizontal: 10,
    //gap: 20,
  },
  datePillsContainer: {
    paddingBottom: 8,
  },
  datePill: {
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 6,
    width: 64,
    height: 64,
  },
  selectedPill: {
    backgroundColor: "#2bbfff",
  },
  unselectedPill: {
    backgroundColor: "#dcdcdc",
  },
  pillDateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  pillDayText: {
    fontSize: 13,
    color: "#939393",
  },
  selectedPillText: {
    color: "#fff",
  },
  cardsContainer: {
    marginTop: 20,
    marginBottom: 70,
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
    fontSize: 17,
    fontWeight: "600",
  },
  cardSub: {
    color: "#2bbfff",
  },
  statusBadge: {
    fontSize: 12,
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
    fontSize: 16,
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
});
