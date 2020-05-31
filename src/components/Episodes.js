import React, { useEffect, useContext, Fragment } from "react";
import { useParams } from "react-router";
import { EpisodesContext } from "../Store";
import { Link } from "react-router-dom";

const Episodes = () => {
  const [episodes, setEpisodes] = useContext(EpisodesContext);
  const { showId, showName } = useParams();
  // Fetching the episode data according to the showId
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

  const episodesData = episodes.data;

  const renderSeason = (currentSeason, episodes) => (
    <div>
      <h1>{`Season ${currentSeason}`}</h1>
      <table className="episodes__table">
        <thead className="episodes__head-row">
          <tr>
            <th className="episodes__header-title">Number</th>
            <th className="episodes__header-title">Date</th>
            <th className="episodes__header-title">Name</th>
          </tr>
        </thead>
        <tbody className="episodes__body">
          {episodes.map(episode => (
            <tr className="episodes__body__row" key={`${episode.id}`}>
              <td>{episode.number}</td>
              <td>{episode.airdate}</td>
              <td>
                <Link
                  className="episodes__body__link"
                  to={`/shows/${showId}/${showName}/episodes/${episode.id}`}
                >
                  {episode.name}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  const renderEpisodes = () => {
    // reconstruct the response to seperate seasons
    const seasons = [];
    episodesData.forEach(episode => {
      if (seasons[episode.season - 1]) {
        seasons[episode.season - 1].push(episode);
      } else {
        seasons[episode.season - 1] = new Array();
        seasons[episode.season - 1].push(episode);
      }
    });
    // Create seperated tables for each season
    return seasons.map(seasonEpisodes => (
      <Fragment key={`${seasonEpisodes[0].season} ${seasonEpisodes[0].id}`}>
        {renderSeason(seasonEpisodes[0].season, seasonEpisodes)}
      </Fragment>
    ));
  };

  return <div className="episodes">{renderEpisodes()}</div>;
};

export default Episodes;
