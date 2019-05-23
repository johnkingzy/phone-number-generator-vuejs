import Vue from 'vue'
import Jumbotron from '@/components/Jumbotron'

describe('Jumbotron.vue', () => {
  it('should display a title', () => {
    const Constructor = Vue.extend(Jumbotron)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('h1.title').textContent)
      .toContain('PHONE NUMBER GENERATOR')
  })
})
