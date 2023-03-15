import useCompareLevel from './useCompareLevel'
const useAdjacentChess = (initArr,targetChess,compareChess)=>{
    if(targetChess == compareChess){
        return {compareResult:3}
    } 
    
    // 這便傳入的是陣列裡面的順序，
     // 回傳結果 1為吃掉 -1、為不能吃、0為同色、-2位子走錯、3為選到相同的chess
    let topChessIndex = targetChess -8
    let downChessIndex = targetChess +8
    let rightChessIndex = targetChess +1
    let leftChessIndex = targetChess -1
    if( compareChess == topChessIndex || compareChess == downChessIndex || compareChess==rightChessIndex ||compareChess==leftChessIndex){
        // console                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    .log('範圍里. . . ')
        return useCompareLevel(initArr,targetChess,compareChess)
    }
    return {compareResult: -2}
}

export default useAdjacentChess