import { useAuth } from "@/src/context/AuthProvider";
import { saveUserImage } from "@/src/utills/saveImage";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function AvatarComponent() {
  const { user, setUser } = useAuth();
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (user?.avatar) {
      setImage(user.avatar);
    }
  }, [user]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && user) {
      const savedPath = await saveUserImage(user.userId, result.assets[0].uri);

      setImage(savedPath);
      setUser({ avatar: savedPath });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatarWrapper} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.avatar} />
        ) : (
          <Ionicons name="person" size={50} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatarWrapper: {
    backgroundColor: "#4266C2",
    borderRadius: 60,
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
});
