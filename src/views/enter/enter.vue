<template>
  <div>
    <header>
      <i @click="back" class="iconfont icon-zuojiantou"></i>
      <div class="head">入驻合作</div>
    </header>
    <div class="bu"></div>
    <div class="title">请提交相关入驻资料,审合通过后即可入驻</div>
    <div style="width:100%;height:6px;background:#EEEEEE"></div>
    <!-- 进度条 -->

    <div class="level">
      <div class="pic">
        <ul>
          <li v-for="(item, index) in tip" :key="index">
            <!-- <img
                src="../../assets/images/setting_tou.png"
                alt
                :class="index <= isdone ? 'active':''"
            />-->
            <div class="img" :class="index <= isdone ? 'active':''"></div>
            <span>{{item}}</span>
          </li>
        </ul>
        <div class="line">
          <div class="activeline" :style="{width}"></div>
        </div>
      </div>
    </div>
    <!--  盒子第一步-->
    <div class="box" v-show="isdone==0">
      <div class="box_item">
        <div class="box_title">
          <span style="color:red">*</span>营业执照复印件(加盖公章)
        </div>
        <!-- <div class="box_img"></div> -->
        <div class="box_daimg">
          <span v-show="!isfirst_img">请上传营业执照复印件</span>
          <input type="file" @change="handlerUpload1($event)" />
          <img class="box_img" v-if="!isfirst_img" src="../../assets/images/ruzhu_shang1.png" alt />
          <img class="box_img" v-else :src="'http://test1.merrychange.net'+first_img" alt />
        </div>
        <div class="box_title">
          <span style="color:red">*</span>营业执照有效期
        </div>
        <div @click="sel_chang" class="xuan_time">
          <img v-if="ischang" src="../../assets/images/ruzhu_yi.png" alt />
          <img v-else src="../../assets/images/ruzhu_wei.png" alt />
          <div>长期有效</div>
        </div>
        <div @click="sel_duan" class="xuan_time">
          <img v-if="!ischang" src="../../assets/images/ruzhu_yi.png" alt />
          <img v-else src="../../assets/images/ruzhu_wei.png" alt />
          <div>选择时间</div>
        </div>
        <div v-show="!ischang">
          <div @click="show_oldtime" class="zhen_time">
            自
            <div class="biao">{{oldyear}}</div>年
            <div class="biao">{{oldmonth}}</div>月
            <div class="biao">{{olddate}}</div>日
          </div>
          <div @click="show_newtime" class="zhen_time">
            至
            <div class="biao">{{newyear}}</div>年
            <div class="biao">{{newmonth}}</div>月
            <div class="biao">{{newdate}}</div>日
          </div>
        </div>
      </div>
      <div v-if="isfirst_img" class="bottom1" @click="isdone=1">下一步</div>
      <div v-else class="bottom2" @click="over">下一步</div>
    </div>
    <!-- 第二部 -->
    <div class="box2" v-show="isdone==1">
      <div class="box_item">
        <div class="box_title">
          <span style="color:red">*</span>请上传身份证正面
        </div>
        <!-- <div class="box_img"></div> -->
        <div class="box_daimg">
          <input type="file" @change="handlerUpload2($event)" />
          <img v-if="!second_img" class="box_img" src="../../assets/images/ruzhu_shang1.png" alt />
          <img v-else :src="'http://test1.merrychange.net'+second_img" class="box_img" alt />
        </div>
        <div class="box_title">
          <span style="color:red">*</span>请上传身份证反面
        </div>
        <!-- <div class="box_img"></div> -->
        <div class="box_daimg">
          <input type="file" @change="handlerUpload3($event)" />
          <img v-if="!second_img2" class="box_img" src="../../assets/images/ruzhu_shang1.png" alt />
          <img v-else :src="'http://test1.merrychange.net'+second_img2" class="box_img" alt />
        </div>
      </div>
      <div class="bottom1" v-if="issecond_img&&issecond_img2" @click="isdone=2">下一步</div>
      <div class="bottom2" v-else @click="over">下一步</div>
    </div>
    <!-- d第三部 -->
    <div class="box3" v-show="isdone==2">
      <div class="box_item">
        <div class="box_title">
          <span style="color:red">*</span>联系电话
        </div>
        <div class="box_phone">
          <div class="box_phone_left">
            <img src="../../assets/images/ruzhu_phone.png" alt />
          </div>
          <div class="box_phone_middle">
            <input type="text" placeholder="请输入手机号码" v-model="tel" />
          </div>
        </div>
        <div class="box_phone">
          <div class="box_phone_left">
            <img src="../../assets/images/ruzhu_code.png" alt />
          </div>
          <div class="box_phone_middle">
            <input type="text" placeholder="请输入验证码" v-model="code" />
          </div>
          <button class="box_phone_right" @click="getcode" :disabled="disabled">{{btntxt}}</button>
        </div>
        <div class="box_title">
          商标证书复印件（加盖公章）或品牌授权书
          <a
            href="http://test1.merrychange.net/Content/Template/品牌授权书.zip"
          >(模板下载)</a>
        </div>
        <!-- <div class="box_img"></div> -->
        <div class="box_daimg">
          <input type="file" @change="handlerUpload4($event)" />
          <img class="box_img" v-if="!third_img" src="../../assets/images/ruzhu_shang1.png" alt />
          <img class="box_img" v-else :src="'http://test1.merrychange.net'+third_img" alt />
        </div>
      </div>
      <div class="bottom1" v-if="isthird_img" @click="postSeller">下一步</div>
      <div class="bottom2" v-else @click="over">下一步</div>
    </div>
    <!-- 第四步完成 -->
    <div class="box4" v-show="isdone==3">
      <div class="over_top">
        <img src="../../assets/images/ruzhu_over.png" alt />提交成功
      </div>
      <p>我们的企业资质审核时间为3-5个工作日,审核结果以电话形式通知，请注意接听</p>
      <div class="bottom1" @click="$router.push('/setting')">完成</div>
    </div>

    <!-- 过去时间弹出层 -->
    <van-popup v-model="showold">
      <div class="oldtime">
        <!-- <div class="oldtime_title">
          <div class="oldtime_titleson">年</div>
          <div class="oldtime_titleson">月</div>
          <div class="oldtime_titleson">日</div>
        </div>-->
        <div class="oldtime_main">
          <van-datetime-picker
            :visible-item-count="3"
            @cancel="oldcancel"
            @confirm="oldconfirm"
            v-model="oldcurrentDate"
            :min-date="minDate"
            type="date"
          />
        </div>
      </div>
    </van-popup>
    <!-- 到达时间弹出层 -->
    <van-popup v-model="shownew">
      <div class="oldtime">
        <!-- <div class="oldtime_title">
          <div class="oldtime_titleson">年</div>
          <div class="oldtime_titleson">月</div>
          <div class="oldtime_titleson">日</div>
        </div>-->
        <div class="oldtime_main">
          <van-datetime-picker
            :visible-item-count="3"
            @cancel="newcancel"
            @confirm="newconfirm"
            v-model="newcurrentDate"
            :min-date="minDate"
            type="date"
          />
        </div>
      </div>
    </van-popup>
    <!-- 进入页面弹出层 -->
    <van-popup v-model="showxieyi" :close-on-click-overlay="false">
      <div class="ruzhu">
        <div class="ruzhu_title">入驻协议</div>
        <div class="ruzhu_box">
          <p>
            特别提醒：在接受本合同之前，请您仔细阅读本合同的全部内容。如果您对本合同的条款有疑问的，请通过魅千金客服渠道进行询问，魅千金将向您解释条款内容。如果您不同意本合同的任意内容，或者无法准确理解魅千金对条款的解释，请不要同意本合同或使用本合同项下的服务，否则，表示您已接受了以下所述的条款和条件，同意受本合同约束。届时您不应以未阅读本合同的内容或者未获得魅千金对您问询的解答等理由，主张本合同无效，或要求撤销本合同。
            为充分维护您的合法权益，魅千金特别提醒，请您务必仔细阅读本合同内容。
            一、定义条款 您确认并同意本条款中对于各名词的解释及定义，并同意按照该定义履行相关义务。
            1.1 平台（以下统称为“平台”）：特指由魅千金现在或将来拥有合格权限运营/ 管理的，提供团购等技术服务的网络服务平台，包括但不限于魅千金管理的网络服务平台，及未来可能新设或合作的网络平台等。
            1.2 用户：即在平台注册，并使用其本人注册的账户，通过平台展示的信息获取商品/ 服务的个人。
            1.3 团购信息：您通过平台发布的，在平台页面上展示的您商品/ 服务/ 优惠信息（如商品/ 服务描述、兑换券有效期、团购规则、门店信息等）。该信息为您就前述商品/ 服务向用户发出的要约，一旦用户通过平台确认同意购买您该商品/ 服务，即视为您与用户达成了相应合同。
            1.4 商家中心：为完成合作内容，魅千金基于合同为您提供的管理系统，包括“商家中心”等 。
            1.5 团购：针对由一定数量的用户组团，通过平台以较低折扣购买您通过平台发布的商品/ 服务，并最终由您提供相应商品/ 服务的网络交易行为。
            1.6 兑换券：指用户通过平台获取的，您向用户提供商品/ 服务的消费凭证。兑换券包括但不限于团购券、平台订单等，展现方式包括但不限于字符、二维码、订单、短信、电子邮件等。
            1.7 兑换券消费数：用户已实际消费的兑换券数量。鉴于您提供的商品/ 服务通过商家中心进行验证为用户实际消费的依据，故兑换券消费数以平台验证已标记消费的数量为准。
            1.8 门店价：签订本合同时，您提供的商品/ 服务直接对外销售/ 提供时的单份销售价格。
            1.9 平台价：您提供的商品/ 服务通过平台向用户展示的价格。
            1.9.1 团购平台价为参加平台团购活动时的单份销售价格。
            1.10 代收款项：魅千金/ 魅千金关联方/ 魅千金合作方代您收取的，用户通过平台向您支付的已实际消费的兑换券对应的款项等功能对应的消费款项。该款项扣除双方约定的服务费后，由魅千金支付给您。
            1.10.1 团购代收款项计算标准为：团购平台价×兑换券消费数。
            1.11 服务费：为了实现您进入平台开展经营活动、进行交易之目的，魅千金为您提供本合同约定之服务收取的相关费用。
            1.11.1 团购技术服务的服务费为截至兑换券有效期截止之日，兑换券消费数×服务费价格。
            1.12 服务费价格：用户每实际消费一张兑换券每实际消费一次，您应向魅千金支付的服务费数额。团购及其它功能服务费计算标准以双方通过书面、邮件或商家中心确认的比例为准。
            1.13 结算价：针对每一张已实际消费的兑换券，于代收款项中扣除应收取的服务费、商家自促费等其他费用后，应支付给您的数额。结算价= 团购平台价- 团购服务费价格- 商家自促费。
            1.14 代收净额：对应用户实际消费的兑换券数量，应支付给您的结算款项。
            1.14.1 团购技术服务代收净额计算标准为：团购结算价×兑换券消费数。
            二、服务内容
            为实现您进入平台开展经营活动、通过平台发布商品/ 服务信息、与用户进行交易之目的，魅千金为您提供授权许可计算机软件及软件技术服务、网络技术服务及其他相关服务，具体服务内容如下：
            2.1 团购技术服务
            魅千金为您提供商家中心等系统平台、软硬件设备，以实现您商品/ 服务在线展示，为用户提供兑换券验证、汇总管理经营数据等经营行为，并实现代您收取商品/ 服务对应的款项的技术服务。
            2.1.1 授权许可您使用魅千金所有或合法运营、管理的与合作内容相关的计算机软件，并提供软件技术服务。
            2.1.2 魅千金以自有技术、知识，为您解决其在平台经营过程中遇到的网络技术问题。例如，针对您使用“平台验证系统”进行技术指导和专业培训。
            2.1.3 技术服务费结算：魅千金通过平台代您收取商品/ 服务对应款项，并将代收净额支付给您。
            三、服务费用及支付方式
            基于上述服务，您应按照约定支付服务费。您同意并确认，魅千金方可于代收款项中直接扣除上述服务费后，将代收净额支付给您。
            四、您的权利义务
            4.1 您应遵守本合同之约定及平台公告发布的与您履行本合同项下义务相关的各项规则。
            4.2 您应保证您为一家依据中国法律合法成立并有效存续的法人或其它商事主体，能够独立承担法律责任，并具有履行本合同所需的一切权利及能力；您因资质或提供的您信息而致本合同无法正常履行的，由此产生的一切结果由您负责，您还需赔偿魅千金因此遭受的损失。
            4.3 您承诺向魅千金提交的证明材料合法、真实、准确详尽。否则您承诺独立承担因此导致的相应责任及后果，使魅千金免责；
            4.4 您承诺通过商户中心发布、编辑、更新的商户信息（包括但不限于文字、图片等）真实准确，并且不侵犯任何人的合法权益；
            4.5 您向用户提供商品/ 服务时，应确保与您信息一致，您在兑换券有效期内，应按照本合同约定、信息描述、订单及魅千金相关规则接受用户的预约和消费。因您原因造成的用户投诉、经济损失等相关后果均由您承担。
            4.6 您应合法经营，且提供的商品/ 服务应符合国家法律、法规、规章的规定。如因您行为或您提供的商品/ 服务造成用户损失的，由您承担相应的赔偿责任。如魅千金基于前述情况向消费者先行赔付的，魅千金有权进行追偿。
            4.7 您应按照平台价为用户开具相应金额的发票。
            4.8 您应保证合作期间经营场所内实际销售价格不低于平台价，且不得唆使或诱使持兑换券消费的用户放弃兑换券而改为使用现金或其他形式消费，否则魅千金有权立即终止本合同并要求您按照本合同约定承担违约责任。
            4.9 对于虽已成交但并未实际消费的兑换券，无论该兑换券有效期是否届满，您同意魅千金/ 平台实际经营者均有权留存该兑换券所对应的款项，并根据订单的约定及用户的要求与意愿，处置相应款项。
            4.10 您应在用户消费时及时通过商家中心验证兑换券，因您怠于履行验证义务而导致的一切损失由您自行承担。
            4.11 您承诺并保证您对使用的商品、商标、品牌、图片等享有合法权利或合法授权，不会侵犯他人的知识产权、企业名称权等权益；且您承诺魅千金不会因展示您上述信息而遭受来自第三方的任何投诉、抗辩及争议，否则相应责任均由您承担。
            4.12 如魅千金在合作过程中提供了相应设备、设施给您使用，您确认前述设备的所有权属于魅千金，您仅有使用权并应尽到妥善保管义务，且基于前述设备的使用按魅千金要求向您提供相应数据。因您原因造成的设备损毁丢失，您应进行相应赔偿（具体价格双方可选择采用书面、邮件或商家中心操作任一种方式确认）。
            4.13 无论本协议因任何原因终止，您承诺立即停止以任何方式使用魅千金相关的商标、标识、网站名称、网站内容等。
            4.14 您同意用户通过平台发布的针对您的评论、照片等，纯属用户个人意见，与魅千金立场无关，魅千金不承担任何责任。
            4.15 您应按照合同约定、页面信息及平台方规则向用户提供商品/ 服务，否则由此引起用户投诉或给用户/ 魅千金造成损失的，相应责任均由您承担，且魅千金有权解除合同并要求您按本合同约定支付违约金。
            4.16 您不得通过任何手段、以任何方式自行或者委托他人进行如下行为（包括但不限于虚拟交易、虚拟验证、自买自卖、伪造网络用户真实消费、体验、刷单等违反平台规则、损害魅千金利益的行为，或伪造、仿冒等其他违反国家法律法规的行为，或其它违反公平竞争诚实信用原则与商业道德的行为），否则，魅千金有权解除合同，在代收净额中扣除上述行为给魅千金造成的损失，并要求您按照本合同约定支付违约金。
            4.17 如在合同履行期限内，因您原因造成的方案、项目或合同中止（包括但不限于服务方案已下线或停止营业），您应及时通知魅千金。如因您怠于通知造成的一切纠纷和责任（包括但不限于用户投诉、行政机关处罚等）由您承担，若由此给魅千金造成经济损失，您应进行赔偿。
            4.18 您保证双方合作项目在其它平台销售的平台价不得低于本合同涉及平台价，否则魅千金有权解除合同。
            五、“商家后台管理系统”权限开通及调整
            5.1“商家后台管理系统”权限开通及延展
            5.1.1“商家后台管理系统”权限开通
            对于商家拟开展经营的特定店铺，魅千金在满足以下全部条件后，为商家开通相关“商家后台管理系统”权限，魅千金将在权限正式开通前一个工作日以邮件及系统通知方式告知商家：
            1)商家已通过“商家在线入驻系统”提交入驻申请，包括所需信息的提交和在线同意本协议；
            2)商家入驻申请已通过魅千金审核,，并依据审核结果另行签署了相关协议；
            3)商家已足额缴纳保证金与首个服务期对应的“固定技术服务费”（费用标准详见第8条）；商家在未完成缴费前，仅具有缴费权限。
            5.1.2“商家后台管理系统”权限延展
            商家需持续经营，在服务期到期后延展权限的，应在权限到期前45日内，通过“商家后台管理系统”向魅千金提出申请，魅千金收到申请且商家满足以下全部条件后为商家延展一年有效期，以此类推：
            1）商家延展申请（含提交各项“资格要求”所需资料）已通过魅千金审核；
            2）商家已足额缴纳下一期服务期对应的“固定技术服务费”；商家前一服务期到期，而又未完成缴费的，商家权限将被限制为只有缴费权限；
            3）如需签署协议的，商家还应与魅千金完成协议签署。
            5.2“商家后台管理系统”权限停止
            5.2.1“商家后台管理系统”权限停止，亦称限制“商家后台管理系统”权限，包括商家权限的全部停止和商家权限的部分停止。商家权限全部停止时，商家无法自行通过“商家后台管理系统”对其店铺进行任何操作，同时“魅千金平台”上不再显示商家店铺信息及其商品信息；商家权限部分停止时，商家只能使用“商家后台管理系统”的部分功能，可能导致商家无法上传维护商品信息，已上传信息无法在“魅千金平台”显示等情况的发生。
            5.2.2商家权限的全部停止
            5.2.2.1商家自愿申请权限全部停止的，应至少提前七个工作日向魅千金提出申请，经魅千金审核同意后由魅千金停止其权限；为弥补魅千金已投入的人力、物力和技术支持，商家同意魅千金不退还该店铺未到期部分对应的平台使用费。
            5.2.2.2在商家经营过程中，发现以下任一情形时，魅千金有权随时停止商家全部权限；
            1）商家不满足第4.1条资格要求的，比如提交虚假文件、资质不全或过期而无法及时补全、更新的；
            2）商家产品价格、规格等信息标示错误，导致投诉、争议和纠纷的，或者遭受行政机关调查、处罚的；
            3）商家产品质量、标识不合格的，或者产品涉嫌走私、假冒伪劣、三无产品、旧货、返修品的；
            4）商家连续30（三十）日或每一服务期内累计45（四十五）日未经营店铺的；
            5）商家未经魅千金事先审核产品类目、品牌，而上传某类目、品牌商品的；
            6）其他违反本协议约定的，或者其他侵犯消费者、魅千金及其关联公司/机构权益的。
            5.2.3商家权限的部分停止
            5.2.3.1商家自愿申请权限部分停止的，应至少提前七个工作日向魅千金提出申请，经魅千金审核同意后由魅千金停止其相应权限。
            5.2.3.2在商家经营过程中，发现以下任一情形时，魅千金有权随时停止商家部分权限，；
            1）第三方向魅千金投诉商家侵权、违约，有待进一步核实或已查证部分侵权、违约属实的；
            2）未按承诺参加“魅千金平台”相关活动的；
            3）商家违反本协议约定，但不属于5.2.2.2情形的。
            5.2.4商家未经魅千金同意，擅自停止店铺经营，或者商家因为出现第5.2.2.2条情形被魅千金停止店铺服务的，商家已缴纳的本协议附件所涉及特定店铺的平台使用费未到期部分，作为商家向魅千金支付的违约金，该金额不足以冲抵商家应付违约金和赔偿金时，商家应另行支付差额。
            5.3“商家后台管理系统”权限增加
            魅千金将针对“商家后台管理系统”在使用过程中出现的问题，以及商家提出的需求，和基于魅千金平台运营需要等，不断的改进和优化，一旦“商家后台管理系统”版本升级，将可能导致商家权限的增加，在此，商家知晓并同意，在使用新版本的“商家后台管理系统”时，若涉及资费调整，应按新版本对应的费用标准支付技术服务费。
            六、魅千金的权利义务
            6.1 魅千金应向您提供本合同约定的技术服务及其他相关服务。
            6.2 为更好的推荐您的商品/ 服务，以提升您的知名度/ 订单量，魅千金可通过适当的方式和渠道做相关宣传介绍，并进行相关推荐/ 推广。您对上述行为予以认可，并授权魅千金就您及其相关门店的名称、LOGO 、图片、文字、门店、会员优惠等信息进行使用。
            6.3 魅千金有权根据本合同的约定向您收取服务费，并且有权先从代收净额中直接扣除该等服务费。
            6.4 魅千金有权对您拟在平台发布的内容、信息进行形式审核，必要时魅千金有权依据法律法规、政策规定及平台规则拒绝发布( 如商家拟发布涉嫌黄、赌、毒及其他违法或者违反公序良俗的信息) 。
            6.5 除展示信息内容或文字确有错误外，您不得要求魅千金修改已发布于平台上的您信息。
            6.6 魅千金有权在确保双方约定结算价不变的前提下，根据市场实际需求适度调整平台价，并在价格调整后通知您。
            6.7 如用户就您商品/ 服务向魅千金/ 平台实际经营者投诉，魅千金经核实后，有权要求您配合解决该投诉，在该投诉未解决之前魅千金有权拒绝向您支付涉及投诉的代收净额，待投诉解决后再行支付。
            6.8 魅千金有权升级、更新商家中心系统，如有变更，魅千金将通过前述系统以公告形式作出通知。
            七、违约责任
            7.1 除非本合同另有约定，如您违反诚信原则，或违反本合同的任一条款或平台上的任何规则，或您违反其在本合同的履行中做出的任何承诺和保证，或您提供的资质、证照等信息不属实，则魅千金及其关联方有权停止向您支付代收净额，并有权要求您在一定期限内纠正违约行为。如您在魅千金要求的期限内纠正违约行为后符合本合同约定的，魅千金应恢复向您支付代收净额；如您在魅千金要求的期限内拒绝纠正或纠正后仍不符合本合同约定的，魅千金有权单方解除本合同，并有权要求您按照自本合同生效之日起累计至您发生违约行为之日的代收款项总额的30% 向其支付违约金。
            7.2 因魅千金未能按照合同约定履行义务包括未及时付款，且在您要求的期限内拒绝纠正或纠正后仍不符合本合同约定的，应承担因此给您造成的损失。
            7.3商家承诺不在魅千金平台销售假冒商品或水货、旧货、不合格产品等，否则如销售假冒商品，则魅千金有权要求商家支付人民币100万元或该店铺全部累计销售额10倍的金额（二者以高者为准）作为违约金；如销售水货、旧货、不合格产品等，则魅千金有权要求商家支付人民币10万元或全部保证金金额（二者以高者为准）作为违约金。同时魅千金有权对商家采取暂停向商家提供服务、暂时关闭商家后台管理账户、暂缓支付未结算款项、终止合作等措施。违约金不足以弥补魅千金损失的，商家还应全部赔偿（包括但不限于魅千金对客户的赔偿、补偿、行政部门的处罚、律师费、诉讼费、鉴定费、差旅费等）。上述违约金的支付并不影响魅千金依照本协议和/或平台规则的约定扣除相应的保证金。
            八、费用和结算
            8.1费用标准及费用类型
            商家同意按照“魅千金”公示链接中明示的标准以及后续更新的标准或补充协议（若有）中确定的标准向“魅千金”支付平台使用费、保证金及技术服务费等费用。
            8.1.2保证金
            8.1.2.1商家知悉并同意向魅千金缴纳相应金额的保证金，作为履行本协议尤其是消费者权益保障义务的保证，并进一步知悉且同意在商家违反本协议相关约定时，魅千金有权根据相关约定扣除相应金额的保证金作为违约金或给予买家等第三方的赔偿。
            8.1.2.2保证金额度
            8.1.2.2.1商家应根据上述“魅千金”公示链接中的保证金缴纳标准、魅千金平台相关招商规则及自身申请经营的类目情况，将对应金额的保证金按照约定的时间及方式支付至魅千金指定账户。
            8.1.2.2.2商家知悉并同意：商家缴纳的保证金在任何情况下，均不计算任何利息。同时，魅千金有权根据商家经营类目的变化、商品实际销售情况、履约能力、资信状况等情形调整商家交付的保证金额度，或者依据本协议约定扣减保证金，商家应在魅千金通知后5日内补足相应金额的保证金，否则，魅千金有权从未结算款项中直接扣除相关金额、限制“商家合同管理系统”权限，直至解除本协议。
            8.1.2.3保证金的管理和使用
            8.1.2.3.1在下述情形下，魅千金有权根据具体情况直接扣除部分或全部保证金：
            1)商家违反本协议项下的任何保证、承诺或义务的；
            2)商家的行为违反国家法律法规及其它规范性文件等规定的；
            3)商家在魅千金平台发布商品、达成交易、履行交易相关活动中，违反法律法规、政策、魅千金平台任何规则或违反其对客户的承诺，或被客户投诉、索赔时，魅千金判断应对客户进行赔付的；
            4)商家违反其与魅千金或魅千金关联公司/机构的其他协议或魅千金平台任何规则，给魅千金或其关联公司/机构造成任何损失（包括但不限于诉讼赔偿、诉讼费用、律师费用等）的；
            5)本协议中约定的其它可扣除保证金的情形出现的。
            8.1.2.3.2魅千金如使用保证金进行任何抵扣或赔付，将以书面方式（包括但不限于电子邮件、传真等）通知商家，并在书面通知中，说明抵扣和/或赔付原因及抵扣和/或赔付的金额。
            8.1.2.3.3若商家保证金不足时，魅千金没有使用自有资金替商家支付赔偿金、补偿金、抚恤金或其他任何款项的义务，但若魅千金进行了该等支付，则魅千金有权要求商家于五日内足额赔偿。
            8.1.2.4保证金的退还
            服务协议终止且服务协议所约定的特定店铺所有订单终止、所有争议及索赔已处理完毕、已完成交易的商品质保期届满后，商家可向魅千金提出退还保证金的书面申请，魅千金审核通过后三个月内，扣除依据协议应扣除的各项费用后，将保证金余额退还商家，如商家支付的保证金，不足以抵扣应由商家支付违约金、赔偿金等款项的，魅千金将不予退还商家保证金，并保留向商家追偿的权利。
            8.1.3技术服务费
            商家在申请入驻及经营过程中，魅千金提供相关的系统维护和支持服务，而向商家收取的技术服务费：
            8.1.3.1固定技术服务费（亦称“平台使用费”）：商家在获得缴费权限后应向魅千金支付的与特定店铺服务期对应的技术服务费。
            8.1.3.2按比例计收的服务费（亦称“技术服务费”）：魅千金在收取固定技术服务费之外，在商家每达成一笔交易而实时向商家收取的技术服务费。
            8.1.4增值服务费
            商家使用魅千金或魅千金指定第三方提供的增值服务时，应按照另行签订的协议履行其义务并支付相关费用。
            8.1.5税费
            商家在经营过程中，应自行承担相关税费，魅千金无义务为商家代扣代缴。
            8.2费用结算：“魅千金”与商家按照下述约定对商家基于本协议而设立店铺产生的订单货款进行结算：
            8.2.1商家同意：“魅千金”将引入第三方支付机构或银行提供该等服务，商家应按要求与第三方支付机构或银行签署可能存在的相关协议。
            8.2.2“魅千金”提供以下多种可选择的结算方式供商家选择，具体结算方式以“魅千金平台”系统确认为准。“魅千金平台”系统在每个结算日（结算日遇休息日或法定节假日的，顺延至休息日或法定节假日结束后的第一个工作日）自动生成结算单，商家确认无误后，“魅千金”向付款机构发出付款指令，由付款机构将扣除技术服务费及其他费用后的货款支付给商家；
            1)“T+1”结算方式（“T”日为订单在“魅千金平台”系统中显示为“完成”状态的日期），在该种结算方式下，以“T”日后的第一个工作日为结算日；
            鉴于该种结算方式取决于与“魅千金”合作的第三方支付公司的持续稳定运作，商家同意提前向“魅千金”及第三方支付公司申请开通，经“魅千金”审核通过后，“魅千金”与商家按此结算；同时，商家同意“魅千金”有权单方随时停止该种结算方式的操作；
            2）月结：以每个自然月为结算期，每个月1日为结算日，结算上月1日至上月末最后一日产生的款项；
            3）半月结：以每半个月为结算期，每月16日与次月1日为结算日；
            4）其他：以协议方选择的天数作为结算周期，每个结算期满的次日为结算日。
            有关其他费用的开票事宜以相关法律法规等规范性文件及魅千金规则为准。
            8.2.3商家须向“魅千金”提供符合魅千金要求的结算账户以便“魅千金”完成货款结算，若商家账户信息变更，应提前3天通知“魅千金”，否则，因商家变更账户造成货款支付失败、迟延或错误，损失由商家自行承担。
            8.2.4“魅千金”与商家根据本协议开展的业务以人民币作为结算货币。
            九、保密义务
            除另有约定外，本合同任何一方均应对其获得的对方之业务、经营、财务状况和其他保密资料予以严格保密，不得以任何形式向任何第三方披露。否则，因此给其他方造成任何损失的，违约方应承担因此给守约方造成的全部损失。保密义务在合同有效期间及终止后始终有效，不因本合同其他条款整体或部分无效、被撤销而失效。
            十、合同终止和解除
            本合同期限届满或本合同约定的其他终止情形发生时，本合同终止。除合同另有约定外，合同履行过程中，一方经书面通知对方且经双方协商一致后，可解除本合同。本合同终止或解除后：
            10.1 魅千金有权删除平台上已发布的您信息，且有权拒绝提供相关信息；
            10.2 本合同终止前您已与用户达成的尚未履行完毕的订单，您应按照本合同、信息、及订单、平台规则等的约定继续履行相应义务；
            10.3 您同意魅千金保存您资质信息、商品信息、交易记录等相关资料。
            十一、免责条款
            因战争、自然灾害、政府行为、互联网系统故障、互联网通讯提供商故障等不可抗力因素或第三方原因导致魅千金不能履行本合同项下义务，魅千金无须承担责任。
            十二、法律适用及争议解决条款
            12.1 本协议的成立、有效性、解释、履行、签署、修订和终止以及争议的解决均应适用中华人民共和国法律。
            12.2 因本合同引起的或与本合同有关的任何争议，双方应协商解决。协商不成的，任何一方均可将争议提交至原告所在地法院。
            十三、附则
            13.1 与本合同有关的全部通知，双方可选择采用书面、邮件或商家中心操作任一种方式变更及确认。
            13.2 本合同正文不得涂改修订，如有未尽事宜，应另行签订书面补充合同。任何形式的口头协议均属无效。
            13.3 本合同附件是本合同不可分割的组成部分，与本合同具有同等法律效力。
            13.4 本合同由您确认后，于您的团购服务信息首次发布之日起生效，有效期1 年。
            13.5 合同到期后，在保留合同条款及相应约定情形下，经魅千金同意有效期自动顺延，每次顺延期为1 年。
          </p>
        </div>
        <div class="ruzhu_bottom">
          <div class="anniu1" @click="showxieyi = false">同意协议</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import request from "@/utils/request";
import { Flow, FlowState, FlowLine } from "vux";
import { DatetimePicker, Popup, Toast } from "vant";
const PERCENTAGE = 100 / 3;
export default {
  components: {
    Flow,
    FlowState,
    FlowLine
  },
  computed: {
    width() {
      return `${this.isdone * PERCENTAGE}%`;
    }
  },
  mounted() {
    $(".weui-wepay-flow__process").css("background", "#B694E8");
    // .weui-wepay-flow__li_done .weui-wepay-flow__state .weui-wepay-flow
    $(" .weui-wepay-flow__li_done").css("background", "#B694E8!important");
    $(".weui-wepay-flow").css("padding-top", "30px");
    this.showxieyi = true;
  },
  data() {
    return {
      isfirst_img: false,
      issecond_img: false,
      issecond_img2: false,
      isthird_img: false,
      first_img: "",
      second_img: "",
      second_img2: "",
      third_img: "",
      isdone: 0,
      tel: "",
      code: "",
      btntxt: "获取验证码",
      disabled: false,
      time: 0,
      tip: ["执照", "身份证", "电话", "完成"],
      ischang: true, //长期有效
      showold: false, //展示过去时间
      shownew: false, //展示到达时间
      showxieyi: false, //展示协议
      minDate: new Date(1950, 1, 1),
      oldcurrentDate: new Date(), //日期选择
      newcurrentDate: new Date(), //日期选择
      // 老时间
      oldyear: "1950",
      oldmonth: "1",
      olddate: "1",
      // 新时间
      newyear: "1951",
      newmonth: "1",
      newdate: "1",
      flag:'',
    };
  },
  mounted() {
    this.flag=window.localStorage.getItem("HaveSellerFlag")
    //  this.getuserinfo()window.localStorage.getItem("HaveSellerFlag").indexOf('ture') != -1
   if(this.flag == 'false'){
     this.isdone=0
   }else if(this.flag == 'true'){
     this.isdone=3
   }
    console.log('isdone'+this.isdone)
  },
  methods: {
    back(){
      console.log('我是子组件返回')
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        // on close
        console.log("我是要去安卓");
        // let url='http://test1.merrychange.net/#/articlestie?id='+this.articleid
        window.android.closePage();
        this.$router.back();
      }else{
        this.$router.back(-1)
      }
    },
    // getuserinfo() {
    //   request
    //     .post(this.$api + "/mobile/GetUserInfo")
    //     .then(res => {
    //       this.HaveSellerFlag = res.Data.HaveSellerFlag;
    //       if (this.HaveSellerFlag) {
    //         this.isdone = 3;
    //       } else {
    //         this.isdone = 0;
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    over() {
      Toast("步骤未完成~");
    },
    // 头像上传放法1
    handlerUpload1(event) {
      let file = event.target.files[0];
      console.log(file);
      // let arr = file.name.split(".");
      // let fileType = arr[arr.length - 1];
      let formData = new FormData();
      // let fileName = `${+new Date()}.${fileType}`;
      let fileName = file.name;
      formData.append("FileType", "ImageUser");
      formData.append("FileName", fileName);
      formData.append("file", file);
      let config = {
        headers: { "Content-Type": "multipart/form-data;" }
      };
      request
        .post(this.$api + "/AppFile/UploadAttachment", formData, config)
        .then(res => {
          if (res.IsSuccess) {
            console.log(res.Data);
            this.first_img = res.Data.Url;
            this.isfirst_img = true;
          } else {
            Toast(res.Message);
          }
        })
        .catch(err => {});
    },
    // 头像上传放法2
    handlerUpload2(event) {
      let file = event.target.files[0];
      console.log(file);
      // let arr = file.name.split(".");
      // let fileType = arr[arr.length - 1];
      let formData = new FormData();
      // let fileName = `${+new Date()}.${fileType}`;
      let fileName = file.name;
      formData.append("FileType", "ImageUser");
      formData.append("FileName", fileName);
      formData.append("file", file);
      let config = {
        headers: { "Content-Type": "multipart/form-data;" }
      };
      request
        .post(this.$api + "/AppFile/UploadAttachment", formData, config)
        .then(res => {
          if (res.IsSuccess) {
            console.log(res.Data);
            this.second_img = res.Data.Url;
            this.issecond_img = true;
            // this.userinfo.UserPhoto= = "http://test1.merrychange.net" + res.Data.Url;
            // let name = res.Data.Url;
            // var obj = name.lastIndexOf("/");
            // var str = name.substr(obj + 1);
            // console.log(str);
            // request
            //   .post(this.$api + "/mobile/SetUserPhoto", {
            //     PhotoUrl: str
            //   })
            //   .then(res => {
            //     if (res.IsSuccess) {
            //       Toast("设置成功");
            //     }
            //   })
            //   .catch(err => {});
          } else {
            Toast(res.Message);
          }
        })
        .catch(err => {});
    },
    // 头像上传放法1
    handlerUpload3(event) {
      let file = event.target.files[0];
      console.log(file);
      // let arr = file.name.split(".");
      // let fileType = arr[arr.length - 1];
      let formData = new FormData();
      // let fileName = `${+new Date()}.${fileType}`;
      let fileName = file.name;
      formData.append("FileType", "ImageUser");
      formData.append("FileName", fileName);
      formData.append("file", file);
      let config = {
        headers: { "Content-Type": "multipart/form-data;" }
      };
      request
        .post(this.$api + "/AppFile/UploadAttachment", formData, config)
        .then(res => {
          if (res.IsSuccess) {
            console.log(res.Data);
            this.second_img2 = res.Data.Url;
            this.issecond_img2 = true;
            // this.userinfo.UserPhoto= = "http://test1.merrychange.net" + res.Data.Url;
            // let name = res.Data.Url;
            // var obj = name.lastIndexOf("/");
            // var str = name.substr(obj + 1);
            // console.log(str);
            // request
            //   .post(this.$api + "/mobile/SetUserPhoto", {
            //     PhotoUrl: str
            //   })
            //   .then(res => {
            //     if (res.IsSuccess) {
            //       Toast("设置成功");
            //     }
            //   })
            //   .catch(err => {});
          } else {
            Toast(res.Message);
          }
        })
        .catch(err => {});
    },
    handlerUpload4(event) {
      let file = event.target.files[0];
      console.log(file);
      // let arr = file.name.split(".");
      // let fileType = arr[arr.length - 1];
      let formData = new FormData();
      // let fileName = `${+new Date()}.${fileType}`;
      let fileName = file.name;
      formData.append("FileType", "ImageUser");
      formData.append("FileName", fileName);
      formData.append("file", file);
      let config = {
        headers: { "Content-Type": "multipart/form-data;" }
      };
      request
        .post(this.$api + "/AppFile/UploadAttachment", formData, config)
        .then(res => {
          if (res.IsSuccess) {
            console.log(res.Data);
            this.third_img = res.Data.Url;
            this.isthird_img = true;
            // this.userinfo.UserPhoto= = "http://test1.merrychange.net" + res.Data.Url;
            // let name = res.Data.Url;
            // var obj = name.lastIndexOf("/");
            // var str = name.substr(obj + 1);
            // console.log(str);
            // request
            //   .post(this.$api + "/mobile/SetUserPhoto", {
            //     PhotoUrl: str
            //   })
            //   .then(res => {
            //     if (res.IsSuccess) {
            //       Toast("设置成功");
            //     }
            //   })
            //   .catch(err => {});
          } else {
            Toast(res.Message);
          }
        })
        .catch(err => {});
    },
    getcode() {
      var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (this.tel == "") {
        Toast("手机号不能为空");
      } else if (!reg.test(this.tel)) {
        Toast("手机号格式不正确");
      } else {
        this.axios
          .post(this.$api + "/mobile/SendMsg", {
            MobileNo: this.tel
          })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
        this.time = 60;
        this.disabled = true;
        //验证码的时间设置 可有可无
        this.timer();
        //手机号争取后调取接口
      }
    },
    timer() {
      if (this.time > 0) {
        this.time--;
        this.btntxt = this.time + "s后获取";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.btntxt = "重新获取";
        this.disabled = false;
      }
    },
    sel_chang() {
      this.ischang = true;
    },
    sel_duan() {
      this.ischang = false;
    },
    // 展示过去时间
    show_oldtime() {
      this.showold = true;
    },
    // 展示时间
    show_newtime() {
      this.shownew = true;
    },
    // 老时间确认
    oldconfirm() {
      console.log(this.oldcurrentDate);
      let dateTime = this.oldcurrentDate;
      this.oldyear = dateTime.getFullYear();
      this.oldmonth = dateTime.getMonth() + 1;
      this.olddate = dateTime.getDate();
      this.showold = false;
    },
    //新时间确认
    newconfirm() {
      let dateTime = this.newcurrentDate;
      this.newyear = dateTime.getFullYear();
      this.newmonth = dateTime.getMonth() + 1;
      this.newdate = dateTime.getDate();
      this.shownew = false;
    },
    oldcancel() {
      this.showold = false;
    },
    newcancel() {
      this.shownew = false;
    },
    postSeller() {
      let path1 = this.first_img;
      let path2 = this.second_img;
      let path3 = this.second_img2;
      let path4 = this.third_img;
      var data = {
        Mobile: this.tel,
        SmgCode: this.code,
        LongStanding: this.ischang,
        StartTime:
          this.oldyear + "年" + this.oldmonth + "月" + this.olddate + "日",
        EndTime:
          this.newyear + "年" + this.newmonth + "月" + this.newdate + "日",
        BusinessLicenceImg: path1.substring(
          path1.lastIndexOf("/") + 1,
          path1.length
        ),
        IdCardImgFront: path2.substring(
          path2.lastIndexOf("/") + 1,
          path2.length
        ),
        IdCardImgBack: path3.substring(
          path3.lastIndexOf("/") + 1,
          path3.length
        ),
        BrandAuthorization: path4.substring(
          path3.lastIndexOf("/") + 1,
          path4.length
        )
      };
      console.log(data);
      request
        .post(this.$api + "/mobile/SellerAdd", data)
        .then(res => {
          if (res.IsSuccess) {
            this.isdone = 3;
          } else {
            Toast(res.Message);
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped lang='less'>
.van-popup--center {
  border-radius: 15 / @base;
}
@base: 75rem;
header {
  width: 100%;
  position: relative;
  // z-index: 10;
  i {
    position: fixed;
    left: 30 / @base;
    top: 25 / @base;
    font-size: 50 / @base;
    color: white;
    z-index: 11;
  }
  .head {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100 / @base;
    background: linear-gradient(to right, #dac2ff, #c39cfa);
    font-size: 35 / @base;
    text-align: center;
    line-height: 100 / @base;
    border-bottom: 1px solid #e6e6e6;
    color: white;
  }
}
.bu {
  width: 100%;
  height: 100 / @base;
}
.title {
  width: 100%;
  height: 90 / @base;
  text-align: center;
  line-height: 90 / @base;
  font-size: 28 / @base;
}
.ruzhu {
  position: relative;
  width: 500 / @base;
  height: 650 / @base;
  background: #fff;
  border-radius: 15 / @base;
  .ruzhu_title {
    width: 100%;
    height: 80 / @base;
    line-height: 80 / @base;
    font-size: 35 / @base;
    font-weight: bold;
    text-align: center;
  }
  .ruzhu_box {
    width: 100%;
    height: 450 / @base;
    padding: 0 20 / @base;
    //  background:red;
    overflow: scroll;
    p {
      font-size: 25 / @base;
      color: #6b6b6b;
    }
  }
  .ruzhu_bottom {
    width: 100%;
    height: 100 / @base;
    background: #fff;
    position: absolute;
    bottom: 0;
    .anniu1 {
      width: 50%;
      height: 70 / @base;
      background: #b695e9;
      color: white;
      font-size: 28 / @base;
      text-align: center;
      line-height: 70 / @base;
      margin: 10 / @base auto;
      border-radius: 20px;
    }
  }
}
.level {
  position: relative;
  padding: 0 40 / @base;
  margin-top: 40 / @base;
  z-index: 99;
  font-size: 0;
  .pic {
    position: relative;
    ul {
      display: flex;
      justify-content: space-between;
      li {
        text-align: center;
        span {
          font-size: 20 / @base;
          color: #333;
        }
        .img {
          width: 35 / @base;
          height: 35 / @base;
          margin: 0 auto;
          margin-bottom: 5 / @base;
          background: #d2d2d2;
          border-radius: 50%;
          filter: grayscale(100%);
          &.active {
            filter: grayscale(0%);
            background: #c39cfa;
          }
        }
      }
    }
    .line {
      position: absolute;
      top: 30%;
      left: 24 / @base;
      transform: translateY(-50%);
      width: 620 / @base;
      height: 2 / @base;
      background-color: #d2d2d2;
      z-index: -1;
      .activeline {
        position: absolute;
        left: 0;
        top: 0;
        height: 2 / @base;
        background-color: #c39dfa;
      }
    }
  }
}
// 盒子
.box {
  width: 100%;
  margin-top: 25 / @base;
  padding-left: 77 / @base;
  .bottom1 {
    position: fixed;
    bottom: 82 / @base;
    width: 600 / @base;
    height: 80 / @base;
    line-height: 80 / @base;
    border-radius: 40 / @base;
    background-color: #c39cfa;
    font-size: 30 / @base;
    font-stretch: normal;
    color: #fff;
    text-align: center;
    font-weight: bold;
  }
  .bottom2 {
    position: fixed;
    bottom: 82 / @base;
    width: 600 / @base;
    height: 80 / @base;
    line-height: 80 / @base;
    border-radius: 40 / @base;
    background-color: #656565;
    font-size: 30 / @base;
    font-stretch: normal;
    color: #fff;
    text-align: center;
    font-weight: bold;
  }
  .box_item {
    width: 521 / @base;
    height: 365 / @base;
    .box_title {
      width: 377 / @base;
      // height: 60/@base;
      // background: #c39cfa;
      font-size: 30 / @base;
      font-weight: bold;
    }
    .box_daimg {
      position: relative;
      width: 500 / @base;
      height: 300 / @base;
      margin-bottom: 60 / @base;
      span {
        position: absolute;
        bottom: 22 / @base;
        left: 126 / @base;
        font-size: 23 / @base;
        color: #6b6b6b;
      }
      input {
        opacity: 0;
        position: absolute;

        width: 500 / @base;
        height: 300 / @base;
        background-size: 100% 100%;
        border-radius: 15 / @base;
      }
      .box_img {
        width: 500 / @base;
        height: 300 / @base;
        background-size: 100% 100%;
        margin-top: 35 / @base;
        border-radius: 15 / @base;
      }
    }
    .xuan_time {
      display: flex;
      width: 100%;
      height: 40 / @base;
      margin-top: 29 / @base;
      img {
        width: 30 / @base;
        height: 30 / @base;
        margin-top: 5 / @base;
        background-size: 100% 100%;
      }
      div {
        font-size: 28 / @base;
        color: #333333;
        margin-left: 6 / @base;
      }
    }
    .zhen_time {
      display: flex;
      width: 400 / @base;
      height: 41 / @base;
      // background:red;
      margin-left: 31 / @base;
      margin-top: 20 / @base;
      font-size:26/ @base;
      color: #333333;
      font-stretch: normal;
      font-weight: bold;
      .biao {
        width: 81 / @base;
        height: 35 / @base;
        border-radius: 5 / @base;
        border: 1px solid #d2d2d2;
        margin: 0 10 / @base;
        text-align: center;
        color: #656565;
      }
    }
  }
}
// 第二
.box2 {
  width: 100%;
  height: 730 / @base;
  overflow: scroll;
  padding-left: 77 / @base;
  padding-bottom: 100 / @base;
  margin-top: 25 / @base;

  .bottom1 {
    position: fixed;
    bottom: 82 / @base;
    width: 600 / @base;
    height: 80 / @base;
    line-height: 80 / @base;
    border-radius: 40 / @base;
    background-color: #c39cfa;
    font-size: 30 / @base;
    font-stretch: normal;
    color: #fff;
    text-align: center;
    font-weight: bold;
  }
  .bottom2 {
    position: fixed;
    bottom: 82 / @base;
    width: 600 / @base;
    height: 80 / @base;
    line-height: 80 / @base;
    border-radius: 40 / @base;
    background-color: #656565;
    font-size: 30 / @base;
    font-stretch: normal;
    color: #fff;
    text-align: center;
    font-weight: bold;
  }
  .box_item {
    width: 521 / @base;
    height: 365 / @base;
    .box_title {
      width: 377 / @base;
      // height: 60/@base;
      // background: #c39cfa;
      font-size: 30 / @base;
      font-weight: bold;
    }
    .box_daimg {
      position: relative;
      width: 500 / @base;
      height: 300 / @base;
      margin-bottom: 60 / @base;
      span {
        position: absolute;
        bottom: 22 / @base;
        left: 126 / @base;
        font-size: 23 / @base;
        color: #6b6b6b;
      }
      input {
        opacity: 0;
        position: absolute;

        width: 500 / @base;
        height: 300 / @base;
        background-size: 100% 100%;
        border-radius: 15 / @base;
      }
      .box_img {
        width: 500 / @base;
        height: 300 / @base;
        background-size: 100% 100%;
        margin-top: 35 / @base;
        border-radius: 15 / @base;
      }
    }
  }
}
// 第三
.box3 {
  width: 100%;
  // height: 730 / @base;
  // overflow: scroll;
  padding-left: 77 / @base;
  padding-bottom: 100 / @base;
  .bottom1 {
    // position: fixed;
    // bottom: 82 / @base;
    width: 600 / @base;
    height: 80 / @base;
    line-height: 80 / @base;
    border-radius: 40 / @base;
    background-color: #c39cfa;
    font-size: 30 / @base;
    font-stretch: normal;
    color: #fff;
    text-align: center;
    font-weight: bold;
  }
  .bottom2 {
    // position: fixed;
    // bottom: 82 / @base;
    width: 600 / @base;
    height: 80 / @base;
    line-height: 80 / @base;
    border-radius: 40 / @base;
    background-color: #656565;
    font-size: 30 / @base;
    font-stretch: normal;
    color: #fff;
    text-align: center;
    font-weight: bold;
  }
  .box_item {
    width: 521 / @base;
    // height: 365 / @base;
    .box_title {
      margin-top: 60 / @base;
      // width: 377 / @base;
      // height: 60/@base;
      // background: #c39cfa;
      font-size: 30 / @base;
      font-weight: bold;
      a {
        color: #c39cfa !important;
        text-decoration: underline;
      }
    }
    .box_daimg {
      position: relative;
      width: 500 / @base;
      height: 300 / @base;
      margin-bottom: 60 / @base;
      span {
        position: absolute;
        bottom: 22 / @base;
        left: 150 / @base;
        font-size: 23 / @base;
        color: #6b6b6b;
      }
      input {
        opacity: 0;
        position: absolute;

        width: 500 / @base;
        height: 300 / @base;
        background-size: 100% 100%;
        border-radius: 15 / @base;
      }
      .box_img {
        width: 500 / @base;
        height: 300 / @base;
        background-size: 100% 100%;
        margin-top: 35 / @base;
        border-radius: 15 / @base;
      }
    }
    .box_phone {
      display: flex;
      width: 600 / @base;
      height: 80 / @base;
      margin-top: 50 / @base;
      border-bottom: 1px solid #e6e6e6;
      .box_phone_left {
        width: 70 / @base;
        height: 60 / @base;
        border-right: 1px solid #e6e6e6;
        img {
          width: 35 / @base;
          height: 50 / @base;
          background-size: 100% 100%;
        }
      }
      .box_phone_middle {
        display: flex;
        width: 260 / @base;
        height: 40 / @base;
        input {
          display: block;
          margin-top: 10 / @base;
          margin-left: 75 / @base;
          width: 260 / @base;
          height: 40 / @base;
          background: #fff;
          font-size: 28 / @base;
        }
      }
      .box_phone_right {
        margin-left: 78 / @base;
        width: 30%;
        height: 60 / @base;
        line-height: 60 / @base;
        // border-left: 1px solid #e6e6e6;
        background: #fff;
        color: #c39cfa;
        text-align: center;
        font-size: 26 / @base;
        border: 1px solid transparent; //自定义边框
        outline: none; //消除默认点击蓝色边框效果
      }
    }
  }
}
// 第四
.box4 {
  width: 579 / @base;
  height: 200 / @base;
  margin: 150 / @base auto;
  .bottom1 {
    position: fixed;
    bottom: 82 / @base;
    width: 600 / @base;
    height: 80 / @base;
    line-height: 80 / @base;
    border-radius: 40 / @base;
    background-color: #c39cfa;
    font-size: 30 / @base;
    font-stretch: normal;
    color: #fff;
    text-align: center;
    font-weight: bold;
  }
  .bottom2 {
    position: fixed;
    bottom: 82 / @base;
    width: 600 / @base;
    height: 80 / @base;
    line-height: 80 / @base;
    border-radius: 40 / @base;
    background-color: #656565;
    font-size: 30 / @base;
    font-stretch: normal;
    color: #fff;
    text-align: center;
    font-weight: bold;
  }
  p {
    font-size: 30 / @base;
    color: #656565;
    text-align: center;
    margin-top: 40 / @base;
  }
  .over_top {
    display: flex;
    justify-content: center;
    font-size: 35 / @base;
    font-weight: bold;
    img {
      width: 40 / @base;
      height: 40 / @base;
      margin-right: 15 / @base;
      background-size: 100% 100%;
    }
  }
}
//过去时间弹框css
.oldtime {
  width: 600 / @base;
  height: 400 / @base;
  background: #fff;
  border-radius: 15 / @base;
  // .oldtime_title {
  //   display: flex;
  //   width: 100%;
  //   height: 80 / @base;
  //   background: #b695e9;
  //   .oldtime_titleson {
  //     width: 33%;
  //     // height: 80 / @base;
  //     line-height: 80 / @base;
  //     text-align: center;
  //     font-size: 32 / @base;
  //     color: #ffffff;
  //   }
  // }
  .oldtime_main {
    width: 100%;
    height: 204 / @base;
    padding: 0 40 / @base;
  }
}
</style>