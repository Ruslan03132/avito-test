export function Game({ book }) {
  const {
    developer,
    freetogame_profile_url,
    game_url,

    genre,

    id,
    platform,

    publisher,

    release_date,

    short_description,

    thumbnail,

    title,
  } = book;

  return (
    <div>
      <div>{title}</div>
      <div>{release_date}</div>
      <div>{publisher}</div>
      <div>{genre}</div>
      <img src={thumbnail} width={"auto"} height={"auto"}></img>
    </div>
  );
}
