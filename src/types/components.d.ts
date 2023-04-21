import Cp5NavBar from '@/components/Cp5NavBar.vue'
import Cp5SvgIcon from '@/components/Cp5SvgIcon.vue'
import Cp5RadioBtn from '@/components/Cp5RadioBtn.vue'
declare module 'vue' {
  interface GlobalComponents {
    Cp5NavBar: typeof Cp5NavBar
    Cp5SvgIcon: typeof Cp5SvgIcon
    Cp5RadioBtn: typeof Cp5RadioBtn
  }
}
