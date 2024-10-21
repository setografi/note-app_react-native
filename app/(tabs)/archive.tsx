import React, { useEffect, useState } from "react";
import { Image, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import NoteItem from "@/components/NoteItem";
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

export default function ArchiveScreen() {
  const [archivedNotes, setArchivedNotes] = useState<Note[]>([]);

  useEffect(() => {
    loadArchivedNotes();
  }, []);

  const loadArchivedNotes = async () => {
    try {
      const jsonNotes = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonNotes) {
        const allNotes = JSON.parse(jsonNotes);
        setArchivedNotes(allNotes.filter((note) => note.archived)); // Ambil catatan yang diarsipkan
      }
    } catch (error) {
      console.error("Failed to load archived notes", error);
    }
  };

  const unarchiveNote = async (id: number | string) => {
    const updatedNotes = archivedNotes.map((note) =>
      note.id === id
        ? { ...note, archived: false, updatedAt: new Date().toISOString() }
        : note
    );
    setArchivedNotes(updatedNotes);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
  };

  const deleteNote = async (id: number | string) => {
    const updatedNotes = archivedNotes.filter((note) => note.id !== id);
    setArchivedNotes(updatedNotes);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={require("@/assets/images/TodoImg.jpg")}
          style={styles.todoBg}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Archived Notes</ThemedText>
      </ThemedView>

      <FlatList
        data={archivedNotes}
        renderItem={({ item }) => (
          <NoteItem
            note={item}
            onDelete={deleteNote}
            onArchive={unarchiveNote} // Menggunakan unarchiveNote untuk mengembalikan
            onBookmark={() => {}} // Implementasikan jika diperlukan
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </ParallaxScrollView>
  );
}
