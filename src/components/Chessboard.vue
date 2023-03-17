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
            v-show="item.state"
            :class="{ isActive: item.activeState }"
            :src="getChessUrl(item.index, item.isOpen)"
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
import { ref, onMounted, watch } from "vue";
import useAdjacentChess from "../CustomHook/useAdjacentChess";
let blueCamp = ["將", "士", "象", "車", "馬", "炮", "卒"];
let redCamp = ["帥", "仕", "相", "俥", "傌", "砲", "兵"];
let ChessCategory = ref([
  {
    value: "將",
    quantity: 1,
    id: 1,
  },
  {
    value: "士",
    quantity: 2,
    id: 2,
  },
  {
    value: "象",
    quantity: 2,
    id: 3,
  },
  {
    value: "車",
    quantity: 2,
    id: 4,
  },
  {
    value: "馬",
    quantity: 2,
    id: 5,
  },

  {
    value: "炮",
    quantity: 2,
    id: 6,
  },
  {
    value: "卒",
    quantity: 5,
    id: 7,
  },
  {
    value: "帥",
    quantity: 1,
    id: 8,
  },
  {
    value: "仕",
    quantity: 2,
    id: 9,
  },
  {
    value: "相",
    quantity: 2,
    id: 10,
  },
  {
    value: "俥",
    quantity: 2,
    id: 11,
  },
  {
    value: "傌",
    quantity: 2,
    id: 12,
  },

  {
    value: "砲",
    quantity: 2,
    id: 13,
  },
  {
    value: "兵",
    quantity: 5,
    id: 14,
  },
]);
// 隨機順序
let imageIndexArr = ref([]);
// 玩家狀態
let play1Score = ref(0);
let play2Score = ref(0);
// 遊戲狀態
let gameState = ref({
  player: "play1",
  winner: null,
  continualCount: 1,
  preChooseIndex: null,
  occupiedState: null,
  count: 0,
});
// chess

// 每次開始時隨機更換chess的順序
let getAllChessImageIndex = () => {
  ChessCategory.value.forEach((item, index) => {
    for (var i = 1; i <= item.quantity; i++) {
      // 透過quantity的值產生對硬的id(與url命名同)數量，放入array
      imageIndexArr.value.push({
        index: item.id,
        isOpen: 0,
        activeState: false,
        state: 1,
      });
    }
  });
};

// 隨機洗牌
function shuffleArray(inputArray) {
  getAllChessImageIndex();
  // 正常順序
  inputArray.sort(() => Math.random() - 0.5);
  // shuffle後random順序
}
// 取得本地象棋圖片
const getChessUrl = (name, isOpenState) => {
  if (isOpenState == false) {
    return new URL(`/src/assets/chesses/chessBack.png`, import.meta.url);
  } else {
    return new URL(`/src/assets/chesses/chess${name}.png`, import.meta.url);
  }
};
// 選擇牌
const chooseChess = (target, targetIndex) => {
  // 第一次陣營選擇判斷

  // 重置選取狀態
  resetChessState();

  if (!target.isOpen) {
    target.isOpen = true;
    // 切換玩家
    gameState.value.preChooseIndex = null;
    switchPlayer();
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
      moveCount(1);
      gameState.value.preChooseIndex = null;
    } else if (compareResult == 4) {
      occupiedOtherChess(targetIndex, gameState.value.preChooseIndex);
      moveCount(-1);
    } else if (compareResult == 1) {
      occupiedOtherChess(targetIndex, gameState.value.preChooseIndex);
      moveCount(-1);
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
const resetChessState = () => {
  imageIndexArr.value.forEach((item) => {
    item.activeState = false;
  });
};
// 換人玩
const switchPlayer = () => {
  if (gameState.value.player == "play1") {
    gameState.value.player = "play2";
  } else {
    gameState.value.player = "play1";
  }
};

// 玩家移動記數
const moveCount = (state) => {
  if (gameState.value.count == 49) {
    gameState.value.winner = "平局";
  }
  if (state == 1) {
    gameState.value.count += 1;
    return;
  }
  gameState.value.count = 0;
};
// 第一次選到的陣營
// const getFirstCamp = (initArr, chooseChess) => {
//   let blueCamp = ["將", "士", "象", "車", "馬", "炮", "卒"];

//   let result = blueCamp.findIndex(
//     (item) => item == initArr[chooseChess - 1]?.value
//   );
//   if (play1.value.camp) {
//     return;
//   } else {
//   }
//   if (result == -1) {
//     play1.value.camp = "red";
//     play2.value.camp = "blue";
//   } else {
//     play1.value.camp = "blue";
//     play2.value.camp = "red";
//   }
// };

onMounted(() => {
  // play1先開始

  shuffleArray(imageIndexArr.value);
});

//  佔領棋子
const occupiedOtherChess = (targetChess, compareChess) => {
  let temp = imageIndexArr.value[compareChess];
  imageIndexArr.value[compareChess] = imageIndexArr.value[targetChess];
  imageIndexArr.value[targetChess] = temp;
  imageIndexArr.value[compareChess].state = 0;

  if (gameState.value.player == "play1") {
    play1Score.value += 1;
    console.log(play1Score.value);
    console.log("play1");
  } else {
    play2Score.value += 1;
    console.log("play2");
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

  switchPlayer();
};
// 移動
const moveChess = (targetChess, compareChess) => {
  let temp = imageIndexArr.value[compareChess];
  imageIndexArr.value[compareChess] = imageIndexArr.value[targetChess];
  imageIndexArr.value[targetChess] = temp;
  switchPlayer();
};

// 判斷某一camp的棋子全數被吃完
const xxx = () => {
  let result = imageIndexArr.value.findIndex((item) => item.state !== 1);
  console.log(result);
};

// 監聽是否結束遊戲
watch(
  () => gameState.value.winner,
  () => {
    if (gameState.value.winner == "平局") {
      console.log("平局");
    } else if (gameState.value.winner == "play1") {
      console.log("winner is play1");
    } else if (gameState.value.winner == "play2") {
      console.log("winner is play2");
    } else {
      console.log("繼續遊戲");
      return;
    }
  }
);
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
