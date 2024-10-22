import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import NoteItem from "@/components/NoteItem"; // Pastikan untuk mengimpor NoteItem
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

interface NoteListProps {
  filteredNotes: Note[];
  handleSelectNote: (note: Note) => void;
  setModalVisible: (visible: boolean) => void;
}

const NoteList: React.FC<NoteListProps> = ({
  filteredNotes,
  handleSelectNote,
  setModalVisible,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={filteredNotes}
        renderItem={({ item }) => (
          <NoteItem note={item} onSelect={handleSelectNote} />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>Tidak ada catatan</Text>}
        contentContainerStyle={{ paddingBottom: 200 }} // Sesuaikan padding bawah jika diperlukan
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoteList;
