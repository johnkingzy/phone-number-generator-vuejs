import { mount } from 'vue-test-utils';
import sinon from 'sinon';
import axios from 'axios';
import Main from '@/components/Main';

jest.setTimeout(20000)

const response = {
  data: {
    numbers: [
      { id: 2, value: '081-6049122', timestamp: 1558637087195 },
      { id: 3, value: '081-0513661', timestamp: 1558637087195 },
      { id: 4, value: '081-5799992', timestamp: 1558637087195 }],
    message: '10  numbers was generated successfully'
  }
};

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({
    data: {
      numbers: [
        { id: 2, value: '081-6049122', timestamp: 1558637087195 },
        { id: 3, value: '081-0513661', timestamp: 1558637087195 },
        { id: 4, value: '081-5799992', timestamp: 1558637087195 }],
      message: '10  numbers was generated successfully'
    }
  }))
}));

// jest.mock('AsyncComputed');

const removePrefix = jest.fn(obj => Number(obj.value.replace(/-/g, '')));

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
    expect(wrapper.vm.totalCount).toBe(3);
    expect(wrapper.vm.numbers.length).toBe(3);
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
    const result = await wrapper.vm.generateNumbers();
    expect(result).toEqual(response);
    expect(wrapper.vm.numbers).toEqual(response.data.numbers);
    expect(wrapper.vm.totalCount).toEqual(response.data.numbers.length);
    expect(wrapper.vm.loading).toBe(false);
    expect(axios.get).toHaveBeenCalled();
    done();
  });

  it('should set error messages and disbale loading bar, if an error occured', (done) => {
    axios.get.mockImplementation(() => Promise.reject());
    const result = wrapper.vm.generateNumbers();
    result
      .then(() => {})
      .catch(() => {
        expect(wrapper.vm.loading).toBe(false);
        expect(wrapper.vm.error).toEqual('An error occured, try refreshing the page');
        done();
      })
  })
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
      const result = wrapper.vm.removePrefix(response.data.numbers[0]);
      expect(result).toEqual(removePrefix(expected));
    });
  });

  describe('Sort Method', () => {
    it('should return the default data if sorting order value is null', () => {
      const result = wrapper.vm.sort(response.data.numbers);
      expect(result).toEqual(response.data.numbers);
    });

    it('should sort the numbers in ascending order', () => {
      const result = wrapper.vm.sort(response.data.numbers, 'ascending');
      expect(result)
        .toEqual(response.data.numbers.sort(
          (a, b) => removePrefix(a) - removePrefix(b))
        );
    });

    it('should sort the numbers in descending order', () => {
      const result = wrapper.vm.sort(response.data.numbers, 'descending');
      expect(result)
        .toEqual(response.data.numbers.sort(
          (a, b) => removePrefix(b) - removePrefix(a))
        );
    });

    it('should sort the numbers by most recent', () => {
      const result = wrapper.vm.sort(response.data.numbers, 'recent');
      expect(result)
        .toEqual(response.data.numbers.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        );
    });
  });
});
