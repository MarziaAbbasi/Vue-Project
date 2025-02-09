<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-2 text-sm">
    <AppHeader :returnButtonRequired="true" />
    <q-page-container>
      <q-page class="q-pa-md flex flex-center">
        <q-card class="bg-dark text-white q-pa-md" style="border-radius: 12px; width: 428px; padding-left: 16px; padding-right: 16px;height:143px">
          <div class="row justify-between items-center text-sm flex">
            <div class="col-auto">
              <span>Start time:</span>
              <span class="q-ml-xs">{{ energyData?.start_date }}</span>
            </div>
            <div class="col-auto text-right ">
              <span>End time:</span>
              <span class="q-ml-xs">{{ energyData?.end_datetime?.split('T')[0] }}</span>
            </div>
          </div>
          <div class="flex justify-end items-center q-mt-xs mr-40">
            <q-icon name="alarm" size="14px" class="q-mr-xs" />
            <span>{{ timer }}</span>
          </div>
          <div class="row justify-between q-mt-sm" style="width: 396px; ;height:63px;gap: 9px;">
            <q-card flat bordered class="col q-pa-md text-center card-style">
              <div class="power-title">Power Latest</div>
              <strong class="power-number">{{ formatNumber(energyData?.power_latest) }}</strong>
            </q-card>
            <q-card flat bordered class="col q-pa-md text-center card-style">
              <div class="power-title">Power Min</div>
              <strong class="power-number">{{ formatNumber(energyData?.power_min) }}</strong>
            </q-card>
            <q-card flat bordered class="col q-pa-md text-center card-style">
              <div class="power-title">Power Max</div>
              <strong class="power-number">{{ formatNumber(energyData?.power_max) }}</strong>
            </q-card>
          </div>
          <q-banner v-if="error" dense class="bg-red text-white q-mt-md">
            {{ error }}
          </q-banner>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { fetchEnergyData } from '@/services/apiService';
import { RealtimeData } from '@/types/RealtimeData';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import AppHeader from "@/components/AppHeader.vue";

dayjs.extend(duration);

export default defineComponent({
  components: { AppHeader },

  setup() {
    const energyData = ref<RealtimeData | null>(null);
    const error = ref<string | null>(null);
    const intervalId = ref<number | null>(null);

    const timer = ref<string>('00:00:00');

    const getData = async () => {
      error.value = null;
      try {
        const response = await fetchEnergyData();
        energyData.value = response;

        const startDate = dayjs(response.start_date);
        const endDate = dayjs(response.end_datetime);
        const diff = endDate.diff(startDate);

        timer.value = dayjs.duration(diff).format('HH:mm:ss');
      } catch (err) {
        error.value = 'Failed to fetch data';
      }
    };

    onMounted(() => {
      getData();
      intervalId.value = window.setInterval(getData, 60000);
    });

    onUnmounted(() => {
      if (intervalId.value) {
        clearInterval(intervalId.value);
      }
    });

    const formatNumber = (value: number | undefined | null) => {
      return value !== undefined && value !== null ? value.toFixed(2) : 'N/A';
    };

    return {
      energyData,
      timer,
      error,
      formatNumber,
    };
  },
});
</script>

<style scoped>
.q-layout, .q-page, .q-card, .row, .col, .q-banner, span, div {
  font-size: 10px;
  color: #bab4b4;
}

.card-style {
  border-radius: 16px;
  width: calc(33.333% - 6px);
  border: 1px solid #444;
  background-color: #333;
  height:70px
}

.power-title {
  font-size: 12px;
  margin-bottom: 8px;
  color: #bab4b4;
}

.power-number {
  font-size: 14px;
  color: #ffffff;
}

.q-icon {
  color: #bab4b4;
}

.mr-40 {
  margin-right: 40px;
}
</style>
