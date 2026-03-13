<template>
  <div class="w-full pt-12 pb-20 px-6">

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
        class="text-2xl font-bold transition-colors duration-300"
        :style="{ color: darkMode ? 'white' : '#1E3258' }"
      >
        Attendance
      </p>
    </div>

    <div class="space-y-4">
      <div
        v-for="subject in computedSubjects"
        :key="subject.id"
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
          @click="toggleSubject(subject.id)"
          class="p-5 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform"
        >
          <div class="flex items-center gap-4 text-left flex-1">
            
            <div class="relative w-16 h-16 flex-shrink-0">
              <svg class="w-full h-full -rotate-90">
                <circle
                  cx="32" cy="32" r="28"
                  :stroke="darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(55,129,173,0.15)'"
                  stroke-width="5" fill="none"
                />
                <circle
                  cx="32" cy="32" r="28"
                  :stroke="subject.isBelowMinimum ? '#ef4444' : '#22c55e'"
                  stroke-width="5" fill="none" stroke-linecap="round"
                  :stroke-dasharray="getStrokeDash(subject.calculatedPercentage)"
                />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <span 
                  class="text-sm font-bold" 
                  :style="{ color: subject.isBelowMinimum ? '#ef4444' : '#22c55e' }"
                >
                  {{ subject.calculatedPercentage }}%
                </span>
              </div>
            </div>

            <div class="flex-1">
              <h3
                class="font-bold mb-2 text-lg transition-colors"
                :style="{ color: darkMode ? 'white' : '#1E3258' }"
              >
                {{ subject.name }}
              </h3>

              <div
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors"
                :style="getBadgeStyle(subject)"
              >
                <component
                  :is="subject.isBelowMinimum ? AlertTriangle : CheckCircle"
                  class="w-3.5 h-3.5"
                />
                {{ subject.isBelowMinimum
                  ? `Min 75% Required`
                  : `Above Min 75%` }}
              </div>
            </div>
          </div>

          <ChevronDown
            class="w-5 h-5 transition-transform duration-300 ml-2 flex-shrink-0"
            :class="{ 'rotate-180': expandedSubject === subject.id }"
            :style="{ color: darkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(30, 50, 88, 0.4)' }"
          />
        </div>

        <transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="max-h-0 opacity-0"
          enter-to-class="max-h-[800px] opacity-100"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="max-h-[800px] opacity-100"
          leave-to-class="max-h-0 opacity-0"
        >
          <div v-if="expandedSubject === subject.id" class="px-5 pb-5">
            <div 
              class="pt-4 space-y-2 border-t"
              :style="{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(30,50,88,0.1)' }"
            >
              <div
                v-for="meeting in subject.meetings"
                :key="meeting.week"
                class="flex items-center justify-between p-3 rounded-2xl transition-colors"
                :style="{ background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-colors"
                    :style="{
                      background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(55, 129, 173, 0.1)',
                      border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(55, 129, 173, 0.1)',
                      color: darkMode ? '#60a5fa' : '#3781AD'
                    }"
                  >
                    W{{ meeting.week }}
                  </div>

                  <div>
                    <p
                      class="text-sm font-bold transition-colors"
                      :style="{ color: darkMode ? 'white' : '#1E3258' }"
                    >
                      Week {{ meeting.week }}
                    </p>
                    <p
                      class="text-xs mt-0.5 transition-colors"
                      :style="{ color: darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(30, 50, 88, 0.6)' }"
                    >
                      {{ meeting.date }}
                    </p>
                  </div>
                </div>

                <div
                  class="text-xs font-bold px-3 py-1.5 rounded-xl"
                  :style="getStatusStyle(meeting.status)"
                >
                  {{ capitalize(meeting.status) }}
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
  ChevronLeft,
  CheckCircle,
  AlertTriangle,
  ChevronDown
} from 'lucide-vue-next'

const darkMode = inject('darkMode', false)
const router = useRouter()
const expandedSubject = ref(null)

const toggleSubject = (id) => {
  expandedSubject.value = expandedSubject.value === id ? null : id
}

// Data Dummy
const subjects = ref([
  {
    id: '1',
    name: 'Manual Drawing',
    meetings: [
      { week: 1, date: 'Feb 1', status: 'present' },
      { week: 2, date: 'Feb 8', status: 'present' },
      { week: 3, date: 'Feb 15', status: 'sick' },
      { week: 4, date: 'Feb 22', status: 'present' },
    ],
  },
  {
    id: '2',
    name: 'Architecture Theory',
    meetings: [
      { week: 1, date: 'Feb 3', status: 'present' },
      { week: 2, date: 'Feb 10', status: 'absent' },
      { week: 3, date: 'Feb 17', status: 'absent' },
      { week: 4, date: 'Feb 24', status: 'present' },
    ],
  },
  {
    id: '3',
    name: 'Digital Design',
    meetings: [
      { week: 1, date: 'Jan 10', status: 'present' },
      { week: 2, date: 'Jan 17', status: 'present' },
      { week: 3, date: 'Jan 24', status: 'sick' },
      { week: 4, date: 'Jan 31', status: 'present' },
      { week: 5, date: 'Feb 7', status: 'absent' },
      { week: 6, date: 'Feb 14', status: 'present' },
    ],
  },
  {
    id: '4',
    name: 'Building Materials',
    meetings: [
      { week: 1, date: 'Mar 1', status: 'sick' },
      { week: 2, date: 'Mar 8', status: 'sick' },
      { week: 3, date: 'Mar 15', status: 'present' },
      { week: 4, date: 'Mar 22', status: 'present' },
    ],
  }
])

const computedSubjects = computed(() => {
  return subjects.value.map(subject => {
    const totalMeetings = subject.meetings.length;
    
    if (totalMeetings === 0) {
      return { ...subject, calculatedPercentage: 0, isBelowMinimum: true };
    }

    const attendedCount = subject.meetings.filter(
      m => m.status === 'present'
    ).length;

    const percentage = Math.round((attendedCount / totalMeetings) * 100);
    
    const isBelowMinimum = percentage < 75;

    return {
      ...subject,
      calculatedPercentage: percentage,
      isBelowMinimum: isBelowMinimum
    };
  });
})

const getBadgeStyle = (subject) => {
  if (subject.isBelowMinimum) {
    return {
      background: darkMode ? 'rgba(239, 68, 68, 0.15)' : '#FEE2E2',
      color: '#EF4444',
    }
  }
  return {
    background: darkMode ? 'rgba(34, 197, 94, 0.15)' : '#DCFCE7',
    color: '#22C55E',
  }
}

const getStatusStyle = (status) => {
  const colors = {
    present: '#22C55E',
    absent:  '#EF4444',
    sick:    '#F59E0B',
  }
  return {
    background: darkMode ? `${colors[status]}20` : `${colors[status]}15`,
    color: colors[status],
  }
}

const getStrokeDash = (percentage) => {
  const radius = 28
  const circumference = 2 * Math.PI * radius
  return `${circumference * (percentage / 100)} ${circumference}`
}

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1)
</script>