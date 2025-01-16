import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { fetchRepos } from "./api";

interface Repo {
    id: number;
    name: string;
    full_name: string;
    description: string;
    created_at?: string;
    last_fetched?: string;
    stargazerCount: number; 
    language: string;
  }

interface ListViewProps {
  onSelectRepo: (repo: Repo) => void;
  language: string;
}

const ListView: React.FC<ListViewProps> = ({ onSelectRepo }) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [language, setLanguage] = useState<string>("");

 
  useEffect(() => {
    const fetchAllRepos = async () => {
      setLoading(true);
      try {
        const now = new Date().toISOString(); // For "last fetched"
        const data = await fetchRepos(language);
  
        // Add `last_fetched` to each repo and sort by stargazerCount
        const enrichedRepos: Repo[] = data.items.map((repo: any) => ({
            id: repo.id,
            name: repo.name,
            full_name: repo.full_name,
            description: repo.description,
            created_at: repo.created_at,
            last_fetched: now,
            language: repo.language,
            stargazerCount: repo.stargazers_count, // Correct property name from GitHub API
          }));
  
        // Sort repos by stargazerCount in descending order
        enrichedRepos.sort((a: Repo, b: Repo) => b.stargazerCount - a.stargazerCount);
  
        setRepos(enrichedRepos);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAllRepos();
  }, [language]);
  

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Most popular GitHub Repositories</Text>
        <Text style={styles.headerText}>Language</Text>
        <Picker
            selectedValue={language}
            onValueChange={(itemValue: string) => setLanguage(itemValue)}
            style={styles.picker}
            itemStyle={{ fontSize: 15, height: 120 }} 
            >
            <Picker.Item label="All" value="" />
            <Picker.Item label="JavaScript" value="javascript" />
            <Picker.Item label="Python" value="python" />
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="C++" value="cpp" />
        </Picker>
        
        <Text style={styles.result}>Result</Text>
      </View>
      
      <FlatList
  data={repos}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => onSelectRepo(item)}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.language}>{item.language || "Not specified"}</Text>
      </View>
      <Text style={styles.subtitle}>{item.full_name}</Text>
      <Text style={styles.content}>{item.description || "No description available."}</Text>
      <Text style={styles.stars}>
        ⭐ {item.stargazerCount ? item.stargazerCount : 0 }
      </Text> 
      
    </TouchableOpacity>
  )}
/>


    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: 'gray',
  },
  header: { 
    padding: 5, 
    marginLeft: 20,
  },
  headerTitle: { 
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
    marginTop: 40,
  },
  result: { 
    color: 'white',
    fontSize: 20,
    marginTop: 6,
    marginBottom: 10,
  },
  headerSubtitle: { 
    color: '#white',
    fontSize: 18,
    marginTop: 6,
    marginBottom: 5,
  },
  headerText: {
    fontSize: 12, 
    color: "white",
    marginTop: 6,
    marginBottom: 6,
  },
  picker: {
    height: 50,
    width: "95%",
    color: '#ebebfa',
    backgroundColor: 'black',
    marginBottom: 15,
    fontSize: 20,
  },
  item: {
    padding: 20, 
    borderBottomWidth: 1, 
    backgroundColor: 'black',
    margin: 4,
    width: "90%",
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { 
    fontSize: 18, 
    color: 'red',
    fontWeight: "bold", 
  }, 
  subtitle: {
    fontSize: 12,
    color: "white",
    lineHeight: 22,
  },
  content: { 
    fontSize: 14, 
    color: "white",
    marginTop: 6,
  },
  language: {
    fontSize: 12,
    color: 'gray',
    fontWeight: "bold",
    marginTop: 5,
  },
  stars: {
    fontSize: 14,
    color: "white", 
    marginTop: 5,
    fontWeight: "bold",
  },
  pickerContainer: {
    marginBottom: 15,
  },
  datePickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  datePicker: {
    height: 120,
    flex: 1,
    color: '#ebebfa',
    backgroundColor: 'black',
    marginRight: 5,
  },
});

export default ListView;