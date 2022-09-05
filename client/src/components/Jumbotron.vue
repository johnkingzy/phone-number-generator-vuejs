<template>
  <section class="hero">
    <div class="hero-body">
        <div class="title is-flex">
          <div class="is-flex">
            <span style="font-size: 4rem;" class="title fas fa-mobile-alt has-text-primary"></span>
            <span style="font-size: 4rem;" class="title fas fa-cogs has-text-primary"></span>
          </div>
          <div class="is-flex">
            <strong class="has-text-accent">
              Phone
            </strong>
            <strong class="has-text-accent">
              Number
            </strong>
            <strong class="has-text-accent">
              Generator
            </strong>
          </div>
        </div>
      <small class="has-text-dark">Generate random 10-digits phone number</small>
      <p>
        <small class="has-text-dark">
          made with
          <span class="has-text-primary"> ❤ </span> by
          <a target="_blank" href="https://github.com/johnkingzy"> 𝕛𝕠𝕙𝕟𝕜𝕚𝕟𝕘𝕫𝕪 </a>
        </small>
      </p>
      <nav class="breadcrumb has-bullet-separator" aria-label="breadcrumbs">
        <ul>
          <li>Bulma</li>
          <li>VueJS</li>
          <li>NodeJS</li>
          <li>ExpressJS</li>
          <li>Jest</li>
          <li>Mocha</li>
          <li>NightWatch</li>
        </ul>
      </nav>
    </div>
  </section>
</template>
<style>
.title > div {
  flex-direction: column;
  justify-content: center;
}
.title > div:first-child {
  align-items: center;
}
.title > div:nth-child(2) {
  align-items: flex-start;
  margin: 15px;
}
 .title > div:nth-child(2) > strong {
   font-size: 2.5rem;
 }
</style>
