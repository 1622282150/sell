<template>
  <div>
    <van-uploader :after-read="afterRead" />
  </div>
</template>

<script>
import { Uploader } from "vant";
export default {
  data() {
    return {};
  },
  mounted() {
    this.get();
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    get() {
       this.axios.post(
        "https://openapi.mtlab.meitu.com/v1/facedetect?api_key=rF5GIhp5ReLKgLV91CKj5BO1q2FTLMmc&api_secret=5wGaQX_jsau6lcWGuENJHXn8zpWH8coY",

        {
          parameter: {
            nFront: 1
          },
          extra: {},
          media_info_list: [
            {
              media_data:
                "https://oss.mtlab.meitu.com/public/itc2_gumd4GoGYxjW9Ncq5rzVlVzmnnT/demo/skin/1.jpg",
              media_profiles: {
                media_data_type: "url"
              }
            }
          ]
        }
      );
      
    }
  }
};
</script>