import React, { useContext } from "react";
import { ShowContext } from "../Store";

const Show = () => {
  // using show after fetch the data
  const [show] = useContext(ShowContext);

  if (show.state === "initial") {
    return <h1>Loading...</h1>;
  }
  const showData = show.data;
  return (
    <div className="show">
      <h1 className="show__title">{showData.name}</h1>
      <div className="show__wrapper">
        <section className="show__general">
          <aside className="show__image">
            <img src={showData.image.medium} alt="the powerpuff girls" />
          </aside>
          <article
            className="show__summary"
            dangerouslySetInnerHTML={{ __html: showData.summary }}
          />
        </section>
        <section className="show__info">
          <h2 className="show__info__title">Show Info</h2>
          <p>
            <strong>Network:</strong> {showData.status}
          </p>
          <p>
            <strong>Schedule:</strong> {showData.schedule.days.map(day => day)}{" "}
            {showData.schedule.time}
          </p>
          <p>
            <strong>Status:</strong> {showData.status}
          </p>
          <p>
            <strong>Show Type:</strong> {showData.type}
          </p>
          <p>
            <strong>Genres:</strong>{" "}
            {showData.genres.map((genre, index) => {
              if (showData.genres.length !== index + 1) {
                return genre + ", ";
              }
              return genre;
            })}
          </p>
          <p>
            <strong>Official site:</strong>{" "}
            <a className="show__info__link" href={showData.officialSite}>
              www.cartoonnetwork.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Show;
