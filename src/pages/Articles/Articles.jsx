// src/Pages/Articles/Articles.jsx
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ArticleHeader from "./ArticlesHeader";
import ArticleCard from "./ArticlesCard";
import styles from "./Articles.module.css";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Articles = () => {
  const [data, setData] = useState({
    articles: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Initialize AOS for scroll animations
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
    });

    // Function to fetch data from the server
    const loadData = async () => {
      try {
        const response = await fetch(
          "https://drfathiserver.onrender.com/api/v1/article",
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error(
            `Error fetching data (status code: ${response.status})`
          );
        }
        const articles = await response.json();
        setData({
          articles,
          loading: false,
          error: null,
        });
      } catch (error) {
        setData({
          articles: [],
          loading: false,
          error: error.message || "Error fetching articles.",
        });
      }
    };

    loadData();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.gradientBackground} />

      <div className={styles.container}>
        <ArticleHeader />

        {data.loading ? (
          <div className={styles.loading}>
            <LoadingSpinner />
          </div>
        ) : data.error ? (
          <div className={styles.error}>{data.error}</div>
        ) : (
          <div className={styles.grid}>
            {data.articles.map((article, index) => (
              <ArticleCard
                key={article._id || index}
                article={article}
                delay={index * 150}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Articles;
