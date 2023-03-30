import { AllChessData } from "../../static/AllChessData.js";

export class ChessStore {
    constructor() {
        // 取得棋子資料
        this.AllChessData = AllChessData;
        // 洗牌且根據數量生成後存入陣列
        this.imageIndexArr = [];
    }
    GetAllChessImageIndex() {
        let $this = this;
        $this.AllChessData.forEach((item, index) => {
            for (var i = 1; i <= item.quantity; i++) {
                // 透過quantity的值產生對硬的id(與url命名同)數量，放入array
                $this.imageIndexArr.push({
                    index: item.id,
                    isOpen: 0,
                    activeState: false,
                    state: 1,
                });
            }
        });
    }
    ShuffleArray() {
        this.imageIndexArr.sort(() => Math.random() - 0.5);
    }
    // 重置activeState的狀態
    ResetChessState() {
        this.imageIndexArr.forEach((item) => {
            item.activeState = false;
        });
    }
    // 移動
    MoveChess(targetChess, compareChess) {
        let temp = this.imageIndexArr[compareChess];
        this.imageIndexArr[compareChess] = this.imageIndexArr[targetChess];
        this.imageIndexArr[targetChess] = temp;
    }
}

class ChessImageFlyweight {
    opration() {}
}

class BackChessConcreteFlyweight extends ChessImageFlyweight {
    opration() {
        return new URL(`/src/assets/chesses/chessBack.png`, import.meta.url);
    }
}
class FrontChessConcreteFlyweight extends ChessImageFlyweight {
    opration(name) {
        return new URL(`/src/assets/chesses/chess${name}.png`, import.meta.url);
    }
}

export class ChessFlyweightFactory {
    constructor() {
        this.flyweight = {};
        this.flyweight.backImageChess = new BackChessConcreteFlyweight();
        this.flyweight.frontImageChess = new FrontChessConcreteFlyweight();
    }

    GetResultChessImage(category) {
        return this.flyweight[category];
    }
}
