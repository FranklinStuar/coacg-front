<template>
  <v-container
  fluid
  class='pa-0'
  >
    <v-layout class='pa-0' row wrap>
      <PageHeader
       :title=" english ? 'Agencies' : 'Sucursales' "
       >
      </PageHeader>
      <AgenciesMaps></AgenciesMaps>  
    </v-layout>
  </v-container>
</template>

<script>
  import PageHeader from '@/components/PageHeader.vue'
  import AgenciesMaps from '@/components/AgenciesMaps.vue'
export default {
  name: 'agencies',
  data(){
  	return{
      english: sessionStorage.english === 'true',
  	}
  },
  components:{
    PageHeader,
    AgenciesMaps
  },
}
</script>

<style>
.agencies-container{
  min-height: 700px
}
</style>