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
  TouchableOpacity,
} from "react-native";
import { FormField } from "../components/addbook/FormField";
import { GradientHeader } from "../components/addbook/GradientHeader";

export default function BookTemplate() {
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
      <GradientHeader
        title={t("header.title")}
        subtitle={t("header.subtitle")}
        onClose={() => router.back()}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <Text style={styles.sectionTitle}>{t("section.basicInfo")}</Text>

        <FormField
          label={t("fields.title.label")}
          placeholder={t("fields.title.placeholder")}
          value={title}
          onChangeText={setTitle}
        />
        <FormField
          label={t("fields.author.label")}
          placeholder={t("fields.author.placeholder")}
          value={author}
          onChangeText={setAuthor}
        />
        <FormField
          label={t("fields.publisher.label")}
          placeholder={t("fields.publisher.placeholder")}
          value={publisher}
          onChangeText={setPublisher}
        />
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
