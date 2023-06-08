import { useAuthStore } from '../auth/AuthStore';

export default {
  async registerHousing(newHousingData) {
    const authStore = useAuthStore();
    const userId = authStore.getUserId;
    const token = authStore.getToken;

    const newHousing = {
      title: newHousingData.title,
      description: newHousingData.description,
      rate: newHousingData.rate,
      tags: newHousingData.tags,
    };

    const response = await fetch(
      `https://student-rent-finder-default-rtdb.europe-west1.firebasedatabase.app/housing/${userId}.json?auth=${token}`,
      {
        method: 'PUT',
        body: JSON.stringify(newHousing),
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      // TODO: error
    }

    this.housing.push({
      ...newHousing,
      id: userId,
    });
  },

  async fetchHousing(forceRefresh) {
    if (!forceRefresh && !this.getShouldUpdate) {
      return;
    }

    const response = await fetch(
      `https://student-rent-finder-default-rtdb.europe-west1.firebasedatabase.app/housing.json`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Error inesperado al cargar las viviendas');
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

    this.housing = housing;
    this.lastFetch = new Date().getTime();
  },
};
