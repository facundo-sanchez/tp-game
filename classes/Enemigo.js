class Enemigo{

  constructor(typeEnemy) {
    this.enemy = document.createElement('div');
    this.enemy.classList.add('enemigo'); 
    if (typeEnemy === 'female') {
      this.enemy.classList.add('walkEnemigoFemale')
    } else {
      this.enemy.classList.add('walkEnemigoMale')
    }
    this.enemy.classList.add(typeEnemy)
    document.querySelector('.background_container').appendChild(this.enemy)
  }
}