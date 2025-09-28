import { Book, getBooks } from "@/src/api/books";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colorForTitle } from "../components/home/bookColors";

export default function BookTemplate() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const [loaded] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Roboto-Bold": require("../../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
    "UnicaOne-Regular": require("../../assets/fonts/UnicaOne-Regular.ttf"),
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await getBooks();
        const withExtras = data.map((b) => ({
          ...b,
          progress: Math.floor(Math.random() * 100) + 1,
          color: colorForTitle(b.title),
        }));
        setBooks(withExtras);
      } catch (err) {
        console.error("❌ Błąd przy pobieraniu książek:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (!loaded) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <FlatList
      contentContainerStyle={{ padding: 16 }}
      data={books}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: "/books/[bookId]",
              params: {
                id: item.id.toString(),
                title: item.title,
                author: item.author,
                publisher: item.publisher,
                progress: item.progress.toString(),
                color: String(item.color),
              },
            })
          }
        >
          <View style={[styles.cover, { backgroundColor: item.color }]}>
            <View style={styles.coverOverlay} />
            <Text numberOfLines={3} style={styles.coverText}>
              {item.title}
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.meta}>{item.author}</Text>

            <View style={styles.progressWrapper}>
              <View
                style={[styles.progressFill, { width: `${item.progress}%` }]}
              />
            </View>
            <Text style={styles.progressLabel}>
              {item.progress}% przeczytane
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },

  cover: {
    width: 70,
    height: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.15)",
  },

  coverText: {
    fontSize: 11,
    fontFamily: "UnicaOne-Regular",
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 6,
  },

  content: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
  },

  title: {
    fontSize: 17,
    fontFamily: "Poppins-Bold",
    color: "#1E293B",
    marginBottom: 2,
  },

  meta: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#6B7280",
    marginBottom: 12,
  },

  progressWrapper: {
    height: 8,
    backgroundColor: "#d7e1ef",
    borderRadius: 6,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 6,
    backgroundColor: "#347ac1",
  },

  progressLabel: {
    marginTop: 6,
    fontSize: 12,
    fontFamily: "Roboto-Regular",
    color: "#374151",
  },
});
