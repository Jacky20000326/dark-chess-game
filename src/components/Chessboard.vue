<template>
  <div>
    <div class="dark-chess-game">
      <h1>Dark Chess Game</h1>
      <div class="chessboard-container">
        <div
          v-for="(item, index) in imageIndexArr"
          :id="'chess-' + index"
          class="chessboard-block"
          :key="index"
          @click="chooseChess(item, index)"
        >
          <img
            v-show="item?.state"
            :class="{ isActive: item?.activeState }"
            :src="getChessUrl(item?.index, item?.isOpen)"
            alt=""
          />
        </div>
      </div>
    </div>
    <Player
      :play1Score="play1Score"
      :gameState="gameState"
      :play2Score="play2Score"
      :count="gameState?.count"
    />
    <div class="stepCount">{{ gameState.count }}</div>
    <FinishGame v-if="gameState.winner" :winner="gameState.winner" />
  </div>
</template>

<script setup>
import Player from "./Player.vue";
import FinishGame from "./FinishGame.vue";
import { ref, onBeforeMount, watch } from "vue";
import useAdjacentChess from "../CustomHook/useAdjacentChess";
import { ChessStore,ChessFlyweightFactory } from '../Store/ChessStore.js'
import { GameStateStore } from '../Store/GameStore'
// concrete ChessStore class
let ConcreteChessStore = new ChessStore()
// chess image change
let ConcreteChessFlyweightFactory = new ChessFlyweightFactory()
let BackImageChess = ConcreteChessFlyweightFactory.GetResultChessImage("backImageChess")
let FrontImageChess = ConcreteChessFlyweightFactory.GetResultChessImage("frontImageChess")
// concrete GameStateStore class
let ConcreteGameStateStore = new GameStateStore()
// 隨機順序
let imageIndexArr = ref(ConcreteChessStore.imageIndexArr);
// 遊戲狀態
let gameState = ref(ConcreteGameStateStore);

// 玩家狀態
let play1Score = ref(0);
let play2Score = ref(0);


const getChessUrl = (name, isOpenState) => {
  if (isOpenState == false) {
    return BackImageChess.opration();
  } else {
    return FrontImageChess.opration(name);
  }
};
// 選擇牌
const chooseChess = (target, targetIndex) => {
  // 第一次陣營選擇判斷

  // 重置選取狀態
  ConcreteChessStore.ResetChessState();

  if (!target.isOpen) {
    target.isOpen = true;
    // 切換玩家
    gameState.value.preChooseIndex = null;
    gameState.value.SwitchPlayer()
    // switchPlayer();
    return;
  }
  if (gameState.value.preChooseIndex) {
    let { compareResult } = useAdjacentChess(
      imageIndexArr.value,
      targetIndex,
      gameState.value.preChooseIndex
    );

    // 回傳結果 1為吃掉 、-1為不能吃、0為同色、-2位子走錯、3為選到相同的chess、4為砲
    if (compareResult == 10) {
      console.log(10);
      moveChess(targetIndex, gameState.value.preChooseIndex);
    } else if (compareResult == -3) {
      alert("砲不能這樣走喔～");
    } else if (compareResult == -2) {
      alert("有事嗎，只能走上下左右ok～");
    } else if (imageIndexArr.value[targetIndex]?.state == 0) {
      moveChess(targetIndex, gameState.value.preChooseIndex);
      gameState.value.MoveCount(1);
      gameState.value.preChooseIndex = null;
    } else if (compareResult == 4) {
      occupiedOtherChess(targetIndex, gameState.value.preChooseIndex);
      gameState.value.MoveCount(-1);
    } else if (compareResult == 1) {
      occupiedOtherChess(targetIndex, gameState.value.preChooseIndex);
      gameState.value.MoveCount(-1);
    } else if (compareResult == -1) {
      alert("在亂吃啊");
    } else if (compareResult == 0) {
      alert("眼殘嗎？看清楚好嗎是你自己的棋！");
    }

    // console.log("執行useAdjacentChess");
    gameState.value.preChooseIndex = null;
    return;
  }
  if (!imageIndexArr.value[targetIndex]?.state) {
    return;
  }
  gameState.value.preChooseIndex = targetIndex;
  target.activeState = true;
  // console.log("值放preChooseIndex及給 activeState");

  // 存入preActive用意為之後將與其他棋進行比較
};

// 重置activeState的狀態






//  佔領棋子
const occupiedOtherChess = (targetChess, compareChess) => {
  let temp = imageIndexArr.value[compareChess];
  imageIndexArr.value[compareChess] = imageIndexArr.value[targetChess];
  imageIndexArr.value[targetChess] = temp;
  imageIndexArr.value[compareChess].state = 0;

  if (gameState.value.player == "play1") {
    play1Score.value += 1;
  } else {
    play2Score.value += 1;
  }
  // 監聽是否有玩家先吃到13顆
  if (play1Score.value == 16) {
    gameState.value.winner = "play1";
    return;
  }
  if (play2Score.value == 16) {
    gameState.value.winner = "play2";
    return;
  }
  gameState.value.SwitchPlayer()
  // switchPlayer();
};
// 移動
const moveChess = (targetChess, compareChess) => {
  ConcreteChessStore.MoveChess(targetChess, compareChess)
  gameState.value.SwitchPlayer()
  // switchPlayer();
};

onBeforeMount(() => {
  // play1先開始

  // shuffleArray(imageIndexArr.value);
  ConcreteChessStore.GetAllChessImageIndex()
  ConcreteChessStore.ShuffleArray()

});
// 監聽是否結束遊戲
// watch(
//   () => gameState.value.winner,
//   () => {
//     if (gameState.value.winner == "平局") {
//       console.log("平局");
//     } else if (gameState.value.winner == "play1") {
//       console.log("winner is play1");
//     } else if (gameState.value.winner == "play2") {
//       console.log("winner is play2");
//     } else {
//       console.log("繼續遊戲");
//       return;
//     }
//   }
// );
</script>

<style scoped>
/* Roboto font */
@import url("https://fonts.googleapis.com/css2?family=Tilt+Warp&display=swap");
.dark-chess-game {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
h1 {
  font-family: "Tilt Warp", cursive;
  font-weight: 700;
  font-size: 4.2rem;
  color: rgb(251, 251, 251);
  text-shadow: 1px 1px 2px rgb(45, 45, 45);
}
img {
  width: 80%;
  transition: 0.3s;
  border-radius: 50%;
}
img:hover {
  transform: scale(1.1);
  box-shadow: 0px 0px 35px -5px rgba(26, 26, 26, 0.75);
}
/* chessboard-container */
.chessboard-container {
  width: 1004px;
  height: 504px;
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  background-image: url("../../public/playground.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 0px 103px 16px rgba(0, 0, 0, 0.75);
  border: 2px solid #000;
}
.chessboard-block {
  width: 125px;
  height: 125px;
  border-right: 2px solid #333;
  border-bottom: 2px solid #333;
  font-size: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.stepCount {
  position: fixed;
  font-family: "Tilt Warp", cursive;
  font-weight: 700;
  font-size: 3.5rem;
  color: rgb(251, 251, 251);
  text-shadow: 1px 1px 2px rgb(45, 45, 45);
  right: 30px;
  top: 20px;
}
/* active class */
.isActive {
  border: 5px solid rgb(255, 255, 255);
  border-radius: 50%;
  box-shadow: 0px 0px 35px -5px rgba(190, 190, 190, 0.75);
  transform: scale(1.2);
}
</style>
