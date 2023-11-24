<template>
  <div>
    <table class="table-auto w-full">
      <thead
      >
        <tr
          class="text-xs text-center text-white bg-text"
        >
          <slot name="header"></slot>
        </tr>
      </thead>
    </table>
    <div class="w-full max-h-[500px] overflow-scroll p-0">
      <table class="table-auto w-full">    
        <tbody>
          <slot name="body"></slot>
        </tbody>
      </table>
    </div>
  </div>
    
</template>
