import React from "react";

const NewsItem = (props) => {
  let { title, description, imgUrl, newsUrl, date, author, source } = props;

  return (
    <div>
      <div className="card">
        <span
          className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
          style={{ zIndex: "1", left: "50%" }}
        >
          {source === null
            ? source
            : source.name === null
              ? "Unknown"
              : source.name}
          <span className="visually-hidden">Article source</span>
        </span>
        <img src={imgUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-body-secondary">
              By "{author}" <br />
              date: {new Date(date).toUTCString()}
            </small>
          </p>
          <a
            href={newsUrl}
            rel="noreferrer"
            target="_blank"
            className="btn btn-sm btn-primary"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
