import React, { useState, useEffect } from "react";

function Playlist() {
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const cookieData = getCookie("playlist");
    if (cookieData) {
      const decodedString = cookieData.replace(
        /\\u([\dA-Fa-f]{4})/g,
        (match, p1) => String.fromCharCode(parseInt(p1, 16))
      );
      const decodedData = JSON.parse(decodedString);
      console.log(decodedData);
      setPlaylist(decodedData);
    }
  }, []);

  function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split("=");
      if (cookie[0] === name) {
        return decodeURIComponent(cookie[1]);
      }
    }
    return null;
  }

  if (!playlist) {
    return <div>Loading playlist...</div>;
  }

  return (
    <div>
      <h1>{playlist.name}</h1>
      <img src={playlist.image_url} alt={playlist.name} />
    </div>
  );
}

export default Playlist;
