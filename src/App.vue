<template>
  <div 
    class="min-h-screen max-w-md mx-auto relative pb-24 font-sans shadow-2xl overflow-hidden transition-colors duration-500"
    :class="darkMode ? 'bg-gradient-to-br from-[#1c2742] to-[#111828]' : 'bg-slate-50'"
  >
    
    <div class="absolute top-6 right-6 z-50">
      <button 
        @click="toggleDarkMode"
        class="p-2.5 rounded-full backdrop-blur-md shadow-lg transition-all duration-300"
        :style="{
          background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255, 255, 255, 0.8)',
          color: darkMode ? '#fbbf24' : '#2a4a6f',
          border: `1px solid ${darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(42,74,111,0.1)'}`
        }"
      >
        <Sun v-if="darkMode" class="w-5 h-5" />
        <Moon v-else class="w-5 h-5" />
      </button>
    </div>

    <router-view />

    <nav 
      class="fixed bottom-0 left-0 w-full max-w-md mx-auto left-1/2 -translate-x-1/2 backdrop-blur-xl rounded-t-3xl border-t px-2 py-3 flex justify-between items-center z-50 transition-all duration-500"
      :style="{
        background: darkMode ? 'rgba(28, 39, 66, 0.85)' : 'rgba(255, 255, 255, 0.9)',
        borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(42, 74, 111, 0.1)'
      }"
    >
      <div v-for="menu in menus" :key="menu.name" class="flex-1 flex justify-center">
        <router-link 
          :to="menu.path"
          v-slot="{ isActive }"
          class="flex flex-col items-center gap-1 w-full"
        >
          <div 
            class="p-2 rounded-xl transition-all duration-300 flex items-center justify-center"
            :class="isActive ? 'scale-110 shadow-sm' : 'scale-100 hover:scale-105'"
            :style="{
              background: isActive 
                ? (darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(96, 165, 250, 0.2)') 
                : 'transparent',
              border: isActive 
                ? `1px solid ${darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(96, 165, 250, 0.3)'}` 
                : '1px solid transparent'
            }"
          >
            <component 
              :is="menu.icon" 
              class="w-5 h-5 transition-colors duration-300"
              :style="{ 
                color: isActive 
                  ? (darkMode ? 'white' : '#2a4a6f') 
                  : (darkMode ? 'rgba(255,255,255,0.4)' : 'rgba(42,74,111,0.4)')
              }"
            />
          </div>
          <span 
            class="text-[10px] font-medium transition-colors"
            :style="{ 
              color: isActive 
                ? (darkMode ? 'white' : '#2a4a6f') 
                : (darkMode ? 'rgba(255,255,255,0.4)' : 'rgba(42,74,111,0.4)')
            }"
          >
            {{ menu.name }}
          </span>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import { 
  Sun, Moon, 
  CalendarDays,
  FileBarChart,
  ScrollText,
  ClipboardCheck,
  Medal,
  FileEdit
} from 'lucide-vue-next'

const darkMode = ref(true)

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
}

provide('darkMode', darkMode)

const menus = [
  { name: 'Jadwal', path: '/jadwal', icon: CalendarDays },
  { name: 'Nilai', path: '/nilai', icon: FileBarChart },
  { name: 'Transkrip', path: '/transkrip', icon: ScrollText },
  { name: 'Absen', path: '/kehadiran', icon: ClipboardCheck },
  { name: 'SKKK', path: '/skkk', icon: Medal },
  { name: 'PRS', path: '/prs', icon: FileEdit },
]
</script>

<style>
body {
  margin: 0;
  background-color: #0f172a;
}
</style>