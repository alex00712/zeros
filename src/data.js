import {win} from './win'


export function GameData(N, map=null, step=null){

	this.isGame = true

    this.step = step || 1
    
    if (!map){
        this.map = new Array(N)
        for (var i = 0; i < N; i++){
            this.map[i] = new Array(N)
            for (var j = 0; j < N; j++){
                this.map[i][j] = 'null'
            }
        }
    }else{
        this.map = map
    }

    this.getMap = function(){
        return this.map
    }

	this.forEach = function(cb){
	for (var i = 0; i < N; i++){
		for (var j = 0; j < N; j++){
			cb(j, i, this.map[i][j])
		}
	}
	}
	
	this.getValue = function(x, y){
		if (x < 0 || y < 0 || x > N || y > N){
			return false
		}
		return this.map[y][x]
	}

	this.setValue = function(x, y, val){
		if (x < 0 || y < 0 || x > N || y > N){
			return false
		}
		this.map[y][x] = val
		this.changeStep()
	}	
	
	this.isEmpty = function(x,y){
		if (this.map[y][x] === 'null'){
			return true
		}
		return false
	}

	this.getStep = function(){
		return this.step
	}

	this.changeStep = function(){
		if (this.step === 1){
			this.step = 10
		}
		else if (this.step === 10){
			this.step = 1
		}
		this.counter()
	}

	this.stopGame = function(){
		this.isGame = false
	}

	this.counter = function(){
	
	for (var i = 0; i < N; i++){
		var sum = 0
		for (var j = 0; j < N; j++){
			sum+=this.map[j][i]	
		}
		if (sum === N*1 || sum === N*10){
			win(sum/N)
			this.stopGame()
			
		}
	}

	for (var j = 0; j < N; j++){
		var sum = 0
		for (var i = 0; i < N; i++){
			sum+=this.map[j][i]
		}
		if (sum === N*1 || sum === N*10){
			win(sum/N)
			this.stopGame()
		}
    }
    var sumRD = 0
    for (var j = 0; j < N; j++){
		
		for (var i = 0; i < N; i++){
            if(i===j){
				sumRD+=this.map[j][i]
            }
		}
	}
	if (sumRD === N*1 || sumRD === N*10){
		win(sumRD/N)
		this.stopGame()
	}

	var sumLD = 0
    for (var j = 0; j < N; j++){
		for (var i = 0; i < N; i++){
            if(i+j==N+1){
                sumLD+=this.map[j][i]
            }
		}
	}
	if (sumLD === 5 || sumLD === 50){
		win(sumLD/N)
		this.stopGame()
	}

	var sumM = 0
	for (var j = 0; j < N; j++){
		for (var i = 0; i < N; i++){
            if (this.getValue(i,j)!=='null'){
				sumM+=1
			}
		}
	}
	if (sumM === 0){
		win('null')
		this.stopGame()
	} 
	}

    

}