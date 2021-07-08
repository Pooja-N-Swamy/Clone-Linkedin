import React from "react";
import "./Widgets.css";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

export default function Widgets() {
  const newsArticle = (heading, subtitle) => (
    <div className="widgets_article">
      <div className="widgets_articleLeft">
        <FiberManualRecordIcon />
      </div>
      <div className="widgets_articleLRight">
        <h4>{heading}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  );
  return (
    <div className="widgets">
      <div className="widgets__header">
        <h2>LinkedIn News</h2>
        <InfoOutlinedIcon />
      </div>
      {newsArticle("LinkedIn clone", "Top news - 9086 readers")}
      {newsArticle("Coronavirus:India updates", "Top news - 876 readers")}
      {newsArticle("Fall in love with Redux !!!", "Top news - 8656 readers")}
    </div>
  );
}
