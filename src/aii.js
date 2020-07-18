function bestMove(map, N, person = 10){
    let move = []
    for (let i = 0; i < N; i++){
        for (let j = 0; j < N; j++){
          if (map[j][i]==='null'){
            move.push({i,j})
          }
        }
      }
      return move[Math.floor(Math.random()*move.length)]
}

export default bestMove