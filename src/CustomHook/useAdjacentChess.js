import useCompareLevel from './useCompareLevel'
const useAdjacentChess = (initArr,targetChess,compareChess)=>{
    if(targetChess == compareChess){
        return {compareResult:0}
    } 
    
    // 這便傳入的是陣列裡面的順序，
    let topChessIndex = targetChess -8
    let downChessIndex = targetChess +8
    let rightChessIndex = targetChess +1
    let leftChessIndex = targetChess -1
    if( compareChess == topChessIndex || compareChess == downChessIndex || compareChess==rightChessIndex ||compareChess==leftChessIndex){
        // console                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    .log('範圍里. . . ')
        return useCompareLevel(initArr,targetChess,compareChess)
    }
}

export default useAdjacentChess