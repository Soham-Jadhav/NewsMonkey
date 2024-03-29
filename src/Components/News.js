import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [articleCover, setArticleCover] = useState(0);
  const [articleSize, setArticleSize] = useState(0);

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(50);
    setArticles(parseData.articles);
    setLoading(false);
    setArticleCover(articleCover + props.pageSize);
    setArticleSize(parseData.totalResults);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `News Monkey - ${props.category[0].toUpperCase() + props.category.slice(1)
      }`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country
      }&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize
      }&page=${page + 1}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles));
    setArticleCover(articleCover + props.pageSize);
    setArticleSize(parseData.totalResults);
  };

  return (
    <div className="container my-3" style={{ textAlign: "center" }}>
      <h1 style={{ padding: "20px", fontFamily: "fantasy", marginTop: "85px" }}>
        NewsMonkey - TOP HEADLINES!
      </h1>
      <h1 style={{ marginBottom: "30px", fontFamily: "fantasy" }}>
        {props.category[0].toUpperCase() + props.category.slice(1)} News
      </h1>
      {loading && (
        <div className="container">
          <Spinner />
        </div>
      )}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < articleSize}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row my-3">
            {articles.map((element) => {
              return (
                <div className="col-md-4 my-2" key={element.url}>
                  <NewsItem
                    title={
                      element.title !== null ? element.title.slice(0, 45) : ""
                    }
                    description={
                      element.description !== null
                        ? element.description.slice(0, 100)
                        : ""
                    }
                    imgUrl={
                      element.urlToImage !== null
                        ? element.urlToImage
                        : "https://thumbs.dreamstime.com/b/news-presenter-avatar-character-vector-illustration-design-news-presenter-avatar-character-109167094.jpg"
                    }
                    newsUrl={element.url}
                    date={
                      element.publishedAt !== null
                        ? element.publishedAt
                        : "Unknown"
                    }
                    author={
                      element.author !== null ? element.author : "Anonymous"
                    }
                    source={
                      element.source !== null ? element.source : "Unknown"
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>

    </div>
  );
};

News.defaultProps = {
  pageSize: 9,
  country: "in",
  category: "general",
};

News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
};

export default News;
