  <template>
      <q-header elevated class="lod-background q-pa-sm flex items-center justify-between">
        <img width="145" height="51" src="https://lod.io/wp-content/uploads/2024/01/Lod-Green-no-Background-1.svg" class="attachment-thumbnail size-thumbnail wp-image-3625" alt="" >
          <q-btn v-if="returnButtonRequired" flat color="black" icon="arrow_back" label="Return" @click="goBack" />
      </q-header>
  </template>


  <script lang="ts">
  import { defineComponent } from 'vue';
  import router from "@/router";

  export default defineComponent({
    name: 'AppHeader',
    props: {
      returnButtonRequired: {
        type: Boolean,
        default: false
      }
    },
    setup() {
      const goBack = () => router.back();
      return {
        goBack
      }
    }
  });
  </script>
