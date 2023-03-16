<script lang="ts">
    import Diary from './lib/diary.svelte'
    import Header_diary from './lib/header_diary.svelte'
    import Comic from './lib/comic.svelte'
  </script>
  

    <Header_diary />
    <div class="grid-item-content">
      <Diary />
      <Comic />
    </div>

    
  
  <style>
    .grid-item-content{
      padding-top: 200px;
      padding-left: 350px;
      padding-right: 350px;
      display: flexbox;
      margin-right: 0px;
      grid-column: auto;
      grid-row: auto;
    }

  </style>