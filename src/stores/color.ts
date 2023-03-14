import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useColorStore = defineStore('color', () => {
    const darkTheme = {
      light: '#232323',
      normal: '#090909',
      dark: '#000000',
      font: '#fff',
      fontOpposite: '#000',
      transparentLight: '#232323cc',
      transparentFont33: '#fff3',
      transparentFont99: '#fff9',
      transparentFontcc: '#fffc',
      link: '#9fa8ff'
    }
    const lightTheme = {
      light: '#ffffff',
      normal: '#f0f0f7',
      dark: '#e0e0e9',
      font: '#000',
      fontOpposite: '#fff',
      transparentLight: '#ffffffcc',
      transparentFont33: '#0003',
      transparentFont99: '#0009',
      transparentFontcc: '#000c',
      link: '#3344dd'
    }

    const isDark = ref(true)
    const color = computed(() => isDark.value ? darkTheme : lightTheme)
    function change() {
        isDark.value = !isDark.value
    }
  
    return { change, color, isDark }
})