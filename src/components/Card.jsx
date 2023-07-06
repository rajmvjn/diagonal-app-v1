import { BASE_URL_IMGS } from "../utils/constants";

const Card = ({ p }) => {
  return (
    <div className="play-card">
      <img src={`${BASE_URL_IMGS}${p["poster-image"]}`} alt={p.name} />
      <div className="card-text">{p.name}</div>
    </div>
  );
};

export default Card;
