new Vue ({
    el: '#app', 
    data: {
        playerHealth: 100, 
        monsterHealth: 100, 
        gameIsRunning: false, 
        turns: [],
        openChest: false,
        buttonIncrease: false,
        round: [], 
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function() {
            var damage = this.calculateDamage(3,10)
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
        
        },
        specialAttack: function() {
            var damage = this.calculateDamage(10, 20)
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player SPECIAL hits Monster for ' + damage
            });
            
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
        },
        heal: function() {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10'
            });
            
            this.monsterAttacks();
        },
        giveUp: function() { 
            this.gameIsRunning = false;
        },
        monsterAttacks: function() {
            var damage = this.calculateDamage(5, 12)
            this.checkWin();
            this.playerHealth -= damage; 
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage
            });
            
            
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function() {
            if (this.monsterHealth <= 0) {
                if (alert('You Won!! New Game?')) {
                    this.startGame();
                    console.log(this.round++); 
                } else {
                    this.gameIsRunning = false;
                }
                return true; 
            } else if (this.playerHealth <= 0) {
                if (alert('You Lost!! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false; 
        },
        
        
        defenceUp: function() {
            this.buttonIncrease =! this.buttonIncrease; 
        },
        
        attackUp: function() {
            this.specialAttack.damage = 50;
            this.buttonIncrease =! this.buttonIncrease; 
            
        }, 
        
        healUp: function() {
            this.buttonIncrease =! this.buttonIncrease; 
        }, 
        
        continuey: function() {
        this.gameIsRunning = true;
            this.playerHealth = 100 * 1.1;
            this.monsterHealth = 100;
            this.turns = [];
            console.log(this.round++); 
        },
        
        }
    
});
    
    
        
      


