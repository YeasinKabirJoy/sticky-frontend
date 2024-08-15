import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Trash from "../icons/Trash";
const HomeCard = ({ boards,handleDelete }) => {
  const navigate = useNavigate();
  const [cardRows, setCardRows] = useState([]);

  useEffect(() => {
    setCardRows(chunkArray(boards, 5));
  }, [boards]);

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  return (
    <div className="HomeCard-container">
      {cardRows.map((row, rowIndex) => (
        <div className="HomeCard-row" key={rowIndex}>
          {row.map((card, cardIndex) => (
            <div className="HomeCard" key={cardIndex}>
              <div className="HomeCard-header">
              <div onClick={()=>{handleDelete(card.id)}}>
                    <Trash />
            </div>
              </div>
              <div
                className="HomeCard-body"
                onClick={() => navigate(`/board/${card.id}`)}
              >
                <h2>{card.name}</h2>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default HomeCard;