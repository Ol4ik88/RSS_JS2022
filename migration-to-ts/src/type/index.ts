export interface IEverything {
  status: string;
  totalResults: number;
  articles: Array<Article>;
}

type Article = {
  source: 
  {
    id: string | null;
    name: string
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

export interface ISources {
  status: string;
  sources: Array<Source>;
}

type Source = {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
};