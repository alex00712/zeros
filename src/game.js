import bestMove from './aii'

export function initGame(Data, A, N, komp = false){
	var el = document.querySelector('.game')
	el.width = A 
    el.height = A 
    
    var a = A/N
	var cont = el.getContext('2d')

    drowGamingProcces()	
	
	function drowGamingProcces(){
		for (var i = 1; i < N ; i++ ){
				cont.beginPath()
				cont.strokeStyle = '#000000'
				cont.moveTo(a*i, 0)
				cont.lineTo(a*i, A)
				cont.stroke()
		}

	for (var i = 1; i < N ; i++ ){
				cont.beginPath()
				cont.strokeStyle = '#000000'
				cont.moveTo(0, a*i)
				cont.lineTo(A, a*i)
				cont.stroke()
	}

	Data.forEach(function(x, y, val){
		if(val === 1){
			drowX(x, y, 'rgba(76, 141, 220, 1)')
		}
		else if (val === 10){
			drowO(x, y, 'rgba(202, 47, 47, 1)')
		}
	})
	}

	function drowX(x, y, color){
		var l = 0.8*a
		cont.beginPath()
		cont.strokeStyle = color
		cont.moveTo(a*x+0.1*a, a*y+0.1*a)
		cont.lineTo(a*x+0.9*a, a*y+0.9*a)
		cont.stroke()
		cont.beginPath()
		cont.strokeStyle = color
		cont.moveTo(a*x+0.9*a, a*y+0.1*a)
		cont.lineTo(a*x+0.1*a, a*y+0.9*a)
		cont.stroke()
	}
	
	function drowO(x, y, color){
		cont.beginPath()
		cont.strokeStyle = color
		cont.arc(a*x+0.5*a, a*y+0.5*a, 0.4*a, 1, Math.PI*180)
		cont.stroke()
	}
	
	el.onmousemove = function(e){
		if(Data.isGame){
			var x = Math.floor(e.offsetX/a)
			var y = Math.floor(e.offsetY/a)
			if (Data.getValue(x,y)==='null'){
				if (Data.getStep()===1){
					cont.clearRect(0,0,A,A)
					drowX(x, y, 'rgba(222, 222, 222, 1)')
				}else{
					cont.clearRect(0,0,A,A)
					drowO(x, y, 'rgba(222, 222, 222, 1)')
				}
				drowGamingProcces()
			}
		}
	}
	
	function comStep(){
		let {i,j} = bestMove(Data.getMap(), N)
		Data.setValue(i, j, 10)
		drowO(i, j, 'rgba(202, 47, 47, 1)')
	}

	el.onclick = async function(e){
		if(Data.isGame){
			var x = Math.floor(e.offsetX/a)
			var y = Math.floor(e.offsetY/a)
			if (Data.getValue(x,y)==='null'){
				if (Data.getStep()===1){
						await drowX(x, y, 'rgba(76, 141, 220, 1)')
						await Data.setValue(x, y, 1)
						if (komp){
							await comStep()
						}
						
				}
				else if(Data.getStep()===10){
						Data.setValue(x, y, 10)
						drowO(x, y, 'rgba(202, 47, 47, 1)')
					
				}		
			}
		}
	}
}