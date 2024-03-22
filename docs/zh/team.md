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
    <template #title>开发团队</template>
    <template #lead>SMail 创造团队</template>
  </VPTeamPageTitle>
  <VPTeamMembers size="medium" :members="coreMembers" />
</VPTeamPage>
