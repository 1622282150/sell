<template>
  <div>
    <div class="shizhong">
      <div class="day">{{days}}天</div>
      <p>
        <span>{{hours}}</span>:
        <span>{{minutes}}</span>:
        <span>{{seconds}}</span>
      </p>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    startTime: String,
    endTime: String
  },
  data() {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  },
  mounted() {
    this.countdown();
  },
  beforeDestroy() {
    clearInterval(this._interval);
  },
  methods: {
    countdown() {
      var msec =
       new Date(this.endTime) - new Date();
       console.log(msec)
       if(msec<0){
         console.log('我是小于0的时间')
         msec=0
       }
      let day = parseInt(msec / 1000 / 60 / 60 / 24);
      let hr = parseInt((msec / 1000 / 60 / 60) % 24);
      let min = parseInt((msec / 1000 / 60) % 60);
      let sec = parseInt((msec / 1000) % 60);
      this.days = day;
      this.hours = hr > 9 ? hr : "0" + hr;
      this.minutes = min > 9 ? min : "0" + min;
      this.seconds = sec > 9 ? sec : "0" + sec;
      const that = this;
      this._interval = setTimeout(function() {
        that.countdown();
      }, 1000);
    }
  },
  computed: {}
};
</script>
<style scoped lang='less'>
@base: 37.5rem;
.shizhong {
  box-sizing: border-box;
  display: flex;
  margin-left: 7 / @base;
  width: auto;
  // height: 17 / @base;
  border-radius: 7px;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ffffff;
  border: solid 1px #ea4332;
  // padding: 0 6 / @base;
  padding-right: 6 / @base;
  .day {
    display: flex;
    justify-content: center;
    align-items: center;
    // height: 17 / @base;
    width: auto;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
    background-color:#ea4332;
    border-radius: 5px;
    padding: 0 6 / @base;
  }
  p {
    padding-left: 4 / @base;
    height: 100%;
    height: auto;
    display: flex;
    align-items: center;
    color: #ea4332;
    span {
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ea4332;
    }
  }
}
</style>