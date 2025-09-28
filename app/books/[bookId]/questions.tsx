import {
  answerQuestion,
  getBookProgress,
  getBookQuestions,
  Question,
  updateBookProgress,
} from "@/src/api/books";
import Logo from "@/src/components/auth/Logo";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function QuestionsScreen() {
  const { bookId } = useLocalSearchParams<{ bookId: string }>();
  const router = useRouter();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number | null }>({});

  useEffect(() => {
    (async () => {
      try {
        const data = await getBookQuestions(Number(bookId));
        setQuestions(data);

        const initial = data.reduce((acc, q) => {
          acc[q.id] = q.answer ?? null;
          return acc;
        }, {} as { [key: number]: number | null });
        setAnswers(initial);

        const progress = await getBookProgress(Number(bookId));
        if (progress.last_question_id) {
          const idx = data.findIndex((q) => q.id === progress.last_question_id);
          if (idx >= 0) setCurrentIndex(idx);
        }
      } catch (e) {
        console.error("❌ Błąd pobierania pytań/progresu:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [bookId]);

  const handleAnswer = async (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    try {
      await answerQuestion(Number(bookId), questionId, value);
      await updateBookProgress(Number(bookId), questionId);
    } catch (e) {
      console.error("❌ Błąd zapisu odpowiedzi:", e);
    }
  };

  const goToQuestion = async (newIndex: number) => {
    if (newIndex === currentIndex) return;
    setCurrentIndex(newIndex);
    try {
      const q = questions[newIndex];
      if (q) {
        await updateBookProgress(Number(bookId), q.id);
      }
    } catch (e) {
      console.error("❌ Błąd zapisu progresu:", e);
    }
  };

  const handleExit = async () => {
    try {
      const currentQ = questions[currentIndex];
      if (currentQ) {
        await updateBookProgress(Number(bookId), currentQ.id);
      }
    } catch (e) {
      console.error("❌ Błąd zapisu progresu przy wyjściu:", e);
    } finally {
      router.replace("/(tabs)");
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4266C2" />
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Brak pytań 😢</Text>
      </View>
    );
  }

  const current = questions[currentIndex];
  const currentAnswer = answers[current.id];

  return (
    <View style={styles.container}>
      {/* Logo + exit */}
      <View style={styles.header}>
        <Logo size={40} />
        <TouchableOpacity style={styles.closeBtn} onPress={handleExit}>
          <Ionicons name="close" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Pytanie */}
      <Text style={styles.question}>
        {currentIndex + 1}. {current.question_text}
      </Text>

      {/* Opcje */}
      <View style={styles.options}>
        {[1, 2, 3, 4, 5].map((val) => (
          <TouchableOpacity
            key={val}
            style={[
              styles.option,
              currentAnswer === val && styles.optionSelected,
            ]}
            onPress={() => handleAnswer(current.id, val)}
          >
            <Text
              style={[
                styles.optionText,
                currentAnswer === val && styles.optionTextSelected,
              ]}
            >
              {val}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Nawigacja */}
      <View style={styles.navigation}>
        <TouchableOpacity
          disabled={currentIndex === 0}
          onPress={() => goToQuestion(currentIndex - 1)}
          style={[styles.navBtn, currentIndex === 0 && { opacity: 0.5 }]}
        >
          <Text style={styles.navText}>⬅ Cofnij</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={currentIndex === questions.length - 1}
          onPress={() => goToQuestion(currentIndex + 1)}
          style={[
            styles.navBtn,
            currentIndex === questions.length - 1 && { opacity: 0.5 },
          ]}
        >
          <Text style={styles.navText}>Dalej ➡</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9fafc" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  closeBtn: {
    backgroundColor: "#f1f1f1",
    padding: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  question: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
    lineHeight: 28,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#777",
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 40,
    marginTop: 20,
  },
  option: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#4266C2",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  optionSelected: {
    backgroundColor: "#4266C2",
  },
  optionText: {
    fontSize: 18,
    fontFamily: "Roboto-Bold",
    color: "#4266C2",
  },
  optionTextSelected: {
    color: "#fff",
    fontFamily: "Roboto-Bold",
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
  },
  navBtn: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: "#4266C2",
    borderRadius: 12,
  },
  navText: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#fff",
  },
});
