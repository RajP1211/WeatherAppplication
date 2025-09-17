export const filterNews = (articles: any[], temp: number) => {
  if (!articles || articles.length === 0) return [];

  let keywords: string[] = [];

  if (temp <= 15) {
    keywords = ["crisis", "loss", "decline", "sad", "problem", "depression"];
  } else if (temp >= 30) {
    keywords = ["fear", "terror", "risk", "danger", "warning", "alert"];
  } else {
    keywords = ["win", "victory", "success", "growth", "happy", "joy"];
  }

  return articles.filter((article) =>
    keywords.some((kw) =>
      (article.title || "").toLowerCase().includes(kw) ||
      (article.description || "").toLowerCase().includes(kw)
    )
  );
};
