const game = Vue.createApp({
  data() {
    return {
      darahLawan: 100,
      darahLord: 100,
      pemenang: null,
      currentRound: 0,
      logMessages: [],
    };
  },
  watch: {
    darahLawan(value) {
      if (value <= 0 && this.darahLord <= 0) {
        this.pemenang = "draw";
      } else if (value <= 0) {
        this.pemenang = "lord";
      }
    },
    darahLord(value) {
      if (value <= 0 && this.darahLawan <= 0) {
        this.pemenang = "draw";
      } else if (value <= 0) {
        this.pemenang = "kamu";
      }
    },
  },
  methods: {
    startGame() {
      this.darahLawan = 100;
      this.darahLord = 100;
      this.currentRound = 0;
      this.pemenang = null;
      this.logMessages = [];
    },
    nyerah() {
      this.pemenang = "lord";
    },
    kamuAttack() {
      const attackValue = randomValue(8, 12);
      this.darahLord -= attackValue;
      this.lordAttack();
      this.currentRound++;
      this.addLogMessage("kamu", "attack", attackValue);
    },
    lordAttack() {
      const attackValue = randomValue(10, 15);
      this.darahLawan -= attackValue;
      this.addLogMessage("lord", "attack", attackValue);
    },
    specialAttack() {
      const attackValue = randomValue(15, 25);
      this.darahLord -= attackValue;
      this.lordAttack();
      this.currentRound++;
      this.addLogMessage("kamu", "attack", attackValue);
    },
    kamuHeal() {
      const healValue = randomValue(8, 20);
      this.darahLawan += healValue;
      this.lordAttack();
      this.currentRound++;
      this.addLogMessage("kamu", "heal", healValue);
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
  computed: {
    darahLawanBar() {
      if (this.darahLawan < 0) {
        return { width: "0" };
      }
      return { width: this.darahLawan + "%" };
    },
    darahLordBar() {
      if (this.darahLord < 0) {
        return { width: "0" };
      }
      return { width: this.darahLord + "%" };
    },
    mayUseSpecialAtt() {
      return this.currentRound % 3 !== 0;
    },
  },
});
game.mount("#game");

const randomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
