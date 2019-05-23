import { mount } from 'vue-test-utils';
import sinon from 'sinon';
import axios from 'axios';
import Main from '@/components/Main';

jest.setTimeout(20000)

const response = {
  data: {
    numbers: [{
      id: 1,
      value: '080-25463335',
      time: 1558570810029
    }],
    message: '10 numbers was generated successfully'
  }
};

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({
    data: {
      numbers: [
        {
          id: 1,
          value: '080-25463335',
          time: 1558570810029
        }
      ],
      message: '10 numbers was generated successfully'
    }
  }))
}));

describe('Main.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Main);
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('should have the following default values', () => {
    expect(wrapper.vm.currentPage).toBe(1);
    expect(wrapper.vm.limit).toBe(10);
    expect(wrapper.vm.totalCount).toBe(1);
    expect(wrapper.vm.numbers.length).toBe(1);
  });

  it('should generate numbers on component mount', (done) => {
    const context = {
      generateNumbers: jest.fn()
    }
    const generateNumbersSpy = sinon.spy(context, 'generateNumbers');
    Main.mounted.call(context);
    expect(generateNumbersSpy).toHaveBeenCalled();
    generateNumbersSpy.restore()
    done();
  });

  it('should make a get request to get generated numbers', async (done) => {
    try {
      const result = await wrapper.vm.generateNumbers();
      expect(result).toEqual(response);
      expect(wrapper.vm.numbers).toEqual(response.data.numbers);
      expect(wrapper.vm.totalCount).toEqual(response.data.numbers.length);
      expect(axios.get).toBeCalledWith('http://localhost:8000/api/numbers');
      done();
    } catch (error) {
      console.log('error', error);
      done();
    }
  });

  it('should have the pagination buttons', () => {
    expect(wrapper.contains('nav.pagination')).toBe(true)
  });

  it('should contain the generate number button', () => {
    const generateNumbersButton = wrapper.find('nav.pagination ul.pagination-list .generate');
    expect(generateNumbersButton.exists()).toBe(true);
  })

  describe('Pagination button', () => {
    it('should navigate to next page, when user clicks on the Next Page button', () => {
      const paginationNextButton = wrapper.find('nav.pagination button.pagination-next');
      expect(wrapper.vm.currentPage).toBe(1);
      paginationNextButton.trigger('click');
      expect(wrapper.vm.currentPage).toBe(2);
    });

    it('should navigate to previous page, when user clicks on the Previous Page button', () => {
      const paginationNextButton = wrapper.find('nav.pagination button.pagination-next');
      const paginationPreviousButton = wrapper.find('nav.pagination button.pagination-previous');
      // Go to Page 2
      paginationNextButton.trigger('click');
      expect(wrapper.vm.currentPage).toBe(2);

      // then Go back to Page 1
      paginationPreviousButton.trigger('click');
      expect(wrapper.vm.currentPage).toBe(1);
    });
  });

  describe('Sort button', () => {
    it('should sort the numbers ascending and descending', () => {
      const ascendingButton = wrapper.find('nav.pagination ul.pagination-list .ascending');
      const descendingButton = wrapper.find('nav.pagination ul.pagination-list .descending');
      // Sort the data in ascending order.
      ascendingButton.trigger('click');
      expect(wrapper.vm.order).toBe('ascending');

      // Sort the data in descending order.
      descendingButton.trigger('click');
      expect(wrapper.vm.order).toBe('descending');
    });
  });

  describe('Generate Button', () => {
    it('should call the generate number function', (done) => {
      const generateNumbersButton = wrapper.find('nav.pagination ul.pagination-list .generate');
      const generateNumbers = jest.fn();
      wrapper.vm.generateNumbers = generateNumbers;

      const generateNumbersSpy = sinon.spy(wrapper.vm, 'generateNumbers');

      generateNumbersButton.trigger('click');

      expect(generateNumbersSpy).toHaveBeenCalled();
      generateNumbersSpy.restore();
      done();
    });
  });

  describe('Remove Prefix Method', () => {
    it('should remove the prefix from the phone number value', () => {
      // Deep clone array
      const expected = JSON.parse(JSON.stringify(response.data.numbers))[0];
      expected.value = 8025463335;
      const result = wrapper.vm.removePrefix(response.data.numbers[0]);
      expect(result).toBe(expected.value);
    });
  });

  describe('Sort Method', () => {
    it('should return the default data if order value is passed', () => {
      const result = wrapper.vm.sort(response.data.numbers);
      expect(result).toBe(response.data.numbers);
    })
  })
});
