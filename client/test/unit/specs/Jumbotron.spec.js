import Vue from 'vue'
import Jumbotron from '@/components/Jumbotron'

describe('Jumbotron.vue', () => {
  it('should display a title', () => {
    const Constructor = Vue.extend(Jumbotron)
    const vm = new Constructor().$mount()
    expect(
      vm.$el
        .querySelector('div.title div:nth-child(2) > strong:first-child')
        .textContent)
      .toContain('Phone');
    expect(
      vm.$el
        .querySelector('div.title div:nth-child(2) > strong:nth-child(2)')
        .textContent)
      .toContain('Number');
    expect(
      vm.$el
        .querySelector('div.title div:nth-child(2) > strong:nth-child(3)')
        .textContent)
      .toContain('Generator');
  })
})
