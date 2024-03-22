---
layout: page
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme'

const coreMembers = [{
  avatar: 'https://www.github.com/akazwz.png',
  name: 'akazwz',
    title: 'Creator@smail',
    links: [
      { icon: 'github', link: 'https://github.com/akazwz' },
    ]
}]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>Develop Team</template>
    <template #lead>developer of SMail</template>
  </VPTeamPageTitle>
  <VPTeamMembers size="medium" :members="coreMembers" />
</VPTeamPage>
