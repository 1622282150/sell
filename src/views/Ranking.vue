<template>
  <div class="contain">
    <!-- 头部 -->
    <div class="header">
      <img src="../assets/images/faxian.png" alt />
    </div>

    <!-- banner -->

    <div class="banner">
      <ul>
        <li class="clearfix">
          <div class="face">
            <img src="../assets/images/yang.jpg" alt />
          </div>
          <div class="top">
            <img src="../assets/images/NO1.png" alt />
          </div>
          <div class="details">
            <p>脸型号: 90</p>
            <p>魅号: 20459847</p>
            <p>个人介绍: 每天都要比昨天更好</p>
          </div>
        </li>
        <li class="clearfix">
          <div class="face">
            <img src="../assets/images/yang.jpg" alt />
          </div>
          <div class="top">
            <img src="../assets/images/NO2.png" alt />
          </div>
          <div class="details">
            <p>脸型号: 90</p>
            <p>魅号: 20459847</p>
            <p>个人介绍: 每天都要比昨天更好</p>
          </div>
        </li>
        <li class="clearfix">
          <div class="face">
            <img src="../assets/images/yang.jpg" alt />
          </div>
          <div class="top">
            <img src="../assets/images/NO3.png" alt />
          </div>
          <div class="details">
            <p>脸型号: 90</p>
            <p>魅号: 20459847</p>
            <p>个人介绍: 每天都要比昨天更好</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
/*eslint-disable*/
export default {};
</script>
<style lang="less" scoped>
@desgin: 750;
@base: 108rem;
.contain {
  width: 100%;
  height: 10000 / @base;
}

.header {
  height: 590 / @base;
  img {
    height: 100%;
  }
}

.banner {
  margin-top: 65 / @base;
  ul {
    border-radius: 5 / @base;
    padding: 0 66 / @base;

    li {
      border: 6 / @base solid #ffd6f9;
      padding: 21 / @base 45 / @base;
      margin-bottom: 55 / @base;
      position: relative;

      .top {
        position: absolute;
        top: -41 / @base;
        left: 15 / @base;
        width: 118 / @base;
        height: 102 / @base;
      }
      .face {
        float: left;
        height: 218 / @base;
        width: 218 / @base;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 53 / @base;
        img {
          height: 100%;
          border-radius: 50%;
        }
      }
      .details {
        float: left;
        font-size: 38 / @base;
        color: #333;
        p {
          margin-top: 20 / @base;
        }
      }
    }
  }
}
</style>


