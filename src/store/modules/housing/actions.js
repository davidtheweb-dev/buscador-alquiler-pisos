export default {
  registerHousing(context, data) {
    const housingData = {
      id: context.rootGetters.userId,
      title: data.title,
      description: data.description,
      rate: data.rate,
      tags: data.tags,
    };

    context.commit('registerHousing', housingData);
  },
};
