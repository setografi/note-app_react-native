import React, { useState } from "react";
import {
  Modal,
  View,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";

import { styles } from "@/assets/styles/styles";

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
      <View style={styles.addContainer}>
        <View style={styles.flexAdd}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="arrow-back-outline" size={24} color="#202020" />
            </TouchableOpacity>

            <TextInput
              placeholder="Title"
              placeholderTextColor="#B3B3B3"
              value={title}
              onChangeText={setTitle}
              style={styles.addInput}
            />
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 24,
              alignItems: "center",
            }}
          >
            <TouchableOpacity>
              <Ionicons name="reader-outline" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={addNote}>
              <Ionicons name="checkmark-outline" size={24} color="#202020" />
            </TouchableOpacity>
          </View>
        </View>

        <TextInput
          placeholder="Type something"
          placeholderTextColor="#B3B3B3"
          value={body}
          numberOfLines={10}
          multiline={true}
          onChangeText={setBody}
          style={[
            styles.addInput,
            {
              flex: 1,
              textAlignVertical: "top",
              height: "100%",
            },
          ]}
        />
      </View>

      {/* <Button title="Cancel" onPress={onClose} color="red" /> */}
      {/* <Button title="Add Note" onPress={addNote} /> */}
    </Modal>
  );
};
