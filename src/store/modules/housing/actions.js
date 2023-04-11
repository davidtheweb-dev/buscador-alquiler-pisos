export default {
  async registerHousing(context, data) {
    const userId = context.rootGetters.userId;
    const housingData = {
      title: data.title,
      description: data.description,
      rate: data.rate,
      tags: data.tags,
    };

    const token = context.rootGetters.token;

    const response = await fetch(
      `https://student-rent-finder-default-rtdb.europe-west1.firebasedatabase.app/housing/${userId}.json?auth=${token}`,
      {
        method: 'PUT',
        body: JSON.stringify(housingData),
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      // TODO: error
    }

    context.commit('registerHousing', {
      ...housingData,
      id: userId,
    });
  },
  async loadHousing(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(
      `https://student-rent-finder-default-rtdb.europe-west1.firebasedatabase.app/housing.json`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Error inesperado al cargar las viviendas'
      );
      throw error;
    }

    const housing = [];

    for (const key in responseData) {
      const house = {
        id: key,
        title: responseData[key].title,
        description: responseData[key].description,
        rate: responseData[key].rate,
        tags: responseData[key].tags,
      };
      housing.push(house);
    }

    context.commit('setHousing', housing);
    context.commit('setFetchTimestamp');
  },
};
