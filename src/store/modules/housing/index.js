import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      housing: [
        {
          id: '1',
          title: 'Cubilia habitant ante taciti',
          tags: ['LGTB friendly', 'Baño privado', 'Admite parejas'],
          description:
            'Quis aenean mattis fermentum lacinia molestie pellentesque, dui dictumst libero gravida potenti tincidunt, venenatis nullam elementum.',
          rate: 350,
        },
        {
          id: '2',
          title: 'Lacinia curae facilisis dapibus',
          tags: ['LGTB friendly', 'Admite parejas'],
          description:
            'Lorem ipsum dolor sit amet consectetur adipiscing elit mollis viverra elementum turpis vel, augue fames himenaeos sodales porttitor nibh.',
          rate: 400,
        },
      ],
    };
  },
  mutations,
  actions,
  getters,
};
