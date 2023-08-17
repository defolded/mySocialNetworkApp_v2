import axios from "axios";

const instance = axios.create({
  baseURL: "https://newsapi.org/v2/",
  headers: { "X-Api-Key": process.env.REACT_APP_SECRET_KEY },
});

interface ArticlesResponseType {
  source: {
    id: string
    name: string
  }
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
}

interface GetTopHeadlinesForUSResponseType {
  status: "ok" | "error"
  totalResults: number
  articles: ArticlesResponseType[]
}

interface GetTopHeadlinesForUSResponseErrorType {
  status: "error"
  code: string
  message: string
}

export const newsApi = {
  getTopHeadlinesForUS() {
    return instance.get<GetTopHeadlinesForUSResponseType>(`top-headlines?country=us`);
  },
};
