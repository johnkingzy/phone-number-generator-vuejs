import { mount } from 'vue-test-utils';
import App from '@/App'
import Main from '@/components/Main'
import Jumbotron from '@/components/Jumbotron'

describe('App', () => {
  const wrapper = mount(App);
  it('should have the Jumbotron and Main as child components', () => {
    expect(wrapper.attributes().id).toBe('app');
    expect(wrapper.find(Main).exists()).toBe(true)
    expect(wrapper.find(Main).exists()).toBe(true)
    expect(wrapper.find(Jumbotron).exists()).toBe(true)
  })
});
