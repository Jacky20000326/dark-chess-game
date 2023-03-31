export class PlayerStore {
    constructor() {
        this.camp = null;
        this.currPlayer = "play1";
    }

    SetCamp(belongCamp) {
        this.camp = belongCamp;
    }
    AddScore() {
        this.score += 1;
        console.log("add socre");
    }

    JudgeGetAllChess() {
        if (this.score == 16) {
            gameState.value.winner = "play1";
            return;
        }
        if (this.score == 16) {
            gameState.value.winner = "play2";
            return;
        }
    }
    // 換人玩
    SwitchPlayer() {
        if (this.currPlayer == "play1") {
            this.currPlayer = "play2";
        } else {
            this.currPlayer = "play1";
        }
    }
}

export class Player1 extends PlayerStore {
    constructor() {
        super();
        this.score = 0;
    }
}

export class Player2 extends PlayerStore {
    constructor() {
        super();
        this.score = 0;
    }
}

//-----

// score(除理判斷當前玩家為player1 or player2)
export class ScoreContext {
    constructor() {
        this.strategy = null;
    }
    setStratagy(strategy) {
        this.strategy = strategy;
    }
    ConcreteAddScore() {
        if (this.strategy != null) {
            this.strategy.AddScore();
        }
        console.log(this.strategy.currPlayer, this.strategy.score);
    }
}
