class Bonus{

  constructor(type) {
    this.bonus = document.createElement('div');
    this.bonus.classList.add('bonus'); 
    this.bonus.classList.add(type); 
    this.bonus.setAttribute('style', `top:${this.generateNum()}vh`);
    document.querySelector('.background_container').appendChild(this.bonus)
  }

  generateNum() {
    return Math.floor(Math.random() * (71 - 55) + 55)
  }

}