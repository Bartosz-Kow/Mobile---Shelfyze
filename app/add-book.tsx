import { addBook } from "@/src/api/books";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddBookModal() {
  const router = useRouter();
  const { t } = useTranslation("addbook");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !author.trim() || !publisher.trim()) {
      Alert.alert("Błąd", "Uzupełnij wszystkie pola!");
      return;
    }

    try {
      setLoading(true);
      const res = await addBook({ title, author, publisher });

      if (res.bookId) {
        router.back();
      } else {
        Alert.alert("Błąd", res.error || "Nie udało się dodać książki");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Błąd", "Coś poszło nie tak");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Header */}
      <LinearGradient
        colors={["#4266C2", "#286161"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.headerTitle}>{t("header.title")}</Text>
          <Text style={styles.headerSubtitle}>{t("header.subtitle")}</Text>
        </View>
        <View style={{ width: 40 }} />
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <Text style={styles.sectionTitle}>{t("section.basicInfo")}</Text>

        <View style={styles.field}>
          <Text style={styles.label}>{t("fields.title.label")}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("fields.title.placeholder")}
            placeholderTextColor="#aaa"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>{t("fields.author.label")}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("fields.author.placeholder")}
            placeholderTextColor="#aaa"
            value={author}
            onChangeText={setAuthor}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>{t("fields.publisher.label")}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("fields.publisher.placeholder")}
            placeholderTextColor="#aaa"
            value={publisher}
            onChangeText={setPublisher}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.saveButtonWrapper}
        onPress={handleSave}
        activeOpacity={0.85}
        disabled={loading}
      >
        <LinearGradient
          colors={["#4266C2", "#286161"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.saveButton}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>{t("actions.save")}</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  closeText: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "Poppins-Regular",
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#333",
    marginBottom: 15,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#555",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#111",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  saveButtonWrapper: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  saveButton: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Poppins-Bold",
  },
});
