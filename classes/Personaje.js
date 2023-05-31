class Personaje {
  constructor() {
    this.damageSound = new Audio();
    this.damageSound.src = '../audio/damage.mp3';
    this.deadSound = new Audio();
    this.deadSound.src = '../audio/dead.mp3';
    this.start();
  }

  start() {
    this.ref = document.createElement('div');
    this.ref.classList.add('correr')
    this.ref.id = 'personaje'
    this.status = true;
    document.querySelector('.background_container').appendChild(this.ref)
    document.addEventListener('keydown', () => {
      this.jump()
    })
  }

  jump() {
    if (this.status) {
      this.ref.classList.remove('caer')
      this.ref.classList.add('saltar')
      this.ref.addEventListener('animationend', () => {
        this.fall()
      })
    }
  }

  fall() {
    if (this.status) {
      this.ref.classList.remove('saltar')
      this.ref.classList.add('caer')
      this.ref.addEventListener('animationend', () => {
        this.ref.classList.remove('caer')
        this.ref.classList.add('correr')
      })
    }
  }
  damage() {
    if (this.status) {
      this.damageSound.play();
      this.ref.classList.remove('correr');
      this.ref.classList.remove('caer');
      this.ref.classList.remove('saltar');
      this.ref.classList.add('damage')
      setTimeout(() => {
        this.ref.classList.add('correr');
      }, 500)
    }
  }

  dead() {
    if (this.status) {
      this.deadSound.play();
      this.ref.classList.remove('correr');
      this.ref.classList.add('dead')
      this.ref.addEventListener('animationend', () => {
        this.ref.classList.remove('saltar');
        this.ref.classList.remove('correr');
        this.ref.classList.remove('dead');
        this.ref.classList.add('deadFinish')
      })
      this.status = false
    }
  }

  clear() {
    this.ref.remove();
    this.start();
  }

}