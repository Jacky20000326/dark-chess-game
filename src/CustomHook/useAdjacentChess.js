import useCompareLevel from "./useCompareLevel";
import usecannonRule from "./usecannonRule";
const useAdjacentChess = (initArr, targetChess, compareChess) => {
    if (targetChess == compareChess) {
        return { compareResult: "same chess" };
    }
    // 這便傳入的是陣列裡面的順序，
    // 回傳結果 、-2位子走錯、-1為不能吃、0為同色、1為吃掉 、3為選到相同的chess、4為砲
    let topChessIndex = targetChess - 8;
    let downChessIndex = targetChess + 8;
    let rightChessIndex = targetChess + 1;
    let leftChessIndex = targetChess - 1;

    // 砲的規則
    if (initArr[compareChess].index == 6 || initArr[compareChess].index == 13) {
        return usecannonRule(initArr, targetChess, compareChess);
    }

    if (
        compareChess == topChessIndex ||
        compareChess == downChessIndex ||
        compareChess == rightChessIndex ||
        compareChess == leftChessIndex
    ) {
        return useCompareLevel(initArr, targetChess, compareChess);
    } else {
        return { compareResult: -2 };
    }
};

export default useAdjacentChess;
