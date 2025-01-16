import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

interface Repo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  created_at?: string;
  last_fetched?: string;
  stargazerCount: number;
}

interface DetailViewProps {
  repo: Repo;
  onBack: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ repo, onBack }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.item}>
        <Text style={styles.title}>{repo.name}</Text>
        <Text style={styles.subtitle}>Full Name:</Text>
        <Text style={styles.content}>{repo.full_name}</Text>
        <Text style={styles.subtitle}>Description:</Text>
        <Text style={styles.content}>{repo.description || "No description available."}</Text>
        <Text style={styles.subtitle}>Created At:</Text>
        <Text style={styles.content}>{repo.created_at}</Text>
        <Text style={styles.subtitle}>Last Fetched At:</Text>
        <Text style={styles.content}>{repo.last_fetched}</Text>
        <Text style={styles.subtitle}>Stars</Text>
        <Text style={styles.content}>{repo.stargazerCount}⭐</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onBack} style={styles.button}>
          <Text style={styles.buttonText}>Back to List</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "gray",
  },
  item: {
    backgroundColor: "black",
    borderRadius: 10,
    padding: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginTop: 15,
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    color: "gray",
    lineHeight: 22,
  },
  buttonContainer: {
    marginTop: 20,
    alignSelf: "center",
    width: 120,
  },
  button: {
    borderRadius: 8,
    width: 120,
    height: 30,
    backgroundColor: "white",
    color: 'white',
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    paddingTop: 5,
  },
});

export default DetailView;