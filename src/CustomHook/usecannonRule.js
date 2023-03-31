const cannonRule = (initArrIndex, targetChess, compareChess) => {
    let targetValue = initArrIndex[targetChess]?.index;
    let compareValue = initArrIndex[compareChess]?.index;

    let isOneChessInBetween = 0;

    // 砲的排數
    let compareHorizontalIndex = Math.floor(compareChess / 8);
    // 目標的排數
    let targetHorizontalIndex = Math.floor(targetChess / 8);

    // 確認是否是與砲垂直的棋子，若為0則垂直
    let isVertical = Math.abs(targetChess - compareChess) % 8;

    let topChessIndex = targetChess - 8;
    let downChessIndex = targetChess + 8;
    let rightChessIndex = targetChess + 1;
    let leftChessIndex = targetChess - 1;

    // 如果target的state為0的情況下，此時砲的移動方式就和一般棋子一樣
    if (!initArrIndex[targetChess]?.state) {
        console.log(initArrIndex[targetChess]?.state);
        if (
            compareChess == topChessIndex ||
            compareChess == downChessIndex ||
            compareChess == rightChessIndex ||
            compareChess == leftChessIndex
        ) {
            return { compareResult: 1 };
        } else {
            return { compareResult: -2 };
        }
    }

    if ((targetValue <= 7 && compareValue > 7) || (compareValue <= 7 && targetValue > 7)) {
        if (compareHorizontalIndex == targetHorizontalIndex) {
            console.log(Math.abs(targetChess - compareChess) - 1);
            for (var i = 1; i <= Math.abs(targetChess - compareChess) - 1; i++) {
                if (initArrIndex[Math.min(targetChess, compareChess) + i]?.state == 1) {
                    isOneChessInBetween++;
                }
            }

            if (isOneChessInBetween == 1) {
                return { compareResult: 1 };
            }

            return { compareResult: -3 };
        }
        // 確認在targetChess及compareChess中間的棋是否state == 0(垂直)
        if (!isVertical) {
            if (Math.max(targetChess, compareChess) - Math.min(targetChess, compareChess) / 8 >= 2) {
                for (var i = Math.min(targetChess, compareChess) + 8; i < Math.max(targetChess, compareChess); i += 8) {
                    if (initArrIndex[i]?.state == 1) {
                        isOneChessInBetween++;
                    }
                }
                if (isOneChessInBetween == 1 && initArrIndex[targetChess]?.state) {
                    return { compareResult: 1 };
                } else {
                    return { compareResult: -3 };
                }
            }
        }

        return { compareResult: -3 };

        // 確認在targetChess及compareChess中間的棋是否state == 0(水平)
    } else {
        // console.log('我們是同顏色的拉')
        return { compareResult: 0 };
    }
};

export default cannonRule;
