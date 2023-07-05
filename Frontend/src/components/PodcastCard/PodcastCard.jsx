import React from "react";

const PlaylistCard = ({ playlist }) => {
  const firstTrack = playlist.tracks.items[0].track;

  return (
    <div className="card">
      <img src={playlist.images[0].url} alt={playlist.name} />
      <div className="card-body">
        <h5 className="card-title">{playlist.name}</h5>
        <p className="card-text">Hosted by {playlist.owner.display_name}</p>
        <p className="card-text">{firstTrack.name}</p>
        <audio controls>
          <source src={firstTrack.preview_url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <a href={playlist.external_urls.spotify} className="btn btn-primary">
          View on Spotify
        </a>
      </div>
    </div>
  );
};

export default PlaylistCard;
