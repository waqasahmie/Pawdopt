// hooks/onlinePresenceTracker.tsx
import { useEffect } from "react";
import { ref, onDisconnect, set, serverTimestamp } from "firebase/database";
import { useUser } from "@clerk/clerk-expo";
import { rtdb } from "../config/firebaseConfig";
import { AppState } from "react-native";

const useOnlinePresenceTracker = () => {
  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) return;

    const userStatusRef = ref(rtdb, `/status/${user.id}`);

    const setOnlineStatus = () => {
      set(userStatusRef, {
        online: true,
        last_changed: serverTimestamp(),
      });

      onDisconnect(userStatusRef).set({
        online: false,
        last_changed: serverTimestamp(),
      });
    };

    setOnlineStatus();

    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        setOnlineStatus();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [user?.id]);
};

export default useOnlinePresenceTracker;
