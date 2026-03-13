<template>
  <div class="w-full pt-12 pb-6 px-6">
    
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
        class="text-2xl font-bold tracking-wide transition-colors duration-300" 
        :style="{ color: darkMode ? 'white' : '#2a4a6f' }"
      >
        Schedule
      </p>
    </div>

    <div class="flex items-center p-1 rounded-2xl mb-6 w-full max-w-sm"
         :style="{
           background: darkMode ? 'rgba(55, 129, 173, 0.15)' : 'rgba(255, 255, 255, 0.7)',
           border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(55, 129, 173, 0.2)',
           boxShadow: darkMode ? 'inset 0 2px 4px rgba(0,0,0,0.2)' : 'inset 0 2px 4px rgba(30, 50, 88, 0.05)'
         }">
      <button 
        @click="viewMode = 'daily'"
        class="flex-1 py-2 text-sm font-semibold rounded-xl transition-all duration-300"
        :style="{
          background: viewMode === 'daily' 
            ? (darkMode ? 'rgba(255,255,255,0.1)' : 'white') 
            : 'transparent',
          color: viewMode === 'daily' 
            ? (darkMode ? 'white' : '#1E3258') 
            : (darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(30,50,88,0.5)'),
          boxShadow: viewMode === 'daily' && !darkMode ? '0 4px 12px rgba(30,50,88,0.1)' : 'none'
        }"
      >
        Daily
      </button>
      <button 
        @click="viewMode = 'all'"
        class="flex-1 py-2 text-sm font-semibold rounded-xl transition-all duration-300"
        :style="{
          background: viewMode === 'all' 
            ? (darkMode ? 'rgba(255,255,255,0.1)' : 'white') 
            : 'transparent',
          color: viewMode === 'all' 
            ? (darkMode ? 'white' : '#1E3258') 
            : (darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(30,50,88,0.5)'),
          boxShadow: viewMode === 'all' && !darkMode ? '0 4px 12px rgba(30,50,88,0.1)' : 'none'
        }"
      >
        All Schedule
      </button>
    </div>

    <transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="viewMode === 'daily'"
        class="rounded-3xl p-5 mb-6 transition-all duration-500"
        :style="{
          background: darkMode ? 'linear-gradient(135deg, rgba(55, 129, 173, 0.25) 0%, rgba(55, 129, 173, 0.15) 100%)' : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.7) 100%)',
          backdropFilter: 'blur(40px)',
          border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(55, 129, 173, 0.2)',
          boxShadow: darkMode ? '0 20px 60px rgba(0, 0, 0, 0.4)' : '0 20px 60px rgba(30, 50, 88, 0.15)'
        }"
      >
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold" :style="{ color: darkMode ? 'rgba(255, 255, 255, 0.9)' : '#1E3258' }">
            {{ currentMonth }}
          </h2>
          <CalendarIcon class="w-5 h-5" :style="{ color: darkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(30, 50, 88, 0.6)' }" />
        </div>
        
        <div 
          class="flex items-center gap-3 overflow-x-auto pb-2 snap-x"
          style="scrollbar-width: none; -ms-overflow-style: none;"
        >
          <button
            v-for="(day, index) in weekDays"
            :key="index"
            @click="selectedDay = day.name"
            class="flex-shrink-0 w-[4.5rem] aspect-square rounded-2xl flex flex-col items-center justify-center transition-all active:scale-95 snap-center"
            :style="{
              background: selectedDay === day.name 
                ? 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)'
                : darkMode ? 'rgba(55, 129, 173, 0.15)' : 'rgba(255, 255, 255, 0.6)',
              border: selectedDay === day.name 
                ? '2px solid rgba(255, 255, 255, 0.3)'
                : `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(55, 129, 173, 0.15)'}`,
              boxShadow: selectedDay === day.name
                ? '0 8px 24px rgba(251, 146, 60, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                : darkMode ? '0 4px 12px rgba(0, 0, 0, 0.2)' : '0 4px 12px rgba(55, 129, 173, 0.06)'
            }"
          >
            <span class="text-xs mb-1" :style="{ color: selectedDay === day.name ? 'white' : (darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(30, 50, 88, 0.5)') }">
              {{ day.name }}
            </span>
            <span class="text-lg font-semibold" :style="{ color: selectedDay === day.name ? 'white' : (darkMode ? 'white' : '#1E3258') }">
              {{ day.date }}
            </span>
          </button>
        </div>
      </div>
    </transition>

    <main>
      <div v-if="viewMode === 'daily'" class="space-y-4">
        <h3 class="text-lg font-semibold mb-4 text-left" :style="{ color: darkMode ? 'white' : '#1E3258' }">
          {{ selectedDay }}'s Schedule
        </h3>
        
        <div v-if="dailySchedules.length === 0" class="text-center py-8 opacity-60">
          <p :style="{ color: darkMode ? 'white' : '#1E3258' }">No classes scheduled for today.</p>
        </div>

        <ScheduleCard 
          v-for="(item, index) in dailySchedules" 
          :key="index" 
          :item="item" 
          :darkMode="darkMode" 
        />
      </div>

      <div v-else class="space-y-8">
        <div v-for="(schedules, dayName) in groupedSchedules" :key="dayName">
          <h3 class="text-lg font-semibold mb-4 text-left border-b pb-2" 
              :style="{ 
                color: darkMode ? 'white' : '#1E3258',
                borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(30,50,88,0.1)'
              }">
            {{ dayName }}
          </h3>
          <div class="space-y-4">
            <ScheduleCard 
              v-for="(item, index) in schedules" 
              :key="index" 
              :item="item" 
              :darkMode="darkMode" 
            />
          </div>
        </div>
      </div>
    </main>

  </div>
</template>

<script setup>
import { inject, ref, computed, onMounted } from 'vue'
import { ChevronLeft, Calendar as CalendarIcon, Clock, MapPin } from 'lucide-vue-next'
import ScheduleCard from '../components/ScheduleCard.vue' 

const darkMode = inject('darkMode')

const viewMode = ref('daily')
const currentMonth = ref('')
const selectedDay = ref('Mon')
const weekDays = ref([])

const generateCurrentWeek = () => {
  const today = new Date()
  const dayOfWeek = today.getDay()
  
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
  
  const monday = new Date(today)
  monday.setDate(today.getDate() + diffToMonday)

  const daysNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const generatedDays = []
  
  for (let i = 0; i < 6; i++) { 
    const currentDate = new Date(monday)
    currentDate.setDate(monday.getDate() + i)
    generatedDays.push({
      name: daysNames[currentDate.getDay()],
      date: currentDate.getDate()
    })
  }

  weekDays.value = generatedDays

  currentMonth.value = monday.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const todayName = daysNames[today.getDay()]
  selectedDay.value = todayName === 'Sun' ? 'Mon' : todayName
}

onMounted(() => {
  generateCurrentWeek()
})

const daysOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Data Jadwal
const allCourses = ref([
  { day: 'Mon', time: '10:00', duration: '1.5 hours', course: 'Data Structures', room: 'Lab 102', instructor: 'Dr. Sarah Johnson', color: '#60a5fa', avatar: '👩‍🏫' },
  { day: 'Mon', time: '13:00', duration: '2 hours', course: 'Database Systems', room: 'Room 304', instructor: 'Dr. Emily Rodriguez', color: '#22c55e', avatar: '👩‍💼' },
  { day: 'Tue', time: '09:00', duration: '2 hours', course: 'Computer Networks', room: 'Lab 201', instructor: 'Dr. James Wilson', color: '#a855f7', avatar: '👨‍💻' },
  { day: 'Tue', time: '14:00', duration: '1.5 hours', course: 'Web Development', room: 'Lab 105', instructor: 'Prof. Michael Chen', color: '#f97316', avatar: '👨‍🏫' },
  { day: 'Wed', time: '10:00', duration: '1.5 hours', course: 'Data Structures', room: 'Lab 102', instructor: 'Dr. Sarah Johnson', color: '#60a5fa', avatar: '👩‍🏫' },
  { day: 'Wed', time: '14:00', duration: '1.5 hours', course: 'Manual Drawing', room: 'Studio 201', instructor: 'Prof. Lisa Anderson', color: '#ef4444', avatar: '👨‍🏫' },
  { day: 'Wed', time: '16:00', duration: '2 hours', course: 'Digital Design', room: 'Lab 305', instructor: 'Dr. Emily Rodriguez', color: '#22c55e', avatar: '👩‍💼' },
  { day: 'Thu', time: '09:00', duration: '2 hours', course: 'Computer Networks', room: 'Lab 201', instructor: 'Dr. James Wilson', color: '#a855f7', avatar: '👨‍💻' },
  { day: 'Fri', time: '08:00', duration: '2 hours', course: 'Software Engineering', room: 'Room 205', instructor: 'Prof. Lisa Anderson', color: '#ef4444', avatar: '👨‍🏫' },
])

const dailySchedules = computed(() => {
  return allCourses.value
    .filter(course => course.day === selectedDay.value)
    .sort((a, b) => a.time.localeCompare(b.time))
})

const groupedSchedules = computed(() => {
  const grouped = {}
  daysOrder.forEach(day => {
    const schedulesForDay = allCourses.value
      .filter(course => course.day === day)
      .sort((a, b) => a.time.localeCompare(b.time))
    
    if (schedulesForDay.length > 0) {
      grouped[day] = schedulesForDay
    }
  })
  return grouped
})
</script>