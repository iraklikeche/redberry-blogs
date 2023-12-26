<template>
  <div class="flex h-screen items-center justify-center">
    <h1 class="text-3xl">
      You are not logged in. Please go to
      <RouterLink :to="{ name: 'home' }" class="text-blue-400 underline"
        >Home</RouterLink
      >
      page and log in.
    </h1>
  </div>
</template>
