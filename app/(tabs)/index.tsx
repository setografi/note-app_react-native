import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  TextInput,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AntDesign from "@expo/vector-icons/AntDesign";
// import backgroundApp from "@/assets/images/backgroundApp.png";
const backgroundApp = require("@/assets/images/backgroundApp.png");

import NoteList from "@/components/NoteList";
import { AddNoteModal } from "@/components/AddNoteModal";
import { ViewNote } from "@/components/ViewNote";
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

export default function HomeScreen() {
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
        setNotes(allNotes.filter((note: Note) => !note.archived));
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>Hallo,</Text>
          <Text style={{ fontWeight: "bold", fontSize: 12 }}>Your Name</Text>
        </View>

        <AntDesign name="user" size={24} color="black" />
      </View>

      <ImageBackground source={backgroundApp} style={styles.backgroundImage}>
        <View style={styles.searchSection}>
          <Text style={{ fontSize: 15, fontWeight: "semibold" }}>Note App</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Search Notes"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </ImageBackground>

      {/* <FlatList
        style={styles.noteSection}
        data={filteredNotes}
        renderItem={({ item }) => (
          <NoteItem
            note={item}
            onSelect={handleSelectNote} // Tambahkan fungsi onSelect
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      {filteredNotes.length === 0 && <Text>Tidak ada catatan</Text>} */}

      <NoteList
        filteredNotes={filteredNotes}
        handleSelectNote={handleSelectNote}
        setModalVisible={setModalVisible}
      />

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
    </ScrollView>
  );
}
