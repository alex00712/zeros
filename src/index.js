import {GameData} from './data'
import {initGame} from './game'

import './style.css'

const control = document.querySelector('.control')
const gameing = document.querySelector('.gameing')
const x33 = document.querySelector('.x33')
const x55 = document.querySelector('.x55')
const vsFriend = document.querySelector('.vsFriend')
const vsComputer = document.querySelector('.vsComputer')
const reload = document.querySelector('.reload')
const tableType = document.querySelector('.tableType')

window.onload=function(){

    this.N = 3
    if (window.screen.availWidth<450){
        this.A = window.screen.availWidth/1.5
    }else{
        this.A = window.screen.availWidth/3
    }

    this.AI = false

    this.setTable = function(n){
        tableType.innerHTML = `${n}x${n}`
        N = n
    }

    this.chosePleer = function(NN, A, map, step, komp){
        control.style.display = 'none'
        gameing.style.display = 'block'

        var Data = new GameData(NN, map, step)
        initGame(Data, A, NN, komp)

        window.onunload = function(){
            let gameState = {
                step: Data.getStep(),
                map: Data.getMap(),
                N: NN,
                A: A,
                AI: this.AI
            }
            localStorage.setItem('gameState', JSON.stringify(gameState))
        }
    }
    
    if (localStorage.getItem('gameState')){
        let data = localStorage.getItem('gameState')
        data = JSON.parse(data)
        this.chosePleer(data.N, data.A, data.map, data.step, data.AI)
    }


    x33.addEventListener('click', ()=>setTable(3))
    x55.addEventListener('click', ()=>setTable(5))
    vsFriend.addEventListener('click', ()=>chosePleer(N, A))
    vsComputer.addEventListener('click', ()=>{
        this.AI = true
        chosePleer(N, A, null, null, true)
    })
    reload.addEventListener('click', ()=>{
        localStorage.removeItem('gameState')
        control.style.display = 'flex'
        gameing.style.display = 'none'

    })
        

}
