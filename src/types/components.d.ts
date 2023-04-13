import Cp5NavBar from '@/components/Cp5NavBar.vue'

declare module 'vue' {
  interface GlobalComponents {
    Cp5NavBar: typeof Cp5NavBar
  }
}
