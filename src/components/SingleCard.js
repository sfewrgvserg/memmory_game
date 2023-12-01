import "./SingleCard.css";

export default function SingleCard({ card, handlechoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handlechoice(card);
    }
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped " : "rounded-xl "}>
        <img className="front rounded-xl" src={card.src} alt="" />
        <img
          className="back rounded-xl"
          src="./img/cover.png"
          alt=""
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
