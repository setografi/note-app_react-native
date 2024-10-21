import React from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";
import { Note } from "@/constants/Note"; // Sesuaikan dengan lokasi tipe Note kamu

interface ViewNoteProps {
  visible: boolean;
  note: Note;
  onClose: () => void;
  onDelete: (id: number | string) => void;
  onArchive: (id: number | string) => void;
  onBookmark: (id: number | string) => void;
}

export const ViewNote: React.FC<ViewNoteProps> = ({
  visible,
  note,
  onClose,
  onDelete,
  onArchive,
  onBookmark,
}) => {
  if (!note) return null;

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.body}>{note.body}</Text>
        <Text style={styles.date}>
          {new Date(note.createdAt).toLocaleDateString()}
        </Text>

        <Button
          title="Delete"
          onPress={() => {
            onDelete(note.id);
            onClose();
          }}
        />
        <Button
          title={note.archived ? "Unarchive" : "Archive"}
          onPress={() => {
            onArchive(note.id);
            onClose();
          }}
        />
        <Button
          title={note.bookmarked ? "Unbookmark" : "Bookmark"}
          onPress={() => {
            onBookmark(note.id);
            onClose();
          }}
        />
        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold" },
  body: { marginVertical: 20 },
  date: { color: "gray" },
});
