<template>
  <table class="table-auto w-full">
    <thead
    >
      <tr
        class="text-xs text-center text-white bg-text"
      >
        <slot name="header"></slot>
      </tr>
    </thead>
    <tbody>
      <slot name="body"></slot>
    </tbody>
  </table>
</template>
