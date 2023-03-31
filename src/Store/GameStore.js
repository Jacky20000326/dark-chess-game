const MoveState = {
    EatChessState: 1,
    CannotEatChessState: -1,
    SameColorState: 0,
    PickSameChessState: 3,
    CannonWrongRuleState: -3,
    CannonRule: 4,
    WrongDirectionState: -2,
};

export class GameStateStore {
    constructor() {
        this.player = "play1";
        this.winner = null;
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
        if (this.count == 5) {
            this.winner = "平局";
        }
        if (state == 1) {
            this.count += 1;
            return;
        }
        this.count = 0;
    }
}

// 職責鏈
// 一般移動
class ChessHandler {
    ChessAction() {}
    SetSuccessor(Successor) {
        this.Successor = Successor;
    }
}
export class EatChessState extends ChessHandler {
    ChessAction(Result) {
        if (Result == MoveState.EatChessState) {
            occupiedOtherChess(targetIndex, gameState.value.preChooseIndex);
            gameState.value.MoveCount(-1);
        } else if (this.Successor != null) {
            this.Successor.ChessAction();
        }
    }
}

export class CannotEatChessState extends ChessHandler {
    ChessAction(Result) {
        if (Result == MoveState.CannotEatChessState) {
            alert("在亂吃啊");
        } else if (this.Successor != null) {
            this.Successor.ChessAction();
        }
    }
}

export class SameColorState extends ChessHandler {
    ChessAction(Result) {
        if (Result == MoveState.SameColorState) {
            alert("眼殘嗎？看清楚好嗎是你自己的棋！");
        } else if (this.Successor != null) {
            this.Successor.ChessAction();
        }
    }
}

export class CannonWrongRuleState extends ChessHandler {
    ChessAction(Result) {
        if (Result == MoveState.CannonWrongRuleState) {
            alert("砲不能這樣走喔～");
        } else if (this.Successor != null) {
            this.Successor.ChessAction();
        }
    }
}
export class CannonRule extends ChessHandler {
    ChessAction(Result) {
        if (Result == MoveState.CannonRule) {
            occupiedOtherChess(targetIndex, gameState.value.preChooseIndex);
            gameState.value.MoveCount(-1);
        } else if (this.Successor != null) {
            this.Successor.ChessAction();
        }
    }
}

export class WrongDirectionState extends ChessHandler {
    ChessAction(Result) {
        if (Result == MoveState.WrongDirectionState) {
            alert("有事嗎，只能走上下左右ok～");
        } else if (this.Successor != null) {
            this.Successor.ChessAction();
        }
    }
}

export class ChessRull extends ChessHandler {
    constructor() {
        super();
        this.rullOne = new CannonWrongRuleState();
        this.rullTwo = new WrongDirectionState();
        this.rullThree = new CannonRule();

        this.rullFour = new EatChessState();
        this.rullFive = new CannotEatChessState();
        this.rullSix = new CannotEatChessState();
        this.rullSeven = new SameColorState();
    }
    ActionRull(compareResult) {
        this.rullOne.SetSuccessor(this.rullTwo);
        this.rullTwo.SetSuccessor(this.rullThree);
        this.rullThree.SetSuccessor(this.rullFour);
        this.rullFour.SetSuccessor(this.rullFive);
        this.rullFive.SetSuccessor(this.rullSix);
        this.rullSix.SetSuccessor(this.rullSeven);

        this.rullOne.ChessAction(compareResult);
    }
}
