import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";

export default function InputDialog({
  visible,
  onClose,
  onSubmit,
}: {
  visible: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
}) {
  const [value, setValue] = useState("");
  const { t } = useTranslation("settings");

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>{t("settings.changeName")}</Text>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={setValue}
            placeholder={t(
              "settings.alerts.enterNewName",
              "Please enter your new username"
            )}
          />
          <View style={styles.row}>
            <Button title={t("settings.alerts.cancel")} onPress={onClose} />
            <Button
              title={t("settings.alerts.confirmChange")}
              onPress={() => {
                if (value.trim()) {
                  onSubmit(value.trim());
                  setValue("");
                  onClose();
                }
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
});
