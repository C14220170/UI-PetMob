<template>
  <div class="w-full pt-12 pb-20 px-6 overflow-hidden">
    
    <div class="flex items-center gap-4 mb-6">
      <button
        @click="router.back()"
        class="p-2 rounded-2xl transition-all active:scale-95"
        :style="getCardStyle(darkMode)"
      >
        <ChevronLeft :style="{ color: darkMode ? 'white' : '#1E3258' }" />
      </button>
      <p 
        class="text-2xl font-bold tracking-wide transition-colors duration-300" 
        :style="{ color: darkMode ? 'white' : '#2a4a6f' }"
      >
        Transcripts
      </p>
    </div>

    <div class="flex items-center p-1 rounded-2xl mb-6 w-full" :style="getCardStyle(darkMode)">
      <button 
        @click="activeTab = 'grades'"
        class="flex-1 py-2 text-sm font-semibold rounded-xl transition-all duration-300"
        :style="{
          background: activeTab === 'grades' 
            ? (darkMode ? 'rgba(255,255,255,0.1)' : 'white') 
            : 'transparent',
          color: activeTab === 'grades' 
            ? (darkMode ? 'white' : '#1E3258') 
            : (darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(30,50,88,0.5)'),
          boxShadow: activeTab === 'grades' && !darkMode ? '0 4px 12px rgba(30,50,88,0.1)' : 'none'
        }"
      >
        Academic Grades
      </button>
      <button 
        @click="activeTab = 'skkk'"
        class="flex-1 py-2 text-sm font-semibold rounded-xl transition-all duration-300"
        :style="{
          background: activeTab === 'skkk' 
            ? (darkMode ? 'rgba(255,255,255,0.1)' : 'white') 
            : 'transparent',
          color: activeTab === 'skkk' 
            ? (darkMode ? 'white' : '#1E3258') 
            : (darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(30,50,88,0.5)'),
          boxShadow: activeTab === 'skkk' && !darkMode ? '0 4px 12px rgba(30,50,88,0.1)' : 'none'
        }"
      >
        SKKK Credits
      </button>
    </div>

    <main class="relative">
      <transition
        enter-active-class="transition-all duration-500 ease-out absolute w-full"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-300 ease-in absolute w-full"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4"
      >
        <div v-if="activeTab === 'grades'" key="grades" class="space-y-6 pb-20">
          
          <div class="grid grid-cols-2 gap-4">
            <div class="rounded-3xl p-5" :style="getCardStyle(darkMode)">
              <p class="text-sm font-semibold mb-1" :style="{ color: darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(30,50,88,0.7)' }">
                Cumulative GPA
              </p>
              <p class="text-3xl font-bold" :style="{ color: darkMode ? 'white' : '#1E3258' }">
                3.42
              </p>
            </div>
            <div class="rounded-3xl p-5" :style="getCardStyle(darkMode)">
              <p class="text-sm font-semibold mb-1" :style="{ color: darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(30,50,88,0.7)' }">
                Total Earned
              </p>
              <p class="text-2xl font-bold" :style="{ color: darkMode ? 'white' : '#1E3258' }">
                138 <span class="text-sm font-semibold">SKS</span>
              </p>
              <p class="text-sm font-bold mt-1" :style="{ color: darkMode ? '#60a5fa' : '#3781AD' }">
                27 <span class="font-semibold">Mata Kuliah</span>
              </p>
            </div>
          </div>

          <div class="rounded-3xl p-6" :style="getCardStyle(darkMode)">
            <h2 class="text-lg font-semibold mb-6" :style="{ color: darkMode ? 'white' : '#1E3258' }">
              GPA Trend
            </h2>
            <div class="w-full h-32 relative">
              <svg viewBox="0 -5 100 50" class="w-full h-full overflow-visible preserve-3d">
                <defs>
                  <linearGradient id="gpaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" :stop-color="darkMode ? 'rgba(96, 165, 250, 0.4)' : 'rgba(55, 129, 173, 0.3)'" />
                    <stop offset="100%" :stop-color="darkMode ? 'rgba(96, 165, 250, 0)' : 'rgba(55, 129, 173, 0)'" />
                  </linearGradient>
                </defs>
                <polygon points="0,40 0,32 20,28 40,20 60,24 80,16 100,23.2 100,40" fill="url(#gpaGradient)" />
                <polyline fill="none" :stroke="darkMode ? '#60a5fa' : '#3781AD'" stroke-width="2.5" points="0,32 20,28 40,20 60,24 80,16 100,23.2" stroke-linecap="round" stroke-linejoin="round" />
                <g v-for="(pt, index) in gpaPoints" :key="index">
                  <circle :cx="pt.x" :cy="pt.y" r="2.5" :fill="darkMode ? '#1e293b' : 'white'" :stroke="darkMode ? '#60a5fa' : '#3781AD'" stroke-width="1.5" />
                  <text :x="pt.x" :y="pt.y - 6" font-size="5" font-weight="bold" text-anchor="middle" :fill="darkMode ? 'rgba(255,255,255,0.8)' : 'rgba(30,50,88,0.8)'">{{ pt.gpa }}</text>
                  <text :x="pt.x" y="48" font-size="4" font-weight="bold" text-anchor="middle" :fill="darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(30,50,88,0.5)'">{{ pt.label }}</text>
                </g>
              </svg>
            </div>
          </div>

          <div class="rounded-3xl p-6" :style="getCardStyle(darkMode)">
            <h2 class="text-lg font-semibold mb-6" :style="{ color: darkMode ? 'white' : '#1E3258' }">
              Grade Distribution
            </h2>
            <div class="flex justify-between items-end h-48 gap-2">
              <div 
                v-for="item in gradeDistribution" 
                :key="item.grade"
                class="flex flex-col justify-end items-center flex-1 h-full group"
              >
                <span 
                  class="text-xs font-bold mb-2 opacity-80 group-hover:opacity-100 transition-opacity"
                  :style="{ color: darkMode ? 'white' : '#1E3258' }"
                >
                  {{ item.count }}
                </span>
                
                <div 
                  class="w-full max-w-[32px] rounded-t-xl transition-all duration-500 group-hover:brightness-110 relative overflow-hidden"
                  :style="{ 
                    height: item.count > 0 ? `${(item.count / maxGradeCount) * 100}%` : '4px',
                    background: item.color
                  }"
                >
                  <div class="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent w-full"></div>
                </div>

                <span 
                  class="text-sm font-bold mt-3"
                  :style="{ color: darkMode ? 'rgba(255,255,255,0.8)' : 'rgba(30,50,88,0.8)' }"
                >
                  {{ item.grade }}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-4 px-1" :style="{ color: darkMode ? 'white' : '#1E3258' }">
              Semester Wise Grades
            </h3>
            <div class="space-y-4">
              <div
                v-for="semester in semesters"
                :key="semester.id"
                class="rounded-3xl overflow-hidden transition-all duration-300"
                :style="getCardStyle(darkMode)"
              >
                <button
                  @click="toggleSemester(semester.id)"
                  class="w-full p-5 flex items-center justify-between active:scale-[0.98] transition-transform"
                >
                  <div class="text-left">
                    <h4 class="font-bold text-lg mb-1" :style="{ color: darkMode ? 'white' : '#1E3258' }">
                      {{ semester.name }}
                    </h4>
                    <div class="flex gap-3 text-sm font-semibold" :style="{ color: darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(30,50,88,0.7)' }">
                      <span class="px-2.5 py-1 rounded-lg" :style="{ background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }">
                        GPA: {{ semester.gpa }}
                      </span>
                      <span class="px-2.5 py-1 rounded-lg" :style="{ background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }">
                        {{ semester.credits }} SKS
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    class="transition-transform duration-300 w-5 h-5"
                    :class="{ 'rotate-180': expandedSemester === semester.id }"
                    :style="{ color: darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(30,50,88,0.5)' }"
                  />
                </button>

                <transition
                  enter-active-class="transition-all duration-300 ease-out"
                  enter-from-class="max-h-0 opacity-0"
                  enter-to-class="max-h-[1000px] opacity-100"
                  leave-active-class="transition-all duration-200 ease-in"
                  leave-from-class="max-h-[1000px] opacity-100"
                  leave-to-class="max-h-0 opacity-0"
                >
                  <div v-if="expandedSemester === semester.id" class="px-5 pb-5">
                    <div class="pt-3 border-t space-y-3" :style="{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(30,50,88,0.1)' }">
                      <div
                        v-for="(course, index) in semester.courses"
                        :key="index"
                        class="rounded-2xl p-4 flex items-center justify-between"
                        :style="{ background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)' }"
                      >
                        <div class="flex-1 pr-4">
                          <h5 class="font-semibold text-[15px] mb-1 leading-tight" :style="{ color: darkMode ? 'white' : '#1E3258' }">
                            {{ course.name }}
                          </h5>
                          <p class="text-sm font-medium" :style="{ color: darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(30,50,88,0.6)' }">
                            {{ course.credits }} SKS
                          </p>
                        </div>
                        <div
                          class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                          :style="{ background: `${course.gradeColor}15`, border: `1px solid ${course.gradeColor}40` }"
                        >
                          <span class="text-xl font-bold" :style="{ color: course.gradeColor }">
                            {{ course.grade }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>

        <div v-else key="skkk" class="space-y-6 pb-20">
          <div class="rounded-3xl p-6 text-center" :style="getCardStyle(darkMode)">
            <p class="text-sm font-semibold mb-2 uppercase tracking-wider" :style="{ color: darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(30,50,88,0.7)' }">
              Total SKKK Earned
            </p>
            <div class="flex items-end justify-center gap-2">
              <span class="text-5xl font-bold" :style="{ color: darkMode ? '#60a5fa' : '#3781AD' }">
                230
              </span>
              <span class="text-xl font-semibold mb-1" :style="{ color: darkMode ? 'white' : '#1E3258' }">
                Points
              </span>
            </div>
            <p class="text-sm mt-3 font-semibold" :style="{ color: darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(30,50,88,0.5)' }">
              Minimum for Graduation: 150 Points
            </p>
          </div>

          <div class="rounded-3xl p-6" :style="getCardStyle(darkMode)">
            <h2 class="text-lg font-semibold mb-1" :style="{ color: darkMode ? 'white' : '#1E3258' }">
              Category Fulfillment
            </h2>
            <p class="text-sm mb-6 font-medium" :style="{ color: darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(30,50,88,0.6)' }">
              Status of 7 compulsory categories
            </p>

            <div class="space-y-5">
              <div v-for="cat in skkkCategories" :key="cat.name" class="w-full">
                <div class="flex justify-between items-end mb-2">
                  <span class="text-sm font-semibold" :style="{ color: darkMode ? 'white' : '#1E3258' }">
                    {{ cat.name }}
                  </span>
                  <div class="text-right flex items-baseline gap-1">
                    <span class="text-sm font-bold" :style="{ color: cat.current >= cat.min ? '#22c55e' : '#f59e0b' }">
                      {{ cat.current }}
                    </span>
                    <span class="text-xs font-semibold" :style="{ color: darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(30,50,88,0.5)' }">
                      / {{ cat.min }}
                    </span>
                  </div>
                </div>
                <div class="w-full h-3 rounded-full overflow-hidden relative" :style="{ background: darkMode ? 'rgba(0,0,0,0.2)' : 'rgba(30,50,88,0.05)' }">
                  <div class="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden" :style="{ width: `${Math.min((cat.current / cat.min) * 100, 100)}%`, background: cat.current >= cat.min ? 'linear-gradient(90deg, #22c55e, #4ade80)' : 'linear-gradient(90deg, #f59e0b, #fbbf24)' }">
                    <div class="absolute top-0 left-0 right-0 bottom-0 bg-white/20 w-full animate-pulse"></div>
                  </div>
                </div>
                <p class="text-[11px] font-semibold mt-1.5 flex items-center gap-1" :style="{ color: cat.current >= cat.min ? '#22c55e' : '#f59e0b' }">
                  <component :is="cat.current >= cat.min ? CheckCircle : AlertTriangle" class="w-3.5 h-3.5" />
                  {{ cat.current >= cat.min ? 'Mencukupi (Fulfilled)' : 'Belum Mencukupi' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </main>
  </div>
</template>

<script setup>
import { ref, inject, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronLeft, ChevronDown, CheckCircle, AlertTriangle } from 'lucide-vue-next'

const darkMode = inject('darkMode', false)
const router = useRouter()

const activeTab = ref('grades')
const expandedSemester = ref(null)

const toggleSemester = (id) => {
  expandedSemester.value = expandedSemester.value === id ? null : id
}

const getCardStyle = (isDark) => ({
  background: isDark ? 'rgba(30, 41, 59, 0.4)' : 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.8)',
  boxShadow: isDark ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 32px rgba(30, 50, 88, 0.08)'
})

const gpaPoints = ref([
  { x: 0, y: 32, label: 'S1', gpa: 3.2 },
  { x: 20, y: 28, label: 'S2', gpa: 3.3 },
  { x: 40, y: 20, label: 'S3', gpa: 3.5 },
  { x: 60, y: 24, label: 'S4', gpa: 3.4 },
  { x: 80, y: 16, label: 'S5', gpa: 3.6 },
  { x: 100, y: 23.2, label: 'S6', gpa: 3.42 },
])

const gradeDistribution = ref([
  { grade: 'A', count: 12, color: '#22c55e' },
  { grade: 'B+', count: 8, color: '#3b82f6' },
  { grade: 'B', count: 5, color: '#60a5fa' },
  { grade: 'C+', count: 2, color: '#f59e0b' },
  { grade: 'C', count: 0, color: '#fbbf24' },
  { grade: 'D', count: 0, color: '#ef4444' },
  { grade: 'E', count: 0, color: '#b91c1c' },
])

const maxGradeCount = computed(() => {
  return Math.max(...gradeDistribution.value.map(g => g.count)) || 1
})

const skkkCategories = ref([
  { name: '1. Bakat & Minat', current: 8, min: 7.5 },
  { name: '2. LKMM TD', current: 3, min: 3 },
  { name: '3. Organisasi & Kepemimpinan', current: 10, min: 9 },
  { name: '4. P3K MABA / WGG', current: 4, min: 4 }, 
  { name: '5. Penalaran', current: 11, min: 10.5 },
  { name: '6. Pengabdian Masyarakat', current: 3, min: 3 },
  { name: '7. Upacara', current: 0, min: 3 },
])

const semesters = ref([
  {
    id: '6',
    name: 'Semester 6',
    gpa: 3.42,
    credits: 21,
    courses: [
      { name: 'Manual Drawing', grade: 'A', credits: 3, gradeColor: '#22c55e' },
      { name: 'Digital Design', grade: 'A', credits: 3, gradeColor: '#22c55e' },
      { name: 'Architecture Theory', grade: 'B', credits: 3, gradeColor: '#3b82f6' },
    ],
  },
  {
    id: '5',
    name: 'Semester 5',
    gpa: 3.6,
    credits: 22,
    courses: [
      { name: 'Building Materials', grade: 'A', credits: 2, gradeColor: '#22c55e' },
      { name: 'Structural Systems', grade: 'A', credits: 4, gradeColor: '#22c55e' },
      { name: 'Environmental Design', grade: 'B+', credits: 3, gradeColor: '#3b82f6' },
    ],
  },
  {
    id: '4',
    name: 'Semester 4',
    gpa: 3.4,
    credits: 20,
    courses: [
      { name: 'Urban Planning', grade: 'A', credits: 3, gradeColor: '#22c55e' },
      { name: 'Construction Technology', grade: 'B', credits: 3, gradeColor: '#3b82f6' },
      { name: 'Architectural History', grade: 'C+', credits: 3, gradeColor: '#f59e0b' },
    ],
  },
])
</script>