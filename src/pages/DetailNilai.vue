<template>
  <div class="px-6 pb-6 pt-12 w-full">
    <div class="flex items-center gap-4 mb-6">
      <button
        @click="goBack"
        class="p-2 rounded-2xl transition-all active:scale-95 flex-shrink-0"
        :style="{
          background: darkMode
            ? 'rgba(55, 129, 173, 0.15)'
            : 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          border: darkMode
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(55, 129, 173, 0.2)',
          boxShadow: darkMode
            ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.1)'
            : '0 8px 32px rgba(30, 50, 88, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(55, 129, 173, 0.1)',
        }"
      >
        <ChevronLeft class="w-6 h-6" :style="{ color: darkMode ? 'white' : '#1E3258' }" />
      </button>
      <p
        class="text-2xl font-semibold transition-colors duration-300"
        :style="{ color: darkMode ? 'white' : '#1E3258' }"
      >
        Digital Design
    </p>
    </div>

    <div
      class="rounded-3xl p-8 mb-6 text-center transition-all duration-500"
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
      <p
        class="text-sm mb-3 transition-colors duration-300"
        :style="{ color: darkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(30, 50, 88, 0.7)' }"
      >
        Final Grade
      </p>

      <div class="mb-4">
        <div
          class="inline-flex items-center justify-center w-32 h-32 rounded-3xl mb-4"
          :style="{
            background: `${getGradeColor(finalScore)}20`,
            border: `3px solid ${getGradeColor(finalScore)}60`,
            boxShadow: `0 12px 40px ${getGradeColor(finalScore)}30, inset 0 4px 8px ${getGradeColor(finalScore)}20`,
          }"
        >
          <span
            class="text-6xl font-bold"
            :style="{
              color: getGradeColor(finalScore),
              textShadow: `0 4px 20px ${getGradeColor(finalScore)}40`,
            }"
          >
            A
          </span>
        </div>

        <p
          class="text-4xl font-semibold mb-2 transition-colors duration-300"
          :style="{
            color: darkMode ? 'white' : '#1E3258',
            textShadow: darkMode
              ? '0 4px 20px rgba(255, 255, 255, 0.2)'
              : '0 4px 20px rgba(30, 50, 88, 0.1)',
          }"
        >
          {{ finalScore.toFixed(2) }}
        </p>

        <p
          class="text-sm transition-colors duration-300"
          :style="{ color: darkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(30, 50, 88, 0.7)' }"
        >
          Credits: 3
        </p>
      </div>
    </div>

    <h3
      class="text-lg font-semibold mb-4 text-left transition-colors duration-300"
      :style="{ color: darkMode ? 'white' : '#1E3258' }"
    >
      Grade Components
    </h3>

    <div class="space-y-4">
      <div
        v-for="(component, index) in gradeComponents"
        :key="index"
        class="rounded-3xl p-6 transition-all duration-500 text-left"
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
        <div class="flex items-center justify-between mb-3">
          <h4
            class="font-semibold transition-colors duration-300"
            :style="{ color: darkMode ? 'white' : '#1E3258' }"
          >
            {{ component.name }}
          </h4>
          <div class="text-right flex-shrink-0 ml-4">
            <p
              class="text-2xl font-semibold transition-colors duration-300"
              :style="{ color: darkMode ? 'white' : '#1E3258' }"
            >
              {{ component.score }}
            </p>
            <p
              class="text-sm transition-colors duration-300"
              :style="{ color: darkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(30, 50, 88, 0.7)' }"
            >
              Weight: {{ component.weight }}%
            </p>
          </div>
        </div>

        <div class="relative mt-5">
          <div
            class="h-3 rounded-full overflow-hidden transition-colors duration-300"
            :style="{
              background: darkMode
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(55, 129, 173, 0.2)',
            }"
          >
            <div
              class="h-full rounded-full relative"
              :style="{
                width: `${component.score}%`,
                background: `linear-gradient(90deg, ${getGradeColor(component.score)} 0%, ${getGradeColor(component.score)}dd 100%)`,
                boxShadow: `0 0 12px ${getGradeColor(component.score)}60`,
              }"
            />
          </div>

          <div
            class="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
            :style="{
              left: `calc(${component.score}% - 16px)`,
              background: getGradeColor(component.score),
              boxShadow: `0 0 16px ${getGradeColor(component.score)}80, 0 4px 12px rgba(0, 0, 0, 0.3)`,
              border: darkMode
                ? '2px solid rgba(30, 50, 88, 0.5)'
                : '2px solid white',
            }"
          >
            <span
              class="text-xs font-bold"
              style="color: white"
            >
              {{ component.score }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import { ChevronLeft } from 'lucide-vue-next'
import router from '../router'

const darkMode = inject('darkMode')

const gradeComponents = [
  { name: 'Midterm Exam (UTS)', score: 80, weight: 30 },
  { name: 'Final Exam (UAS)', score: 88, weight: 40 },
  { name: 'Assignments & Quizzes', score: 90, weight: 30 },
]

const finalScore = gradeComponents.reduce(
  (acc, component) => acc + (component.score * component.weight) / 100,
  0
)

const getGradeColor = (score) => {
  if (score >= 85) return '#22c55e'
  if (score >= 70) return '#3b82f6'
  if (score >= 60) return '#fb923c'
  return '#ef4444'
}

const goBack = () => {
  router.back()
}
</script>