<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  getPatientListAPI,
  addPatientAPI,
  editPatientAPI,
  delPatientAPI
} from '@/services/patientAPI'
import type { PatientList, PatientInfo } from '@/types/paitent'
import { computed } from 'vue'
import { validateName, validateIdCard } from '@/utils/validate'
import { showToast, type FormInstance, showSuccessToast, showConfirmDialog } from 'vant'

// 单选框CP5radiobtn数据
const options = [
  { label: '男', value: 1 },
  { label: '女', value: 0 }
]
//获取患者列表数据
const patientList = ref<PatientList>([])
onMounted(async () => {
  const res = await getPatientListAPI()
  patientList.value = res.data || []
  // console.log(patientList.value)
})
//打开弹出层
const openPopup = ref(false)
//添加患者信息
const showEditPopup = () => {
  openPopup.value = true
  isChange.value = false
  editPaitent.value = { name: '', idCard: '', gender: 1, defaultFlag: 0 }
}
//编辑患者信息表单数据
const editPaitent = ref<PatientInfo>({ name: '', idCard: '', gender: 1, defaultFlag: 0 })
const defaultFlag = computed({
  get() {
    return editPaitent.value.defaultFlag === 0 ? false : true
  },
  set(value) {
    // value是defaultFlag的新值
    editPaitent.value.defaultFlag = value ? 1 : 0
  }
})
//保存数据
//保存时校验表单数据
const infoForm = ref<FormInstance>()
const saveFn = async () => {
  if (!infoForm.value?.validate()) return

  //性别检验， 身份证倒数第二位，单数是男，双数是女
  const idGenderNum = +editPaitent.value.idCard.slice(-2, -1) % 2
  if (idGenderNum === editPaitent.value.gender) {
    // 调用接口，保存数据
    isChange.value
      ? await editPatientAPI(editPaitent.value)
      : await addPatientAPI(editPaitent.value)

    // console.log(res)
    showToast({ message: '添加成功', type: 'success' })
  } else {
    showToast({ message: '性别和身份证上不一致，请修改', type: 'fail' })
  }
}

//修改patient
const isChange = ref(false)
const changePatientFn = (value: PatientInfo) => {
  openPopup.value = true
  isChange.value = true
  const { id, name, idCard, gender, defaultFlag } = value
  editPaitent.value = { id, name, idCard, gender, defaultFlag }
  console.log(editPaitent.value)
}

// 删除信息
const removeFn = async () => {
  if (editPaitent.value.id) {
    await showConfirmDialog({
      title: '温馨提示',
      message: `您确认要删除 ${editPaitent.value.name} 患者信息吗 ？`
    })
    await delPatientAPI(editPaitent.value.id)
    showSuccessToast('删除成功')
    openPopup.value = false
  }
}
</script>

<template>
  <div class="patient-page">
    <cp5-nav-bar title="家庭档案"></cp5-nav-bar>
    <div class="patient-wrapper">
      <div class="patient-item" v-for="item in patientList" :key="item.id">
        <div class="item-left">
          <div class="item-top">
            <span class="patient-name">{{ item.name }}</span>
            <span class="patient-id">{{
              item.idCard.replace(/^(.{6}).+(.{4})$/, '\$1********\$2')
            }}</span>
            <span class="patient-defalut" v-if="item.defaultFlag">默认</span>
          </div>
          <div class="item-bottom">
            <span class="patient-sex">{{ item.gender ? '男' : '女' }}</span>
            <span class="patient-age">{{ item.age }} 岁</span>
          </div>
        </div>
        <div class="item-right" @click="changePatientFn(item)">
          <cp5-svg-icon name="edit" dir="user"></cp5-svg-icon>
        </div>
      </div>
      <div class="patient-add" v-if="patientList.length < 6" @click="showEditPopup">
        <div class="add-icon">
          <cp5-svg-icon name="add" dir="user"></cp5-svg-icon>
        </div>
        <span class="add-user">添加患者</span>
      </div>
      <div class="patient-tip">最多可添加 6 人</div>
    </div>

    <!-- 添加修改患者信息popup弹出层 -->
    <van-popup v-model:show="openPopup" :style="{ width: '100%', height: '100%' }" position="right">
      <cp5-nav-bar
        :title="isChange ? '修改患者信息' : '添加患者信息'"
        right-text="保存"
        :openPopup="openPopup"
        @click-right="saveFn"
        @close-popup="openPopup = false"
      />
      <van-form class="popup-form" ref="infoForm">
        <van-cell-group inset>
          <van-field
            name="姓名"
            label="真实姓名"
            placeholder="请输入真实姓名"
            v-model="editPaitent.name"
            :rules="validateName"
          />
          <van-field
            name="身份证号"
            label="身份证号"
            placeholder="请输入身份证号"
            v-model="editPaitent.idCard"
            :rules="validateIdCard"
          />
          <van-field label="性别">
            <template #input>
              <cp5-radio-btn :options="options" v-model="editPaitent.gender" />
              <!-- v-model语法糖等价于 -->
              <!-- :model-value="defaultGender" -->
              <!-- @update:model-value="defaultGender = $event" -->
            </template>
          </van-field>
          <van-field label="默认就诊人">
            <template #input>
              <van-checkbox :icon-size="18" v-model="defaultFlag" />
            </template>
          </van-field>
        </van-cell-group>
      </van-form>
      <van-action-bar v-if="isChange">
        <van-action-bar-button @click="removeFn">删除</van-action-bar-button>
      </van-action-bar>
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
.patient-wrapper {
  margin-top: 46px;
  padding: 15px;
  .patient-item {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    margin-bottom: 15px;
    background-color: var(--cp-bg);
    border-radius: 8px;
    .item-left {
      .item-top {
        display: flex;
        position: relative;
        // justify-content: space-between;
        .patient-name {
          width: 80px;
          font-size: 16px;
          font-weight: bold;
          line-height: 30px;
          color: var(--cp-text1);
        }
        .patient-id {
          line-height: 30px;
          font-size: 14px;
          color: var(--cp-text2);
        }
        .patient-defalut {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 8px;
          right: -60px;
          width: 30px;
          height: 16px;
          background-color: var(--cp-primary);
          font-size: 13px;
          color: #fff;
        }
      }
      .item-bottom {
        .patient-sex {
          margin-right: 20px;
          line-height: 30px;
          color: var(--cp-tip);
        }
        .patient-age {
          line-height: 30px;
          color: var(--cp-tip);
        }
      }
    }
    .item-right {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: var(--cp-tag);
    }
  }
  .patient-add {
    height: 77px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    box-sizing: border-box;
    background-color: var(--cp-bg);
    border-radius: 8px;
    color: var(--cp-primary);
    .add-icon {
      font-size: 24px;
    }
  }
  .patient-tip {
    color: var(--cp-tag);
    padding: 12px 0;
  }
}

:deep() {
  .van-popup--center {
    max-width: 100%;
  }
}
.popup-form {
  padding-top: 46px;
}
// 底部操作栏
.van-action-bar {
  padding: 0 10px;
  margin-bottom: 10px;
  .van-button {
    color: var(--cp-price);
    background-color: var(--cp-bg);
  }
}
</style>
