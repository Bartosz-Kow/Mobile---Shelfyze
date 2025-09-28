import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BookDetailScreen() {
  const { t } = useTranslation("details");
  const { id, title, author, publisher, progress, color } =
    useLocalSearchParams<{
      id: string;
      title?: string;
      author?: string;
      publisher?: string;
      progress?: string;
      color?: string;
    }>();

  const router = useRouter();

  const handleDelete = () => {
    console.log("Usuń książkę:", id);
  };

  const handleAnswerQuestions = () => {
    console.log("Odpowiedz na pytania:", id);
  };

  const prog = progress ? parseInt(progress, 10) : 0;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.cover, { backgroundColor: color || "#888" }]}>
          <View style={styles.coverOverlay} />
          <Text numberOfLines={3} style={styles.coverText}>
            {title || t("title")}
          </Text>
        </View>

        <Text style={styles.title}>{title || "Twoja książka"}</Text>
        <Text style={styles.meta}>
          {author || t("authorUnknown")} · {publisher || t("publisherUnknown")}
        </Text>

        <View style={styles.progressWrapper}>
          <View style={[styles.progressFill, { width: `${prog}%` }]} />
        </View>
        <Text style={styles.progressLabel}>
          {" "}
          {t("progress", { progress: prog })}
        </Text>

        <View style={styles.introBox}>
          <Text style={styles.introTitle}>{t("introTitle")}</Text>
          <Text style={styles.introText}>{t("introText")}</Text>
          <Text style={[styles.introText, { marginTop: 12 }]}>
            {t("introDelete")}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.btnWrapper} onPress={handleDelete}>
          <LinearGradient
            colors={["#ff4e50", "#d00000"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.btn}
          >
            <Text style={styles.btnText}>{t("actions.delete")}</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnWrapper}
          onPress={handleAnswerQuestions}
        >
          <LinearGradient
            colors={["#06d6a0", "#118ab2"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.btn}
          >
            <Text style={styles.btnText}>{t("actions.answer")}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    padding: 20,
  },
  content: { flex: 1, marginTop: 20 },
  cover: {
    width: 120,
    height: 170,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    alignSelf: "center",
    overflow: "hidden",
  },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  coverText: {
    fontSize: 13,
    fontFamily: "UnicaOne-Regular",
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 6,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#333",
    textAlign: "center",
  },
  meta: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#666",
    marginBottom: 16,
    textAlign: "center",
  },
  progressWrapper: {
    height: 8,
    backgroundColor: "#d7e1ef",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 4,
  },
  progressFill: { height: "100%", borderRadius: 6, backgroundColor: "#347ac1" },
  progressLabel: {
    fontSize: 12,
    fontFamily: "Roboto-Regular",
    color: "#374151",
    textAlign: "right",
    marginBottom: 20,
  },
  introBox: {
    backgroundColor: "#f4f9ff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  introTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    marginBottom: 8,
    color: "#286161",
  },
  introText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#444",
    lineHeight: 20,
  },
  actions: { marginBottom: 20, gap: 12 },
  btnWrapper: { borderRadius: 14, overflow: "hidden" },
  btn: { paddingVertical: 16, alignItems: "center", borderRadius: 14 },
  btnText: { color: "#fff", fontSize: 18, fontFamily: "Poppins-Bold" },
});
