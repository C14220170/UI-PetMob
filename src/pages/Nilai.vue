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
        Grades
      </p>
    </div>

    <div
      class="rounded-3xl p-6 mb-6 transition-all duration-500"
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
          ? '0 20px 60px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -2px 10px rgba(0, 0, 0, 0.2)'
          : '0 20px 60px rgba(30, 50, 88, 0.15), 0 8px 20px rgba(55, 129, 173, 0.1), inset 0 2px 0 rgba(255, 255, 255, 1), inset 0 -2px 10px rgba(55, 129, 173, 0.1)',
      }"
    >
      <div class="flex items-center justify-between">
        
        <div class="text-left">
          <p
            class="text-sm mb-2 transition-colors duration-300"
            :style="{ color: darkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(30, 50, 88, 0.7)' }"
          >
            Current GPA
          </p>
          <p
            class="text-4xl font-semibold transition-colors duration-300"
            :style="{
              color: darkMode ? 'white' : '#1E3258',
              textShadow: darkMode
                ? '0 4px 20px rgba(255, 255, 255, 0.2)'
                : '0 4px 20px rgba(30, 50, 88, 0.1)',
            }"
          >
            {{ currentGpa }}
          </p>
        </div>

        <div class="text-right">
          <p
            class="text-sm mb-2 transition-colors duration-300"
            :style="{ color: darkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(30, 50, 88, 0.7)' }"
          >
            Total Credits
          </p>
          <p
            class="text-4xl font-semibold transition-colors duration-300 flex items-baseline justify-end gap-1.5"
            :style="{ color: darkMode ? 'white' : '#1E3258' }"
          >
            {{ currentCredits }}
            <span
              class="text-sm font-medium transition-colors duration-300"
              :style="{ color: darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(30, 50, 88, 0.6)' }"
            >
              SKS
            </span>
          </p>
        </div>

      </div>
    </div>

    <div class="mb-6 relative z-40">
      <div
        @click="isDropdownOpen = !isDropdownOpen"
        class="rounded-2xl px-5 py-3.5 flex items-center justify-between cursor-pointer transition-all duration-300"
        :style="{
          background: darkMode
            ? 'rgba(55, 129, 173, 0.15)'
            : 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          border: darkMode
            ? '1px solid rgba(255, 255, 255, 0.08)'
            : '1px solid rgba(55, 129, 173, 0.15)',
          boxShadow: darkMode
            ? '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
            : '0 8px 32px rgba(30, 50, 88, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        }"
      >
        <span
          class="font-medium transition-colors duration-300"
          :style="{ color: darkMode ? 'white' : '#1E3258' }"
        >
          {{ selectedSemester.name }}
        </span>
        <ChevronDown
          class="w-5 h-5 transition-transform duration-300"
          :class="{ 'rotate-180': isDropdownOpen }"
          :style="{ color: darkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(30, 50, 88, 0.6)' }"
        />
      </div>

      <transition 
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform scale-95 opacity-0 -translate-y-2"
        enter-to-class="transform scale-100 opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform scale-100 opacity-100 translate-y-0"
        leave-to-class="transform scale-95 opacity-0 -translate-y-2"
      >
        <div 
          v-if="isDropdownOpen"
          class="absolute top-full left-0 w-full mt-2 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-3xl"
          :style="{
            background: darkMode ? 'rgba(28, 39, 66, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(55,129,173,0.1)'
          }"
        >
          <div 
            v-for="sem in semesters" 
            :key="sem.id"
            @click="selectSemester(sem)"
            class="px-5 py-3 cursor-pointer transition-colors duration-200 text-left"
            :style="{
              color: darkMode ? 'white' : '#1E3258',
              background: selectedSemester.id === sem.id 
                ? (darkMode ? 'rgba(96, 165, 250, 0.2)' : 'rgba(55, 129, 173, 0.1)') 
                : 'transparent'
            }"
            @mouseover="$event.target.style.background = darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'"
            @mouseleave="$event.target.style.background = selectedSemester.id === sem.id ? (darkMode ? 'rgba(96, 165, 250, 0.2)' : 'rgba(55, 129, 173, 0.1)') : 'transparent'"
          >
            {{ sem.name }}
          </div>
        </div>
      </transition>
    </div>

    <h3
      class="text-lg font-semibold mb-4 text-left transition-colors duration-300"
      :style="{ color: darkMode ? 'white' : '#1E3258' }"
    >
      Course Grades
    </h3>

    <div v-if="filteredCourses.length === 0" class="text-center py-8 opacity-60">
      <p :style="{ color: darkMode ? 'white' : '#1E3258' }">No courses found for this semester.</p>
    </div>

    <div v-else class="space-y-3">
      <div
        v-for="course in filteredCourses"
        :key="course.id"
        @click="goToDetail(course.id)"
        class="rounded-3xl p-5 cursor-pointer transition-all duration-300 active:scale-95"
        :style="{
          background: darkMode
            ? 'linear-gradient(135deg, rgba(55, 129, 173, 0.2) 0%, rgba(55, 129, 173, 0.1) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 100%)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          border: darkMode
            ? '1px solid rgba(255, 255, 255, 0.08)'
            : '1px solid rgba(55, 129, 173, 0.15)',
          boxShadow: darkMode
            ? '0 12px 40px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 8px rgba(0, 0, 0, 0.15)'
            : '0 12px 40px rgba(30, 50, 88, 0.1), 0 4px 12px rgba(55, 129, 173, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 8px rgba(55, 129, 173, 0.08)',
        }"
      >
        <div class="flex items-center justify-between text-left">
          <div class="flex-1 pr-4">
            <h4
              class="font-semibold mb-1 transition-colors duration-300"
              :style="{ color: darkMode ? 'white' : '#1E3258' }"
            >
              {{ course.name }}
            </h4>
            <p
              class="text-sm transition-colors duration-300"
              :style="{ color: darkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(30, 50, 88, 0.7)' }"
            >
              {{ course.credits }} Credit Hours
            </p>
          </div>

          <div
            class="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
            :style="{
              background: `${course.gradeColor}20`,
              border: `2px solid ${course.gradeColor}60`,
              boxShadow: `0 8px 24px ${course.gradeColor}30, inset 0 2px 4px ${course.gradeColor}20`,
            }"
          >
            <span
              class="text-2xl font-bold"
              :style="{ color: course.gradeColor }"
            >
              {{ course.grade }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronLeft, ChevronDown } from 'lucide-vue-next'

const darkMode = inject('darkMode')
const router = useRouter()

const isDropdownOpen = ref(false)

// Data Semester
const semesters = [
  { id: 1, name: 'Semester 1', gpa: '3.80', credits: 21 },
  { id: 2, name: 'Semester 2', gpa: '3.75', credits: 43 },
  { id: 3, name: 'Semester 3', gpa: '3.60', credits: 65 },
  { id: 4, name: 'Semester 4', gpa: '3.55', credits: 87 },
  { id: 5, name: 'Semester 5', gpa: '3.48', credits: 108 },
  { id: 6, name: 'Semester 6', gpa: '3.42', credits: 129 },
  { id: 7, name: 'Semester 7', gpa: '3.45', credits: 144 },
]

const selectedSemester = ref(semesters[6]) 
const currentGpa = ref(semesters[6].gpa)
const currentCredits = ref(semesters[6].credits)

const selectSemester = (sem) => {
  selectedSemester.value = sem
  currentGpa.value = sem.gpa
  currentCredits.value = sem.credits
  isDropdownOpen.value = false
}

// Data Courses
const courses = ref([
  { id: '1', semesterId: 7, name: 'Manual Drawing', grade: 'A', credits: 3, gradeColor: '#22c55e' },
  { id: '2', semesterId: 7, name: 'Digital Design', grade: 'A', credits: 3, gradeColor: '#22c55e' },
  { id: '3', semesterId: 7, name: 'Architecture Theory', grade: 'B', credits: 3, gradeColor: '#3b82f6' },
  { id: '4', semesterId: 7, name: 'Building Materials', grade: 'A', credits: 2, gradeColor: '#22c55e' },
  
  { id: '5', semesterId: 6, name: 'Structural Systems', grade: 'B', credits: 4, gradeColor: '#3b82f6' },
  { id: '6', semesterId: 6, name: 'Environmental Design', grade: 'C', credits: 3, gradeColor: '#fb923c' },
  { id: '7', semesterId: 6, name: 'Urban Planning', grade: 'A', credits: 3, gradeColor: '#22c55e' },
  
  { id: '8', semesterId: 1, name: 'Basic Mathematics', grade: 'A', credits: 3, gradeColor: '#22c55e' },
  { id: '9', semesterId: 1, name: 'Introduction to Architecture', grade: 'A', credits: 4, gradeColor: '#22c55e' },
])

const filteredCourses = computed(() => {
  return courses.value.filter(course => course.semesterId === selectedSemester.value.id)
})

const goToDetail = (id) => {
  router.push(`/nilai/${id}`)
}
</script>