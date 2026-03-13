<template>
  <div class="rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
       :style="{
         background: darkMode ? 'linear-gradient(135deg, rgba(55, 129, 173, 0.2) 0%, rgba(55, 129, 173, 0.1) 100%)' : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 100%)',
         backdropFilter: 'blur(40px)',
         border: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(55, 129, 173, 0.15)',
         boxShadow: darkMode ? '0 12px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' : '0 12px 40px rgba(30, 50, 88, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
       }">
    <div class="flex">
      <div class="w-24 flex flex-col items-center justify-center p-4"
           :style="{
             background: darkMode ? `linear-gradient(135deg, ${item.color}30, ${item.color}20)` : `linear-gradient(135deg, ${item.color}20, ${item.color}10)`,
             borderRight: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(55, 129, 173, 0.15)'}`
           }">
        <Clock class="h-5 w-5 mb-2" :style="{ color: item.color }" />
        <span class="text-lg font-semibold" :style="{ color: item.color }">{{ item.time }}</span>
        <span class="text-xs mt-1 text-center" :style="{ color: item.color, opacity: 0.7 }">{{ item.duration }}</span>
      </div>

      <div class="flex-1 p-5 text-left">
        <h4 class="font-semibold mb-2" :style="{ color: darkMode ? 'white' : '#1E3258' }">
          {{ item.course }}
        </h4>
        
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm"
               :style="{ background: darkMode ? 'rgba(55, 129, 173, 0.2)' : 'rgba(255, 255, 255, 0.8)' }">
            {{ item.avatar }}
          </div>
          <span class="text-sm" :style="{ color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(30, 50, 88, 0.8)' }">
            {{ item.instructor }}
          </span>
        </div>

        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm"
             :style="{
               background: darkMode ? 'rgba(55, 129, 173, 0.15)' : 'rgba(255, 255, 255, 0.7)',
               border: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(55, 129, 173, 0.15)'
             }">
          <MapPin class="w-3.5 h-3.5" :style="{ color: darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(30,50,88,0.7)' }" />
          <span :style="{ color: darkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(30, 50, 88, 0.7)' }">
            {{ item.room }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Clock, MapPin } from 'lucide-vue-next'
defineProps({
  item: Object,
  darkMode: Boolean
})
</script>