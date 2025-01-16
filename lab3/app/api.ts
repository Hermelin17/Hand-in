export async function fetchRepos(language: string): Promise<any> {
  const today = new Date();
  const timeInterval = new Date(today.setDate(today.getDate() - 100)).toISOString().split("T")[0];
  const url = `https://api.github.com/search/repositories?q=language:${language}+created:>${timeInterval}&sort=stars&order=desc&per_page=30&page=1`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    throw error;
  }
}