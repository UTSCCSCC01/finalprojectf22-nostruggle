class Sound {
    constructor(sound){
        this.sound = new Audio(sound)
    }

    play(){
        this.sound.play()
    }
}

export default Sound