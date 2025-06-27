import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
  Pressable,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  RefreshControl,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  getDoc,
  limit,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import {
  doc,
  onSnapshot,
  addDoc,
  serverTimestamp,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { ref, get } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppContext } from "@/hooks/AppContext";
import responsive from "@/constants/Responsive";
import Toast from "@/components/utils/toast";

interface Chat {
  id: string;
  participants: string[];
  lastMessage?: string;
  timestamp?: any;
  isSeenByCurrentUser?: boolean;
  otherUser?: {
    id: string;
    name: string;
    profilePicUrl: string;
  };
}

interface UserData {
  firstName: string;
  lastName?: string; // Make optional
  title?: string;   // Make optional
  profilePicUrl: string;
}

export default function InboxScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [chats, setChats] = useState<Chat[]>([]);
  const { user } = useUser();
  const router = useRouter();
  const { userData, updateUserData } = useAppContext();
  const toastRef = useRef<any>({});
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchChats();
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const loadCachedChats = async () => {
      try {
        const cachedChats = await AsyncStorage.getItem("cachedChats");
        if (cachedChats) {
          const parsed = JSON.parse(cachedChats);
          const parsedChats = parsed.map((chat: any) => ({
            ...chat,
            timestamp: chat.timestamp ? new Date(chat.timestamp) : null,
          }));
          setChats(parsedChats);
        }
      } catch (error) {
        toastRef.current.show({
          type: "error",
          title: "Chat Load Failed",
          description: "Couldn’t access cached messages.",
        });
      }
    };

    const subscribeToChats = () => {
      const chatsRef = collection(db, "chats");
      const q = query(
        chatsRef,
        where("participants", "array-contains", user?.id),
        orderBy("timestamp", "desc")
      );

      unsubscribe = onSnapshot(q, () => {
        fetchChats();
      });
    };

    if (user?.id) {
      loadCachedChats().then(subscribeToChats);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user?.id]);

  const fetchChats = async () => {
    if (!user?.id) return;

    const chatsRef = collection(db, "chats");
    const q = query(
      chatsRef,
      where("participants", "array-contains", user.id),
      orderBy("timestamp", "desc")
    );

    const querySnapshot = await getDocs(q);
    const chatsData: Chat[] = [];

    for (const docSnap of querySnapshot.docs) {
      const data = docSnap.data();
      const participants = data.participants || [];
      const otherUserId = participants.find((id: string) => id !== user.id);
      if (!otherUserId) continue;

      const userDoc = await getDoc(doc(db, "users", otherUserId));
      if (!userDoc.exists()) continue;

      const userData = userDoc.data() as UserData;

      const messagesRef = collection(db, "chats", docSnap.id, "messages");
      const messagesQuery = query(
        messagesRef,
        orderBy("timestamp", "desc"),
        limit(1)
      );
      const messagesSnap = await getDocs(messagesQuery);

      let isSeen = false;
      if (!messagesSnap.empty) {
        const latestMsg = messagesSnap.docs[0].data();
        const seenBy = latestMsg.seenBy || [];
        isSeen = seenBy.includes(user.id);
      }

      if (data.lastMessage) {
        chatsData.push({
          id: docSnap.id,
          participants,
          lastMessage: data.lastMessage || "",
          timestamp: data.timestamp?.toDate() || new Date(),
          otherUser: {
            id: userDoc.id,
            name: formatUserName(userData) || "Unknown User",
            profilePicUrl: userData.profilePicUrl || "",
          },
          isSeenByCurrentUser: isSeen,
        });
      }
    }

    setChats(chatsData);
    await AsyncStorage.setItem("cachedChats", JSON.stringify(chatsData));
  };

  const formatUserName = (user: UserData): string => {
    const parts: string[] = [];
    if (user.title) parts.push(user.title);
    parts.push(user.firstName);
    if (user.lastName) parts.push(user.lastName);
    return parts.join(" ");
  };


  const markMessageAsRead = async (chatId: string) => {
    try {
      const latestMsgRef = query(
        collection(db, "chats", chatId, "messages"),
        orderBy("timestamp", "desc"),
        limit(1)
      );

      const snapshot = await getDocs(latestMsgRef);

      if (!snapshot.empty) {
        const latestMsg = snapshot.docs[0];
        const data = latestMsg.data();

        const seenBy = new Set(data.seenBy || []);
        if (!seenBy.has(user?.id)) {
          seenBy.add(user?.id);
          await setDoc(
            doc(db, "chats", chatId, "messages", latestMsg.id),
            { seenBy: Array.from(seenBy) },
            { merge: true }
          );
        }
      }
    } catch (error) {
      console.error("Failed to mark message as read:", error);
    }
  };
  const handlePress = (chatId: string) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId ? { ...chat, isSeenByCurrentUser: true } : chat
      )
    );

    // Navigate immediately
    router.push({
      pathname: "/(chat)/[chat]",
      params: { chat: chatId },
    });

    // Firestore update (in background)
    markMessageAsRead(chatId);
  };

  const filteredChats = chats.filter((chat) =>
    chat.otherUser?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const renderChatItem = ({ item }: { item: any }) => {
    const chat = item;
    return (
      <Pressable
        style={styles.messageItem}
        onPress={() => handlePress(chat.id)}
      >
        <View style={styles.imageContainer}>
          <Image
            source={
              !chat.otherUser?.profilePicUrl
                ? require("../../assets/images/avatar.png")
                : { uri: chat.otherUser.profilePicUrl }
            }
            style={styles.users}
          />
        </View>

        <View style={styles.messageContent}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{chat.otherUser?.name}</Text>
            <Text style={styles.timestamp}>
              {chat.timestamp?.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>

          <View style={styles.messageRow}>
            <Text
              style={[
                styles.messageText,
                !chat.isSeenByCurrentUser && { fontWeight: "bold" },
                chat.isSeenByCurrentUser && styles.readMessageText,
              ]}
              numberOfLines={1}
            >
              {chat.lastMessage}
            </Text>
            {!chat.isSeenByCurrentUser && <View style={styles.unreadDot} />}
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <StatusBar barStyle="dark-content" />
          <View style={styles.headerContainer}>
            <TextInput
              placeholder="Search for owners and vets"
              style={styles.searchInput}
              placeholderTextColor="#939393"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            <View style={styles.searchIcon}>
              <HugeiconsIcon
                icon={Search01Icon}
                size={19}
                style={styles.searchIcon}
              />
            </View>
            <Image
              source={
                userData?.profilePicUrl
                  ? { uri: userData.profilePicUrl }
                  : require("../../assets/images/avatar.png")
              }
              style={styles.avatar}
            />
          </View>
          <Text style={styles.header}>Inbox</Text>
          <FlatList
            data={filteredChats}
            keyExtractor={(item) => item.id}
            renderItem={renderChatItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
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
              <View style={styles.noteContainer}>
                <Text style={styles.note}>
                  Your personal messages are{" "}
                  <Text style={styles.noteColor}>end-to-end encrypted</Text>
                </Text>
              </View>
            }
          />
        </View>
        <Toast ref={toastRef} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    width: "100%",
    paddingTop: Platform.OS === "ios" ? 30 : 20,
    marginBottom: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchInput: {
    width: "80%",
    height: 40,
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 40,
  },
  searchIcon: {
    position: "relative",
    right: 40,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  scrollContainer: {
    width: "100%",
    marginBottom: Platform.OS === "ios" ? "55%" : "64%",
  },
  header: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(33) : responsive.fontSize(30),
    fontWeight: "600",
    marginBottom: 20,
  },
  messageItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },
  imageContainer: {
    marginRight: 12,
    marginLeft: 3,
  },
  users: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: "absolute",
    right: 1,
    bottom: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  messageContent: {
    width: "82%",
  },

  name: {
    fontWeight: "500",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
  },
  readMessageText: {
    color: "#939393",
  },
  noteContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 50,
  },
  note: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
    fontWeight: "400",
    color: "#939393",
  },
  noteColor: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
    fontWeight: "600",
    color: "#2BBFFF",
  },
  messageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  messageText: {
    flex: 1,
    fontWeight: "400",
    width: "80%",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
    color: "#000",
    top: 5,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timestamp: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(12) : responsive.fontSize(10),
    color: "#939393",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2BBFFF",
    marginLeft: 6,
    alignSelf: "center",
    top: 5,
    right: 6,
  },
});
