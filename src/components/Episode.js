import React, { useEffect, useContext } from "react";
import { useParams } from "react-router";
import { EpisodesContext, ShowContext } from "../Store";
import { Link } from "react-router-dom";

const Episode = () => {
  const [episodes, setEpisodes] = useContext(EpisodesContext);
  const [show] = useContext(ShowContext);
  const { showId, episodeId } = useParams();
  useEffect(() => {
    const fetchEpisodes = async () => {
      const episodesResponse = await fetch(
        `http://api.tvmaze.com/shows/${showId}/episodes?specials=1`
      ).then(res => res.json());

      setEpisodes({
        state: "loaded",
        data: episodesResponse
      });
    };
    if (episodes.state === "initial") {
      fetchEpisodes();
    }
  }, []);

  if (episodes.state === "initial") {
    return <h1>Loading...</h1>;
  }
  const currentEpisode = episodes.data.findIndex(
    episode => episode.id === Number(episodeId)
  );

  const episodeData = episodes.data[currentEpisode];
  const noImageUrl =
    "http://static.tvmaze.com/images/no-img/no-img-landscape-text.png";
  return (
    <div className="episode">
      <h1>{episodeData.name}</h1>
      <div className="episode__wrapper">
        <section className="episode__general">
          <aside>
            <img
              className="episode__image"
              src={episodeData.image ? episodeData.image.medium : noImageUrl}
              alt="episode"
            />
          </aside>
          <article
            className="episode__summary"
            dangerouslySetInnerHTML={{
              __html:
                episodeData.summary === ""
                  ? `<div className="episode__summary">No summary founded</div>`
                  : episodeData.summary
            }}
          />
        </section>
        <section className="episode__info">
          <h2 className="episode__info__title">Show Info</h2>
          <p>
            <strong>Show:</strong>{" "}
            <Link
              className="episode__info__link"
              to={`/shows/${show.data.id}/${show.data.name.replace(
                /\s/g,
                "-"
              )}`}
              replace
            >
              {show.data.name}
            </Link>
          </p>
          <p>
            <strong>Number:</strong> {episodeData.number}
          </p>
          <p>
            <strong>Airdate:</strong> {episodeData.airdate}
          </p>
          <p>
            <strong>Runtime:</strong> {episodeData.runtime}
          </p>
        </section>
      </div>
    </div>
  );
};

export default Episode;
