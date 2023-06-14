import React from 'react';

function Formulariocl(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <label>
        Nombre del jugador:
        <input
          type="text"
          value={props.playerName}
          onChange={props.handlePlayerNameChange}
        />
      </label>
      <br />
      <label>
        Carta a buscar:
        <input
          type="text"
          value={props.card}
          onChange={props.handleCardChange}
        />
      </label>
      <br />
      <button type="submit">Crear jugador</button>
    </form>
  );
}

export default Formulariocl;