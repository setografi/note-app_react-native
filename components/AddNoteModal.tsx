import React, { useState } from "react";
import {
  Modal,
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@notes";

interface AddNoteModalProps {
  visible: boolean;
  onClose: () => void;
  onNoteAdded: () => void;
}

export const AddNoteModal: React.FC<AddNoteModalProps> = ({
  visible,
  onClose,
  onNoteAdded,
}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const addNote = async () => {
    if (!title.trim() || !body.trim()) {
      Alert.alert("Error", "Title and body cannot be empty");
      return;
    }

    const newNote = {
      id: +new Date(),
      title,
      body,
      archived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      bookmarked: false,
    };

    try {
      const existingNotesJson = await AsyncStorage.getItem(STORAGE_KEY);
      const existingNotes = existingNotesJson
        ? JSON.parse(existingNotesJson)
        : [];
      const updatedNotes = [...existingNotes, newNote];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
      onNoteAdded(); // Panggil callback untuk notifikasi
      onClose(); // Tutup modal setelah menambahkan catatan
    } catch (error) {
      console.error("Failed to save note", error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="Body"
          value={body}
          onChangeText={setBody}
          style={styles.input}
        />
        <Button title="Add Note" onPress={addNote} />
        <Button title="Cancel" onPress={onClose} color="red" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
