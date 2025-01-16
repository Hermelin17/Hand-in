import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ListView from "./listView";
import DetailView from "./detailView";

interface Repo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  created_at?: string; 
  last_fetched?: string; 
  stargazerCount: number;
}

export default function Index() {
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const [language, setLanguage] = useState<string>("javascript"); 

  return (
    <View style={styles.container}>
      {selectedRepo ? (
        <DetailView repo={selectedRepo} onBack={() => setSelectedRepo(null)} />
      ) : (
        <ListView
          language={language} 
          onSelectRepo={(repo) => {
            const now = new Date().toISOString(); 
            setSelectedRepo({ ...repo, last_fetched: now });
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});