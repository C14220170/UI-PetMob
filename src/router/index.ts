import { createRouter, createWebHistory } from 'vue-router'
import JadwalView from '../pages/Jadwal.vue'
import NilaiView from '../pages/Nilai.vue' 
import DetailNilaiView from '../pages/DetailNilai.vue'
import SkkkView from '../pages/Skkk.vue'
import AttendanceView from '../pages/Kehadiran.vue'
import TranskripView from '../pages/Transkrip.vue'

const routes = [
  { path: '/', redirect: '/jadwal' },
  { path: '/jadwal', component: JadwalView },
  { path: '/nilai', component: NilaiView },
  { path: '/nilai/:courseId', component: DetailNilaiView, props: true },
  { path: '/skkk', component: SkkkView },
  { path: '/kehadiran', component: AttendanceView },
  { path: '/transkrip', component: TranskripView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router