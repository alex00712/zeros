const control = document.querySelector('.control')
const gameing = document.querySelector('.gameing')

export function win(N){
    if (N === 1){
        alert('X won')
        control.style.display = 'flex'
        gameing.style.display = 'none'
    }
    else if(N === 10){
        alert('O won')
        control.style.display = 'flex'
        gameing.style.display = 'none'
    }
    else if(N === 'null'){
        alert('tie')
        control.style.display = 'flex'
        gameing.style.display = 'none'
    }
    
}