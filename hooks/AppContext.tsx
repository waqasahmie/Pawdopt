import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useUser } from "@clerk/clerk-expo"; // or wherever your auth comes from
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig"; // adjust your firebase imports
import AsyncStorage from "@react-native-async-storage/async-storage";

type RegistrationData = {
  role: string | null;
  animalType: string | null;
  favoriteBreeds: string[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  cnicNumber: string;
  frontCNIC: any;
  backCNIC: any;
  profilePicUrl: any;
  organizationName: string;
  longitude: number;
  latitude: number;
  address: string;
  callingCode:string;
  countryCode:string;
};

type PetListingData = {
  category: string;
  breed: [];
  image: any[]; // we will store File objects here first
  age: string;
  gender: string;
  weight: string;
  price: number;
  eyeColor: string;
  name: string;
  description: string;
};

export type UserData = {
  role: string | null;
  animalType: string | null;
  favoriteBreeds: string[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  cnicNumber: string;
  frontCNIC: any;
  backCNIC: any;
  profilePicUrl: any;
  organizationName: string;
  longitude: number;
  latitude: number;
  address: string;
  callingCode:string;
  countryCode:string;
}; // you can extend this later if needed

type VetData = {
  role: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  cnic: string;
  cnicFront: any;
  cnicBack: any;
  profilePicUrl: any;
  title: string;
  clinicName: string;
  startTime: Timestamp;
  endTime: Timestamp;
  license: any;
  email: string;
  experience: string;
  longitude: number;
  latitude: number;
  address: string;
  countryCode:string;
  callingCode:string;
};

type Appointment = {
  id: string;
  vetId: string;
  patientId: string;
  name: string;
  appointmentDate: Timestamp;
  appointmentTime: string;
  status: string;
  picture: string;
};

interface AppContextType {
  isEdit: string | null;
  setIsEdit: (email: string | null) => void;
  statusMap: { [key: string]: string };
  updateStatus: (id: string, newStatus: string, patient: string) => void;
  registrationData: RegistrationData;
  updateRegistrationData: (key: keyof RegistrationData, value: any) => void;

  userData: UserData | null; // 👈 add this
  updateUserData: (data: UserData) => void; // 👈 and this

  fetchUserData: () => void;

  petListingData: PetListingData;
  updatePetListingData: (key: keyof PetListingData, value: any) => void;
  resetPetListingData: () => void;

  tempemail: string | null;
  tempphone: string | null;
  tempcountryCode: string | null;
  tempcallingCode: string | null;
  setTempEmail: (email: string | null) => void;
  setTempPhone: (phone: string | null) => void;
  setTempCountryCode: (phone: string | null) => void;
  setTempCallingCode: (phone: string | null) => void;

  vetData: VetData;
  updateVetData: (key: keyof VetData, value: any) => void;

  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  fetchAppointments: (vetId: string) => Promise<void>;
  recentSearches: string[];
  setRecentSearches: React.Dispatch<React.SetStateAction<string[]>>;
  addRecentSearch: (query: string) => void;
  deleteRecentSearch: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const [statusMap, setStatusMap] = useState<{ [key: string]: string }>({});
  const [userData, setUserData] = useState<UserData | null>(null);
  const [tempemail, setTempEmail] = useState<string | null>(null);
  const [tempphone, setTempPhone] = useState<string | null>(null);
  const [tempcountryCode, setTempCountryCode] = useState<string | null>(null);
  const [tempcallingCode, setTempCallingCode] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isEdit, setIsEdit] = useState<string | null>("false");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const loadRecentSearches = async () => {
      try {
        const saved = await AsyncStorage.getItem('recentSearches');
        if (saved) setRecentSearches(JSON.parse(saved));
      } catch (error) {
      }
    };
    loadRecentSearches();
  }, []);

  useEffect(() => {
    const saveRecentSearches = async () => {
      try {
        await AsyncStorage.setItem('recentSearches', JSON.stringify(recentSearches));
      } catch (error) {
        console.log('Error saving recent searches:', error);
      }
    };
    saveRecentSearches();
  }, [recentSearches]);

  const addRecentSearch = (query: string) => {
    setRecentSearches(prev => {
      const updated = [query.trim(), ...prev.filter(item => item !== query.trim())];
      return updated.slice(0, 5);
    });
  };
  
  const deleteRecentSearch = (query: string) => {
    setRecentSearches(prev => prev.filter(item => item !== query));
  };
  

  const fetchUserData = async () => {
    if (!user?.id) return;

    try {
      const userDocRef = doc(db, "users", user.id); // Fetch data from Firebase using user ID
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const fetchedUserData = userSnap.data() as UserData;
        updateUserData(fetchedUserData); // Update context with fetched data
      } 
    } catch (error) {
    }
  };

  useEffect(() => {
    const loadUserDataFromStorage = async () => {
      try {
        const stored = await AsyncStorage.getItem("userData");
        if (stored) {
          const parsed = JSON.parse(stored);
          setUserData(parsed);
          fetchUserData(); // Only fetch if nothing in storage
        } else {
          fetchUserData(); // Only fetch if nothing in storage
        }
      } catch (e) {
      }
    };

    loadUserDataFromStorage();
  }, []);

  const updateStatus = async (
    id: string,
    newStatus: string,
    patient: string
  ) => {
    try {
      setAppointments((prev) =>
        prev.map((appt) =>
          appt.id === id
            ? {
                ...appt,
                status: newStatus, // update the status field
              }
            : appt
        )
      );
      // Update Firestore
      const apptRef = doc(db, "appointments", id);
      await updateDoc(apptRef, { status: newStatus });

      // Update local state
      //setStatusMap((prev) => ({ ...prev, [id]: newStatus }));
      const userRef = doc(db, "users", patient);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        return;
      }

      const userData = userDoc.data();
      const expoPushToken = userData?.expoPushToken;
      const isLoggedIn=userData?.loggedIn;
      if (expoPushToken && isLoggedIn) {
        const message = {
          to: expoPushToken,
          sound: "default",
          title: "Booking Status Update",
          body: `Your booking has been ${newStatus}.`,
          data: { bookingId: id },
        };

        await fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Accept-Encoding": "gzip, deflate",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        });

        const notificationRef = collection(
          db,
          "users",
          patient,
          "notifications"
        );
        await addDoc(notificationRef, {
          title: "Booking Status Update",
          description: `Your booking has been ${newStatus}.`,
          timestamp: serverTimestamp(),
          read: false,
        });

      }
    } catch (error) {
    }
  };

  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    role: null,
    animalType: null,
    favoriteBreeds: [],
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    cnicNumber: "",
    frontCNIC: null,
    backCNIC: null,
    profilePicUrl: null,
    organizationName: "",
    longitude: 0,
    latitude: 0,
    address: "",
    callingCode:"",
    countryCode:"",
  });

  const [vetData, setVetData] = useState<VetData>({
    title: "",
    firstName: "",
    lastName: "",
    clinicName: "",
    startTime: Timestamp.now(),
    endTime: Timestamp.now(),
    gender: "",
    license: "",
    email: "",
    phoneNumber: "",
    cnic: "",
    cnicFront: null,
    cnicBack: null,
    profilePicUrl: null,
    role: "",
    experience: "",
    longitude: 0,
    latitude: 0,
    address: "",
    countryCode:"",
    callingCode:"",
  });

  const updateVetData = (key: keyof VetData, value: any) => {
    setVetData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const [petListingData, setPetListingData] = useState<PetListingData>({
    category: "",
    breed: [],
    image: [],
    age: "",
    gender: "",
    weight: "",
    price: 0,
    eyeColor: "",
    name: "",
    description: "",
  });

  const updatePetListingData = (key: keyof PetListingData, value: any) => {
    setPetListingData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetPetListingData = () => {
    setPetListingData({
      category: "",
      breed: [],
      image: [],
      age: "",
      gender: "",
      weight: "",
      price: 0,
      eyeColor: "",
      name: "",
      description: "",
    });
  };

  const updateRegistrationData = (key: keyof RegistrationData, value: any) => {
    setRegistrationData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateUserData = async (data: UserData) => {
    setUserData(data);
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(data));
    } catch (e) {
    }
  };

  const fetchAppointments = async (vetId: string) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const sixDaysLater = new Date(today);
      sixDaysLater.setDate(today.getDate() + 6);

      const appointmentsRef = collection(db, "appointments");
      const q = query(
        appointmentsRef,
        where("vetId", "==", vetId),
        where("appointmentDate", ">=", Timestamp.fromDate(today)),
        where("appointmentDate", "<=", Timestamp.fromDate(sixDaysLater))
      );

      const querySnapshot = await getDocs(q);
      const fetchedAppointments: Appointment[] = [];

      querySnapshot.forEach((doc) => {
        fetchedAppointments.push({ id: doc.id, ...doc.data() } as Appointment);
      });

      setAppointments(fetchedAppointments);
    } catch (error) {
    }
  };

  return (
    <AppContext.Provider
      value={{
        statusMap,
        updateStatus,
        registrationData,
        updateRegistrationData,
        userData,
        updateUserData,
        fetchUserData,
        petListingData,
        updatePetListingData,
        resetPetListingData,
        tempemail,
        tempphone,
        tempcountryCode,
        tempcallingCode,
        setTempEmail,
        setTempPhone,
        setTempCountryCode,
        setTempCallingCode,
        vetData,
        updateVetData,
        appointments,
        setAppointments,
        fetchAppointments,
        isEdit,
        setIsEdit,
        recentSearches,
        setRecentSearches,
        deleteRecentSearch,
        addRecentSearch
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
