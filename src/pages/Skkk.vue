<template>
  <div class="px-6 pb-6 pt-12 w-full">
    
    <div class="flex items-center gap-4 mb-6">
      <button
        @click="router.back()"
        class="p-2 rounded-2xl transition-all active:scale-95"
        :style="{
          background: darkMode ? 'rgba(55, 129, 173, 0.15)' : 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(55, 129, 173, 0.2)',
          boxShadow: darkMode
            ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            : '0 8px 32px rgba(30, 50, 88, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        }"
      >
        <ChevronLeft :style="{ color: darkMode ? 'white' : '#1E3258' }" />
      </button>
      <p
        class="text-2xl font-semibold transition-colors duration-300"
        :style="{ color: darkMode ? 'white' : '#1E3258' }"
      >
        SKKK Credits
      </p>
    </div>

    <div class="flex justify-center mb-6">
      <div
        class="rounded-3xl px-6 py-5 transition-all duration-500 w-fit min-w-[260px]"
        :style="{
          background: darkMode
            ? 'linear-gradient(135deg, rgba(55, 129, 173, 0.25) 0%, rgba(55, 129, 173, 0.15) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.7) 100%)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          border: darkMode
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(55, 129, 173, 0.2)',
          boxShadow: darkMode
            ? '0 20px 60px rgba(0, 0, 0, 0.4)'
            : '0 20px 60px rgba(30, 50, 88, 0.15)',
        }"
      >
        <div class="flex items-center gap-8">
          <div class="flex flex-col items-center">
            <p
              class="text-sm mb-1"
              :style="{ color: darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(30,50,88,0.7)' }"
            >
              Total Points
            </p>
            <p
              class="text-3xl font-bold"
              :style="{ color: darkMode ? 'white' : '#1E3258' }"
            >
              {{ totalAccumulatedPoints }}
            </p>
          </div>

          <div
            class="w-px h-14"
            :style="{ background: darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(30,50,88,0.15)' }"
          ></div>

          <div class="flex flex-col items-center">
            <p
              class="text-sm mb-1"
              :style="{ color: darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(30,50,88,0.7)' }"
            >
              Activities
            </p>
            <p
              class="text-3xl font-bold"
              :style="{ color: darkMode ? 'white' : '#1E3258' }"
            >
              {{ totalActivitiesDone }}
            </p>
          </div>

        </div>
      </div>
    </div>

    <h3
      class="text-lg font-semibold mb-4 text-left transition-colors duration-300"
      :style="{ color: darkMode ? 'white' : '#1E3258' }"
    >
      Categories
    </h3>

    <div class="space-y-3 mb-24">
      <div
        v-for="cat in categoriesWithPoints"
        :key="cat.id"
        class="rounded-3xl overflow-hidden transition-all duration-300"
        :style="{
          background: darkMode
            ? 'linear-gradient(135deg, rgba(55, 129, 173, 0.2) 0%, rgba(55, 129, 173, 0.1) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 100%)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          border: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(55, 129, 173, 0.15)',
          boxShadow: darkMode
            ? '0 12px 40px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 8px rgba(0, 0, 0, 0.15)'
            : '0 12px 40px rgba(30, 50, 88, 0.1), 0 4px 12px rgba(55, 129, 173, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 8px rgba(55, 129, 173, 0.08)',
        }"
      >
        <div 
          @click="toggleCategory(cat.id)"
          class="p-5 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform"
        >
          <div class="flex items-center gap-4 text-left flex-1">
            
            <div
              class="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              :style="{
                background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(55, 129, 173, 0.1)',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(55, 129, 173, 0.1)',
              }"
            >
              <component 
                :is="getIconComponent(cat.icon)" 
                class="w-6 h-6"
                :style="{ color: darkMode ? '#60a5fa' : '#3781AD' }"
              />
            </div>

            <div class="flex-1">
              <h4 class="font-semibold" :style="{ color: darkMode ? 'white' : '#1E3258' }">
                {{ cat.name }}
              </h4>
              <p class="text-xs mt-1"
                :style="{ color: darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(30, 50, 88, 0.6)' }">
                {{ cat.currentPoints }} / Min {{ cat.minPoints }} Points
              </p>
            </div>
          </div>

          <div class="flex items-center gap-4 ml-4">
            <div
              class="w-8 h-8 flex items-center justify-center rounded-xl"
              :style="{
                background: cat.currentPoints >= cat.minPoints
                  ? 'rgba(34,197,94,0.15)'
                  : 'rgba(239,68,68,0.15)'
              }"
            >
              <CheckCircle
                v-if="cat.currentPoints >= cat.minPoints"
                class="w-5 h-5"
                style="color:#22c55e"
              />
              <XCircle
                v-else
                class="w-5 h-5"
                style="color:#ef4444"
              />
            </div>

            <ChevronDown 
              class="w-5 h-5 transition-transform duration-300"
              :class="{ 'rotate-180': expandedCategory === cat.id }"
              :style="{ color: darkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(30, 50, 88, 0.4)' }"
            />
          </div>
        </div>

        <transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="max-h-0 opacity-0"
          enter-to-class="max-h-[500px] opacity-100"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="max-h-[500px] opacity-100"
          leave-to-class="max-h-0 opacity-0"
        >
          <div v-if="expandedCategory === cat.id" class="px-5 pb-5">
            <div 
              class="pt-4 space-y-2 border-t"
              :style="{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(30,50,88,0.1)' }"
            >
              <div 
                v-for="act in cat.activities" 
                :key="act.id"
                class="flex items-center justify-between p-3 rounded-2xl"
                :style="{ background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }"
              >
                <div class="text-left">
                  <p class="text-sm font-medium" :style="{ color: darkMode ? 'white' : '#1E3258' }">
                    {{ act.name }}
                  </p>
                  <p class="text-[10px] uppercase tracking-wider opacity-50" :style="{ color: darkMode ? 'white' : '#1E3258' }">
                    {{ act.date }}
                  </p>
                </div>
                <div 
                  class="px-3 py-1 rounded-xl text-xs font-bold"
                  :style="{ 
                    background: '#22c55e20', 
                    color: '#22c55e',
                    border: '1px solid #22c55e30'
                  }"
                >
                  +{{ act.points }}
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  ChevronLeft, Upload, Award, Users,
  Calendar, TrendingUp, CheckCircle,
  XCircle, ChevronDown
} from 'lucide-vue-next'

const darkMode = inject('darkMode')
const router = useRouter()
const expandedCategory = ref(null)

const toggleCategory = (id) => {
  expandedCategory.value =
    expandedCategory.value === id ? null : id
}

const getIconComponent = (iconType) => {
  const icons = {
    award: Award,
    users: Users,
    calendar: Calendar,
    trending: TrendingUp
  }
  return icons[iconType] || Award
}

const categories = ref([
  {
    id: 'bakat',
    name: 'Bakat & Minat',
    icon: 'award',
    minPoints: 7.5,
    activities: [
      { id: 'b1', name: 'Lomba Futsal', date: 'Sep 2025', points: 4 },
      { id: 'b2', name: 'UKM Musik', date: 'Oct 2025', points: 4 },
    ],
  },
  {
    id: 'lkmm',
    name: 'LKMM TD',
    icon: 'calendar',
    minPoints: 3,
    activities: [
      { id: 'l1', name: 'LKMM Tingkat Dasar', date: 'Aug 2025', points: 3 },
    ],
  },
  {
    id: 'organisasi',
    name: 'Organisasi & Kepemimpinan',
    icon: 'users',
    minPoints: 9,
    activities: [
      { id: 'o1', name: 'Pengurus HIMA', date: '2025', points: 6 },
      { id: 'o2', name: 'Panitia Event Kampus', date: '2025', points: 4 },
    ],
  },
  {
    id: 'p3k',
    name: 'P3K MABA / WGG',
    icon: 'calendar',
    minPoints: 4,
    activities: [
      { id: 'p1', name: 'Panitia P3K MABA', date: '2025', points: 4 },
    ],
  },
  {
    id: 'penalaran',
    name: 'Penalaran',
    icon: 'trending',
    minPoints: 10.5,
    activities: [
      { id: 'pn1', name: 'Seminar Nasional', date: '2025', points: 5 },
      { id: 'pn2', name: 'Lomba Karya Tulis', date: '2025', points: 6 },
    ],
  },
  {
    id: 'pengabdian',
    name: 'Pengabdian Masyarakat',
    icon: 'users',
    minPoints: 3,
    activities: [
      { id: 'pg1', name: 'Bakti Sosial', date: '2025', points: 3 },
    ],
  },
  {
    id: 'upacara',
    name: 'Upacara',
    icon: 'award',
    minPoints: 3,
    activities: [
      { id: 'u1', name: 'Upacara Kemerdekaan', date: '2025', points: 3 },
    ],
  },
])

const totalAccumulatedPoints = computed(() =>
  categories.value.reduce((total, cat) => {
    return total + cat.activities.reduce((sum, act) => sum + act.points, 0)
  }, 0)
)

const totalActivitiesDone = computed(() =>
  categories.value.reduce((total, cat) => {
    return total + cat.activities.length
  }, 0)
)

const categoriesWithPoints = computed(() =>
  categories.value.map(cat => ({
    ...cat,
    currentPoints: cat.activities.reduce((sum, act) => sum + act.points, 0)
  }))
)
</script>