import React, { useState } from 'react';

function Appcl() {
  const [playerName, setPlayerName] = useState('');
  const [card, setCard] = useState('');
  const [result, setResult] = useState('');
  const [cardImage, setCardImage] = useState('');

  const createPlayer = async () => {
    try {
      const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/');
      const data = await response.json();
      const playerId = data.deck_id;
      setResult(`ID del jugador creado: ${playerId}`);
      drawCard(playerId);
    } catch (error) {
      console.error('Error al crear el jugador:', error);
    }
  };

  const drawCard = async (playerId) => {
    try {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${playerId}/draw/?count=1`);
      const data = await response.json();
      const drawnCard = data.cards[0];
      const cardValue = drawnCard.value;
      const cardImageUrl = drawnCard.image;
      
      if (cardValue === card) {
        setResult(`Encontrado. El jugador ${playerName} ha obtenido la carta ${cardValue}`);
      } else {
        setResult(`El jugador ${playerName} ha obtenido la carta ${cardValue}`);
        setCardImage(cardImageUrl);
        setTimeout(() => drawCard(playerId), 2000);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    createPlayer();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del jugador:
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Carta a buscar:
          <input
            type="text"
            value={card}
            onChange={(e) => setCard(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Crear jugador</button>
      </form>
      <br />
      <div>{result}</div>
      {cardImage && <img src={cardImage} alt="Carta" />}
 
    </div>
  );
}

export default Appcl;
