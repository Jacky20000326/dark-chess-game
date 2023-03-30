export class GameStateStore {
    constructor() {
        this.player = "play1";
        this.winner = null;
        this.continualCount = 1;
        this.preChooseIndex = null;
        this.occupiedState = null;
        this.count = 0;
    }

    // 換人玩
    SwitchPlayer() {
        if (this.player == "play1") {
            this.player = "play2";
        } else {
            this.player = "play1";
        }
    }
    MoveCount(state) {
        if (this.count == 49) {
            this.winner = "平局";
        }
        if (state == 1) {
            this.count += 1;
            return;
        }
        this.count = 0;
    }
}
