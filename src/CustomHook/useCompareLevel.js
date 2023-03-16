
const useCompareLevel = (initArrIndex,targetChess,compareChess)=>{
    //這便的index是指Arr的id，透過id去判斷誰大


    let targetValue = initArrIndex[targetChess]?.index
    let compareValue = initArrIndex[compareChess]?.index
    let compareLevel =  compareValue - targetValue
    let compareResult = null
    // console.log(targetValue)
    // console.log(compareValue)
    // 判斷是否為同顏色
    if( targetValue <= 7 && compareValue>7 || compareValue <= 7 && targetValue >7 ){
    // console.log(compareLevel)
        // 砲的規則
        
           // 一般規則  / 一般規則 / 兵（卒）可以吃 將（帥）/ 兵（卒）可以吃 將（帥）

        if(compareLevel <= -7 && compareLevel> -13 || compareLevel<= 7 && compareLevel> 1 || compareLevel == 13 || compareLevel== -1){
            compareResult = 1   

        }else{

            compareResult = -1
        }
    }else{
        // console.log('我們是同顏色的拉') 
        compareResult = 0
    }
    return {compareResult:compareResult}
    // 回傳一個結果陣列
}

export default useCompareLevel