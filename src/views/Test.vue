<template>
  <main class="test">
    Страница для разных тестов
    <br />
    <textarea class="textarea" v-model="messageText" placeholder="Write something to show in notification"></textarea>

    <div>
      Время задержки для нотификаций указовать в МИЛЕСЕКУНДАХ <br />
      <strong>1 секунда = 1000 милесекунд</strong>
    </div>
    <Input
      id="time"
      v-model="time"
      placeholder=""
      autocomplete="off"
      type="number"
      width="300px"
      height="46px"
    />
    <br />
    <div class='buttons' style="width: 400px; display: flex; justify-content: space-evenly">
       <span style="cursor: pointer; color: #016E3B" @click="$toast.open({
                message: `${messageText}`,
                type: 'success',
                duration: time
              })">Show success</span>
      <span style="cursor: pointer; color: red" @click="$toast.open({
                message: `${messageText}`,
                type: 'error',
                duration: time
              })">Show error</span>
      <span style="cursor: pointer; color: #ffc107" @click="$toast.open({
                message: `${messageText}`,
                type: 'warning',
                duration: time
              })">Show warning</span>
      <span style="cursor: pointer; color: #3f51b5" @click="$toast.open({
                message: `${messageText}`,
                type: 'info',
                duration: time
              })">Show info</span>
    </div>
    <div class='icons-font'>


      <i class="icon-exit-to-app-button"></i>   <br />
      <i class="icon-expand-arrow"></i>   <br />
      <i class="icon-import"></i>   <br />
      <i class="icon-information"></i>   <br />
      <i class="icon-keyboard-left-arrow-button"></i>   <br />
    </div>

    <br />

    <div class="buttonAuth">
      <ButtonAuth
        text="Test"
        :isLoading="3 > 2"
      />
    </div>

<span @click="test()">
    <Button
      text="Referef"

    />
  </span>
    <br />
    <br />
    <br />
    <br />
    <div class="laoders">


      <div class="sbl-circ-path"></div>
    <div class="lds-dual-ring"></div>
    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    <div class="lds-hourglass"></div>
    <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    <div class="lds-ripple"><div></div><div></div></div>
    <div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>

  </main>
</template>

<script>
import Button from '@/components/Form/Button.vue';
import Input from '@/components/Form/Input.vue';
import ButtonAuth from './Auth/components/Button'
export default {
  components: {
    Button,
    ButtonAuth,
    Input
  },
  data() {
    return {
      messageText: '',
      time: 3000
    }
  },
  methods: {
    async test(){
      await this.axios.get(`${process.env.VUE_APP_API_URL}test-ref456456`)
        .then(data => {
          if(data.data.success) {
            // console.log(data.data.message);
            this.$toast.open({
              message: `Успешно реквест сделан !`,
              type: 'success',
              duration: 30000
              // all other options
            });
          } else {
            alert("error " + data.data.message);
            // console.log(data.data.message);
          }
        })
        .catch(function(e){
          //console.log('FAILURE!!');
          alert(e)
        });
    },
  }
};
</script>

<style
  lang="scss"
  scoped
>
  .test {
    position: relative;
  }
  .icons-font {
    position: absolute;
    top: 50px;
    right:  300px;
    & > i {
      color: $color--light-gray;
      cursor: pointer;

      &:hover {
        color: $color--dark--blue
      }
    }
  }
.buttonAuth {
  width: 300px;
  margin-top: 50px;
}
.laoders {
  display: flex;
  justify-content: space-between;
}

.sbl-circ-path {
  height: 48px;
  width: 48px;
  color: rgba(90, 90, 90, 0.2);
  position: relative;
  display: inline-block;
  border: 5px solid;
  border-radius: 50%;
  border-right-color: #5a5a5a;
  animation: rotate 1s linear infinite; }

@keyframes rotate {
  0% {
    transform: rotate(0); }
  100% {
    transform: rotate(360deg); } }

.lds-spinner {
  color: official;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-spinner div {
  transform-origin: 40px 40px;
  animation: lds-spinner 1.2s linear infinite;
}
.lds-spinner div:after {
  content: " ";
  display: block;
  position: absolute;
  top: 3px;
  left: 37px;
  width: 6px;
  height: 18px;
  border-radius: 20%;
  background: #3b4b68;
}
.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}
.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}
.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}
.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}
.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}
.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}
.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}
.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}
.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}
.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}
.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}
.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}
@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}


.lds-default {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-default div {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #3b4b68;
  border-radius: 50%;
  animation: lds-default 1.2s linear infinite;
}
.lds-default div:nth-child(1) {
  animation-delay: 0s;
  top: 37px;
  left: 66px;
}
.lds-default div:nth-child(2) {
  animation-delay: -0.1s;
  top: 22px;
  left: 62px;
}
.lds-default div:nth-child(3) {
  animation-delay: -0.2s;
  top: 11px;
  left: 52px;
}
.lds-default div:nth-child(4) {
  animation-delay: -0.3s;
  top: 7px;
  left: 37px;
}
.lds-default div:nth-child(5) {
  animation-delay: -0.4s;
  top: 11px;
  left: 22px;
}
.lds-default div:nth-child(6) {
  animation-delay: -0.5s;
  top: 22px;
  left: 11px;
}
.lds-default div:nth-child(7) {
  animation-delay: -0.6s;
  top: 37px;
  left: 7px;
}
.lds-default div:nth-child(8) {
  animation-delay: -0.7s;
  top: 52px;
  left: 11px;
}
.lds-default div:nth-child(9) {
  animation-delay: -0.8s;
  top: 62px;
  left: 22px;
}
.lds-default div:nth-child(10) {
  animation-delay: -0.9s;
  top: 66px;
  left: 37px;
}
.lds-default div:nth-child(11) {
  animation-delay: -1s;
  top: 62px;
  left: 52px;
}
.lds-default div:nth-child(12) {
  animation-delay: -1.1s;
  top: 52px;
  left: 62px;
}
@keyframes lds-default {
  0%, 20%, 80%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
}


.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #3b4b68;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}


  .lds-hourglass {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-hourglass:after {
    content: " ";
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    margin: 8px;
    box-sizing: border-box;
    border: 32px solid #3b4b68;
    border-color: #3b4b68 transparent #3b4b68 transparent;
    animation: lds-hourglass 1.2s infinite;
  }
  @keyframes lds-hourglass {
    0% {
      transform: rotate(0);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    50% {
      transform: rotate(900deg);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    100% {
      transform: rotate(1800deg);
    }
  }


  .lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #3b4b68;
    border-radius: 50%;
    animation: lds-ring 1.2s  infinite;
    border-color: #3b4b68 transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }


  .lds-dual-ring {
    display: inline-block;
    width: 80px;
    height: 80px;
  }
  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #3b4b68;
    border-color: #3b4b68 transparent #3b4b68 transparent;
    animation: lds-dual-ring 1.4s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .buttons {
    span {
      background-color: #e0e4ed;
      padding: 20px 0;
        &:hover {
          background-color: $color--light-gray;
       }
    }
  }
  .textarea {
    width: 300px;
    height: 100px;
    display: block;
    font-size: 18px;
  }
.test {
  padding: 30px 30px 0;

  & > * {
    margin-bottom: 15px;
  }
}
</style>
