<template>
<!--  数字键盘-->
    <div class="Digital">
      dadadadadadshen
      <div class="fix">
        <van-password-input
          :value="value"
          info="密码为 6 位数字"
          @focus="showKeyboard = true"
        />
      </div>


      <!-- 数字键盘 -->
      <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard = false"
      />
    </div>
</template>

<script>
    export default {
        name: "Digital",
      data(){
          return {
            showKeyboard:false,
            value:''
          }
      },
      mounted(){

      },
      component:{

      },
      methods:{
        onInput(key) {
          this.value = (this.value + key).slice(0, 6);
          if(this.value.length===6){
            setTimeout(()=>{
              this.value=''
            },3000)
          }
        },
        onDelete() {
          this.value = this.value.slice(0, this.value.length - 1);
        }
      }
    }
</script>

<style scoped lang="scss">
.Digital{
  position: relative;
  min-height: 100%;
  .fix{
    position: fixed;
    padding-top: 2rem;
    top: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0,0,0,0.2);
    height: 100%;
  }
}
</style>
