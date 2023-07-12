import { useAuthStore } from '../auth/AuthStore';

export default {
  async addHousing(newHousingData) {
    const authStore = useAuthStore();
    const userId = authStore.getUserId;
    const token = authStore.getToken;

    const newHousing = {
      title: newHousingData.title,
      description: newHousingData.description,
      rate: newHousingData.rate,
      isIncluded: newHousingData.isIncluded,
      extraCosts: newHousingData.extraCosts,
      area: newHousingData.area,
      address: newHousingData.address,
      municipality: newHousingData.municipality,
      postalCode: newHousingData.postalCode,
      startMonth: newHousingData.startMonth,
      endMonth: newHousingData.endMonth,
      genre: newHousingData.genre,
      isShared: newHousingData.isShared,
      numPartners: newHousingData.numPartners,
      freePlaces: newHousingData.freePlaces,
      typeRoom: newHousingData.typeRoom,
      typeBed: newHousingData.typeBed,
      isSmoke: newHousingData.isSmoke,
      isPet: newHousingData.isPet,
      instagram: newHousingData.instagram,
      whatsapp: newHousingData.whatsapp,
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

  async deleteHousing() {
    const authStore = useAuthStore();
    const userId = authStore.getUserId;
    const token = authStore.getToken;

    const response = await fetch(
      `https://student-rent-finder-default-rtdb.europe-west1.firebasedatabase.app/housing/${userId}.json?auth=${token}`,
      {
        method: 'DELETE',
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      // TODO: error
    }

    this.fetchHousing(true);
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
        isIncluded: responseData[key].isIncluded,
        extraCosts: responseData[key].extraCosts,
        area: responseData[key].area,
        address: responseData[key].address,
        municipality: responseData[key].municipality,
        postalCode: responseData[key].postalCode,
        startMonth: responseData[key].startMonth,
        endMonth: responseData[key].endMonth,
        genre: responseData[key].genre,
        isShared: responseData[key].isShared,
        numPartners: responseData[key].numPartners,
        freePlaces: responseData[key].freePlaces,
        typeRoom: responseData[key].typeRoom,
        typeBed: responseData[key].typeBed,
        isSmoke: responseData[key].isSmoke,
        isPet: responseData[key].isPet,
        instagram: responseData[key].instagram,
        whatsapp: responseData[key].whatsapp,
        tags: responseData[key].tags,
      };
      housing.push(house);
    }

    this.housing = housing;
    this.lastFetch = new Date().getTime();
  },
};
