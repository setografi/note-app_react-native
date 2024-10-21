import React, { useState, useEffect } from "react";
import {
  Image,
  TextInput,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import NoteItem from "@/components/NoteItem";
import { AddNoteModal } from "@/components/AddNoteModal";
import { ViewNote } from "@/components/ViewNote"; // Impor ViewNote
import { styles } from "@/assets/styles/styles";

type Note = {
  id: number | string;
  title: string;
  body: string;
  archived: boolean;
  createdAt: string;
  updatedAt?: string;
  bookmarked: boolean;
};

const STORAGE_KEY = "@notes";

export default function HomeScreen({ navigation }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null); // State untuk menyimpan catatan yang dipilih

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const jsonNotes = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonNotes) {
        const allNotes = JSON.parse(jsonNotes);
        setNotes(allNotes.filter((note) => !note.archived));
      }
    } catch (error) {
      console.error("Failed to load notes", error);
    }
  };

  const saveNotes = async (notesToSave: Note[]) => {
    try {
      const jsonNotes = JSON.stringify(notesToSave);
      await AsyncStorage.setItem(STORAGE_KEY, jsonNotes);
    } catch (error) {
      console.error("Failed to save notes", error);
    }
  };

  const deleteNote = (id: number | string) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const archiveNote = (id: number | string) => {
    const updatedNotes = notes.map((note) =>
      note.id === id
        ? { ...note, archived: true, updatedAt: new Date().toISOString() }
        : note
    );
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const toggleBookmark = (id: number | string) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, bookmarked: !note.bookmarked } : note
    );
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note); // Simpan catatan yang dipilih
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/TodoImg.jpg")}
          style={styles.todoBg}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Todolist App</ThemedText>

        <TextInput
          style={styles.searchInput}
          placeholder="Search Notes"
          value={search}
          onChangeText={setSearch}
        />
      </ThemedView>

      <FlatList
        data={filteredNotes}
        renderItem={({ item }) => (
          <NoteItem
            note={item}
            onSelect={handleSelectNote} // Tambahkan fungsi onSelect
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      {filteredNotes.length === 0 && <ThemedText>Tidak ada catatan</ThemedText>}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <ThemedText style={styles.addButtonText}>+</ThemedText>
      </TouchableOpacity>

      <AddNoteModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onNoteAdded={loadNotes}
      />

      {/* Modal untuk menampilkan detail catatan */}
      {selectedNote && (
        <ViewNote
          visible={true}
          note={selectedNote}
          onClose={() => setSelectedNote(null)} // Tutup modal dengan menghapus catatan yang dipilih
          onDelete={deleteNote}
          onArchive={archiveNote}
          onBookmark={toggleBookmark}
        />
      )}
    </ParallaxScrollView>
  );
}
