class Games {
  constructor(pj) {
    this.pj = pj
    this.bonusArray = []
    this.enemiesArray = []
    this.game = true;
    this.seconds = 60;
    this.coins = 0;
    this.timerInterval;
    this.generateEnemiesId
    this.generateTimeId
    this.generateCoinId
    this.bonusSound = new Audio();
    this.bonusSound.src = '../audio/bonus.mp3';
    this.history = []
  }

  // Inicializamos el juego
  start() {
    this.game = true;
    this.seconds = 60;
    this.coins = 0;
    document.getElementById('coins').textContent = this.coins;
    document.querySelectorAll('.animation7').forEach((e) => {
      this.addAnimation(e)
    });
    document.querySelectorAll('.animation12').forEach((e) => {
      this.addAnimation(e)
    });
    this.addAnimation(document.querySelector('.animation15'))

    this.startTimer();
    this.generateEnemiesId = setInterval(() => {
      this.generateElements();
    }, seconds > 60 ? 1500 : 2500);

    this.generateTimeId = setInterval(() => {
      new Bonus('reloj')
    }, 10000);

    this.generateCoinId = setInterval(() => {
      new Bonus('coin')
    }, 15000);
  }
  // Detenemos el juego (Tiempo y generador de enemigos/bonus)
  stopGame() {
    setTimeout(() => {
      this.deleteElementsAll()
    }, 300);
    clearInterval(this.generateEnemiesId)
    clearInterval(this.generateTimeId)
    clearInterval(this.generateCoinId)
  }

  // Cronometro
  startTimer() {
    this.timerInterval = setInterval(() => {
      this.seconds--;
      if (this.seconds <= 0) {
        this.seconds = 0
        this.stopGameLoop();
      }
      document.getElementById('seconds').textContent = this.formatTime(this.seconds);
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerInterval);
  }

  formatTime(time) {
    return time < 10 ? `0${time}` : time;
  }

  /**
   * Detenemos el juego.
   * Se van a detener las animaciones y se va ejecutar la funcion stopGame
   */
  stopGameLoop() {
    menuAudio.pause();
    this.pj.dead();
    this.setGame(false)
    this.stopTimer();
    this.stopGame()
    this.history.push({ coins: this.coins, seconds: this.seconds })
    console.log(this.history)
    this.removeAnimation(document.querySelector('.animation7'))
    this.removeAnimation(document.querySelector('.animation12'))
    this.removeAnimation(document.querySelector('.animation15'))
    setTimeout(() => {
      document.querySelector('.menu').classList.remove('d-none')
    }, 1500);
  }

  addAnimation(e) {
    e.removeAttribute('style', 'animation:none !important')
  }

  removeAnimation(e) {
    e.setAttribute('style', 'animation:none !important')
  }


  // Verificamos si chocamos un obstaculo
  isCollision(pj, enemy, n) { return pj.right - n > enemy.left + n && pj.bottom > enemy.top && enemy.right - n > pj.left + n && enemy.bottom > pj.top }

  checkCollision() {
    const pj = document.getElementById('personaje').getBoundingClientRect();
    const enemies = document.querySelectorAll('.enemigo');
    const bonus = document.querySelectorAll('.bonus');

    // Obtenemos los enemigos que estan en el html
    enemies.forEach((e, i) => {
      const element = e.getBoundingClientRect();
      if (this.isCollision(pj, element, e.className.includes('walkEnemigoMale ') ? 10 : 20)) {
        if (!this.enemiesArray.includes(i)) {
          // Con este array auxilia vamos a evitar que se ejecute muchas veces el codigo.
          this.enemiesArray.push(i)
          if (e.className.includes('walkEnemigoFemale')) {
            this.stopGameLoop();
          } else {
            this.pj.damage();
            this.seconds -= 10;
          }
        }
      } else {
        // Limpiamos el array auxiliar
        this.enemiesArray = this.enemiesArray.filter((b) => b !== i);
      }
    })

    // Obtenemos los bonus que estan en el html y verificamos si hay colision 
    bonus.forEach((e, i) => {
      const element = e.getBoundingClientRect();
      if (this.isCollision(pj, element, 10)) {
        if (!this.bonusArray.includes(i)) {
          this.bonusSound.play();
          this.bonusArray.push(i);
          if (e.className.includes('reloj')) {
            this.seconds += 15;
          } else {
            this.coins += 1;
            document.getElementById('coins').textContent = this.coins;
          }
          e.remove();
        }
      } else {
        this.bonusArray = this.bonusArray.filter((c) => c !== i);
      }
    })
  }

  // Eliminamos los elementos que estan fuera de la pantalla del usuario
  deleteElements() {
    const enemies = document.querySelectorAll('.enemigo')
    const bonus = document.querySelectorAll('.bonus')
    enemies.forEach((e) => {
      const element = e.getBoundingClientRect();
      if (element.x < 0) {
        e.remove();
      }
    })

    bonus.forEach((e) => {
      const element = e.getBoundingClientRect();
      if (element.x < 0) {
        e.remove();
      }
    })
  }

  // Eliminamos todos los elementos de la pantalla
  deleteElementsAll() {
    const enemies = document.querySelectorAll('.enemigo')
    const bonus = document.querySelectorAll('.bonus')
    enemies.forEach((e) => {
      e.remove();
    })
    bonus.forEach((e) => {
      e.remove();
    })
  }

  // Generador de enemigos
  generateElements() {
    if (Math.floor(Math.random() * 10) > 5) {
      new Enemigo('female');
    } else {
      new Enemigo('male');
    }
  }

  getGame() {
    return this.game
  }
  setGame(game) {
    this.game = game
  }
}