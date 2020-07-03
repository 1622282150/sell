<template>
  <div>
    <div class="user">
      <p></p>
      <!-- <div class="user_list" v-for="(item,index) in userlist" :key="index">
        <img :src="item.img" alt />
        <div class="user_list_right">
            <div class="user_list_right_name">{{item.name}}</div>
            <div class="user_list_right_fans">{{item.fabu}}发布·{{item.fans}}粉丝·{{item.zan}}获赞</div>
            <div v-if="item.islike==0" class="user_list_right_guanzhu">关注</div>
            <div class="user_list_right_yiguanzhu" v-else>已关注</div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userlist: [
        {
          img: require("../../../assets/images/community_listbg.jpg"),
          name: "水光针",
          fabu: "5",
          fans: "555",
          zan: "200",
          islike: 1
        },
        {
          img: require("../../../assets/images/community_listbg.jpg"),
          name: "水光针",
          fabu: "5",
          fans: "555",
          zan: "200",
          islike: 0
        },
        {
          img: require("../../../assets/images/community_listbg.jpg"),
          name: "水光针",
          fabu: "5",
          fans: "555",
          zan: "200",
          islike: 0
        },
        {
          img: require("../../../assets/images/community_listbg.jpg"),
          name: "水光针",
          fabu: "5",
          fans: "555",
          zan: "200",
          islike: 0
        },
        {
          img: require("../../../assets/images/community_listbg.jpg"),
          name: "水光针",
          fabu: "5",
          fans: "555",
          zan: "200",
          islike: 0
        },
        {
          img: require("../../../assets/images/community_listbg.jpg"),
          name: "水光针",
          fabu: "5",
          fans: "555",
          zan: "200",
          islike: 0
        },
        {
          img: require("../../../assets/images/community_listbg.jpg"),
          name: "水光针",
          fabu: "5",
          fans: "555",
          zan: "200",
          islike: 0
        },
        {
          img: require("../../../assets/images/community_listbg.jpg"),
          name: "水光针",
          fabu: "5",
          fans: "555",
          zan: "200",
          islike: 0
        },
        {
          img: require("../../../assets/images/community_listbg.jpg"),
          name: "水光针",
          fabu: "5",
          fans: "555",
          zan: "200",
          islike: 0
        },
        {
          img: require("../../../assets/images/community_listbg.jpg"),
          name: "水光针",
          fabu: "5",
          fans: "555",
          zan: "200",
          islike: 0
        }
      ]
    };
  }
};
</script>
<style scoped lang='less'>
@base:75rem;
.user {
  width: 100%;
  margin-top: 180 / @base;
  padding: 10 / @base 40 / @base;
  .user_list {
      position: relative;
    width: 100%;
    height: 120 / @base;
    // background: red;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    padding: 20 / @base 0;
    img {
      width: 80 / @base;
      height: 80 / @base;
      border-radius: 50%;
    }
    .user_list_right {
      
      // width: calc(100%-80 / @base);
      height: 80 / @base;
      padding-left: 15 / @base;
      .user_list_right_name{
         font-size:30/@base;
      }
       .user_list_right_fans{
         font-size:20/@base;
         color: #B0B0B0;
      }
      .user_list_right_guanzhu{
          position: absolute;
          top: 40 / @base;
          right: 0;
          width:150/@base;
          height:50/@base;
          line-height: 50/@base;
          border: 1px solid  #C6ABEE;
          border-radius: 20px;
          text-align: center;
          font-size: 20/@base;
          color: #C6ABEE;
      }
       .user_list_right_yiguanzhu{
          position: absolute;
          top: 40 / @base;
          right: 0;
          width:150/@base;
          height:50/@base;
          line-height: 50/@base;
          border: 1px solid  #B0B0B0;
          border-radius: 20px;
          text-align: center;
          font-size: 20/@base;
          color:#B0B0B0;
      }
    }
  }
}
</style>