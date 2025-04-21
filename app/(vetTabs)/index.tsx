// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   StyleSheet,
// } from "react-native";
// import dayjs from "dayjs";

// const dummyBookings = [
//   {
//     id: "1",
//     name: "Aleysha Amir",
//     owner: "Dr Asad",
//     time: "2025-04-20T14:30:00",
//     image: "https://placedog.net/300/200?id=1",
//   },
//   {
//     id: "2",
//     name: "Faisal Awan",
//     owner: "Dr Saif",
//     time: "2025-04-20T11:00:00",
//     image: "https://placedog.net/300/200?id=2",
//   },
//   {
//     id: "3",
//     name: "Waqas Ahmed",
//     owner: "Dr Alizay",
//     time: "2025-04-22T16:00:00",
//     image: "https://placedog.net/300/200?id=3",
//   },
//   {
//     id: "4",
//     name: "Aleysha Amir",
//     owner: "Dr Asad",
//     time: "2025-04-21T14:30:00",
//     image: "https://placedog.net/300/200?id=1",
//   },
//   {
//     id: "5",
//     name: "Aleysha Amir",
//     owner: "Dr Asad",
//     time: "2025-04-22T14:30:00",
//     image: "https://placedog.net/300/200?id=1",
//   },
//   {
//     id: "6",
//     name: "Aleysha Amir",
//     owner: "Dr Asad",
//     time: "2025-04-15T14:30:00",
//     image: "https://placedog.net/300/200?id=1",
//   },
//   {
//     id: "7",
//     name: "Aleysha Amir",
//     owner: "Dr Asad",
//     time: "2025-04-15T14:30:00",
//     image: "https://placedog.net/300/200?id=1",
//   },
// ];

// export default function PetAdoptionScreen() {
//   const todayDate = dayjs().format("YYYY-MM-DD");
//   const [statusMap, setStatusMap] = useState<{ [key: string]: string }>({});

//   // Today's appointments
//   const todayAppointments = dummyBookings.filter(
//     (booking) => dayjs(booking.time).format("YYYY-MM-DD") === todayDate
//   );

//   // Pending requests among today's appointments
//   const pendingRequests = todayAppointments.filter(
//     (booking) => (statusMap[booking.id] || "pending") === "pending"
//   );

//   // Update status
//   const updateStatus = (id: string, newStatus: string) => {
//     setStatusMap((prev) => ({ ...prev, [id]: newStatus }));
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.innerContainer}>
//         <View style={styles.summaryRow}>
//           <View style={styles.summaryBox}>
//             <Text style={styles.summaryLabel}>Today’s Appointments</Text>
//             <Text style={styles.summaryCount}>{todayAppointments.length}</Text>
//           </View>
//           <View style={styles.summaryBox}>
//             <Text style={styles.summaryLabel}>Pending Requests</Text>
//             <Text style={styles.summaryCount}>{pendingRequests.length}</Text>
//           </View>
//         </View>

//         <ScrollView style={styles.cardsContainer}>
//           {todayAppointments.filter(
//             (booking) => (statusMap[booking.id] || "pending") === "confirmed"
//           ).length === 0 ? (
//             <Text style={styles.noAppointmentsText}>
//               No Appointments for today
//             </Text>
//           ) : (
//             todayAppointments
//               .filter(
//                 (booking) =>
//                   (statusMap[booking.id] || "pending") === "confirmed"
//               )
//               .map((booking) => {
//                 const status = statusMap[booking.id] || "pending";
//                 return (
//                   <View key={booking.id} style={styles.card}>
//                     <View style={styles.cardHeader}>
//                       <Image
//                         source={{ uri: booking.image }}
//                         style={styles.cardImage}
//                       />
//                       <View style={styles.cardText}>
//                         <Text style={styles.cardTitle}>{booking.name}</Text>
//                       </View>
//                       <Text
//                         style={[
//                           styles.statusBadge,
//                           status === "pending" && styles.pending,
//                           status === "confirmed" && styles.confirmed,
//                           status === "cancelled" && styles.cancelled,
//                           status === "completed" && styles.completed,
//                         ]}
//                       >
//                         {status.charAt(0).toUpperCase() + status.slice(1)}
//                       </Text>
//                     </View>

//                     <View style={styles.cardDetails}>
//                       <Text style={styles.cardDetailText}>
//                         👤 {booking.owner}
//                       </Text>
//                       <Text style={styles.cardDetailText}>
//                         ⏰ {dayjs(booking.time).format("dddd, h:mm A")}
//                       </Text>
//                     </View>

//                     {status === "pending" && (
//                       <View style={styles.buttonGroup}>
//                         <TouchableOpacity
//                           style={styles.confirmButton}
//                           onPress={() => updateStatus(booking.id, "confirmed")}
//                         >
//                           <Text style={styles.confirmButtonText}>Confirm</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                           style={styles.cancelButton}
//                           onPress={() => updateStatus(booking.id, "cancelled")}
//                         >
//                           <Text style={styles.cancelButtonText}>Cancel</Text>
//                         </TouchableOpacity>
//                       </View>
//                     )}

//                     {status === "confirmed" && (
//                       <TouchableOpacity
//                         style={styles.completeButton}
//                         onPress={() => updateStatus(booking.id, "completed")}
//                       >
//                         <Text style={styles.confirmButtonText}>
//                           Mark as Complete
//                         </Text>
//                       </TouchableOpacity>
//                     )}
//                   </View>
//                 );
//               })
//           )}
//         </ScrollView>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   innerContainer: {
//     flex: 1,
//     justifyContent: "flex-start",
//     //paddingHorizontal: 10,
//     //gap: 20,
//   },
//   summaryRow: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingHorizontal: 10,
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   summaryBox: {
//     backgroundColor: "#f3f4f6",
//     paddingVertical: 20,
//     paddingHorizontal: 12,
//     borderRadius: 12,
//     // alignItems: "center",
//     flex: 1,
//     marginHorizontal: 6,
//   },
//   summaryCount: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#111827",
//   },
//   summaryLabel: {
//     fontSize: 13,
//     color: "#6b7280",
//     marginTop: 4,
//     // textAlign: "center",
//   },
//   cardsContainer: {
//     marginTop: 20,
//     marginBottom: 70,
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 16,
//     elevation: 3,
//   },
//   cardHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   cardImage: {
//     width: 48,
//     height: 48,
//     borderRadius: 12,
//     marginRight: 12,
//   },
//   cardText: {
//     flex: 1,
//   },
//   cardTitle: {
//     fontSize: 17,
//     fontWeight: "600",
//   },
//   cardSub: {
//     color: "#2bbfff",
//   },
//   statusBadge: {
//     fontSize: 12,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//     overflow: "hidden",
//   },
//   pending: {
//     backgroundColor: "#fde68a",
//     color: "#92400e",
//   },
//   confirmed: {
//     backgroundColor: "#bbf7d0",
//     color: "#166534",
//   },
//   cancelled: {
//     backgroundColor: "#fecaca",
//     color: "#991b1b",
//   },
//   completed: {
//     backgroundColor: "#dbeafe",
//     color: "#1e3a8a",
//   },
//   cardDetails: {
//     marginTop: 10,
//   },
//   cardDetailText: {
//     color: "#374151",
//     marginBottom: 4,
//   },
//   buttonGroup: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 12,
//   },
//   confirmButton: {
//     backgroundColor: "#16a34a",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//   confirmButtonText: {
//     color: "#fff",
//     fontWeight: "600",
//     textAlign: "center",
//   },
//   cancelButton: {
//     borderColor: "#d1d5db",
//     borderWidth: 1,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//   cancelButtonText: {
//     color: "#374151",
//     fontWeight: "600",
//   },
//   completeButton: {
//     backgroundColor: "#2563eb",
//     paddingVertical: 10,
//     marginTop: 12,
//     borderRadius: 10,
//   },
//   noAppointmentsText: {
//     textAlign: "center",
//     color: "#6b7280",
//     marginTop: 40,
//     fontSize: 16,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContent: {
//     width: "80%",
//     backgroundColor: "white",
//     borderRadius: 12,
//     padding: 20,
//     alignItems: "center",
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   modalImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     marginBottom: 12,
//   },
//   modalName: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 15,
//   },
//   input: {
//     width: "100%",
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   textArea: {
//     width: "100%",
//     padding: 10,
//     marginBottom: 20,
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     height: 80,
//   },
//   modalButtons: {
//     width: "100%",
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
// });


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
import { useAppContext } from '../../hooks/AppContext'; // Import the AppContext
import { router } from "expo-router";

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

export default function VetDashboardHomeScreen() {
  const todayDate = dayjs().format("YYYY-MM-DD");
  
  // Use AppContext to access the statusMap
  const { statusMap, updateStatus } = useAppContext();

  // Today's appointments
const todayAppointments = dummyBookings.filter(
  (booking) =>
    dayjs(booking.time).format("YYYY-MM-DD") === todayDate &&
    statusMap[booking.id] !== "cancelled"
);


  // Only confirmed status appointments
  const confirmedAppointments = todayAppointments.filter(
    (booking) => statusMap[booking.id] === "confirmed" || statusMap[booking.id] === "completed"
  );
  const pendingAppointments = todayAppointments.filter(
    (booking) => statusMap[booking.id] === "pending"
  );

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>Today’s Appointments</Text>
            <Text style={styles.summaryCount}>{todayAppointments.length}</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>Pending Requests</Text>
            <Text style={styles.summaryCount}>{pendingAppointments.length}</Text>
          </View>
        </View>

        <ScrollView style={styles.cardsContainer}>
          {confirmedAppointments.length === 0 ? (
            <Text style={styles.noAppointmentsText}>
              No Confirmed Appointments for today
            </Text>
          ) : (
            confirmedAppointments.map((booking) => {
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
                    <Text style={styles.statusBadge}>
                      {statusMap[booking.id]}
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
                </View>
              );
            })
          )}
        </ScrollView>
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
  },
  summaryLabel: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 4,
  },
  cardsContainer: {
    marginTop: 20,
    marginBottom: 70,
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
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "600",
  },
  statusBadge: {
    fontSize: 12,
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
  },
  noAppointmentsText: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: 40,
    fontSize: 16,
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
  },
});