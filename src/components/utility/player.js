const getPlayerImg = (playerName, playerLastName) => {
    // return `https://nba-players.herokuapp.com/players/${playerLastName}/${playerName}` <-- if way under have not anu pic of this player should us this api

    return `http://d2cwpp38twqe55.cloudfront.net/req/202002141/images/players/${playerLastName.toLowerCase().slice(0, 5)}${playerName.toLowerCase().slice(0, 2)}01.jpg`
}

export { getPlayerImg };