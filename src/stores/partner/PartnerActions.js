import { useAuthStore } from '../auth/AuthStore';

export default {
  async addPartner(newPartnerData) {
    const authStore = useAuthStore();
    const userId = authStore.getUserId;
    const token = authStore.getToken;

    const newPartner = {
      title: newPartnerData.title,
      description: newPartnerData.description,
      genre: newPartnerData.genre,
      rate: newPartnerData.rate,
      area: newPartnerData.area,
      startMonth: newPartnerData.startMonth,
      monthsDuration: newPartnerData.monthsDuration,
      isShared: newPartnerData.isShared,
      numPartners: newPartnerData.numPartners,
      freePlaces: newPartnerData.freePlaces,
      typeRoom: newPartnerData.typeRoom,
      typeBed: newPartnerData.typeBed,
      isSmoke: newPartnerData.isSmoke,
      isPet: newPartnerData.isPet,
      instagram: newPartnerData.instagram,
      whatsapp: newPartnerData.whatsapp,
      tags: newPartnerData.tags,
    };

    const response = await fetch(
      `https://student-rent-finder-default-rtdb.europe-west1.firebasedatabase.app/partner/${userId}.json?auth=${token}`,
      {
        method: 'PUT',
        body: JSON.stringify(newPartner),
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      // TODO: error
    }

    this.partner.push({
      ...newPartner,
      id: userId,
    });
  },

  async deletePartner() {
    const authStore = useAuthStore();
    const userId = authStore.getUserId;
    const token = authStore.getToken;

    const response = await fetch(
      `https://student-rent-finder-default-rtdb.europe-west1.firebasedatabase.app/partner/${userId}.json?auth=${token}`,
      {
        method: 'DELETE',
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      // TODO: error
    }

    this.fetchPartner(true);
  },

  async fetchPartner(forceRefresh) {
    if (!forceRefresh && !this.getShouldUpdate) {
      return;
    }

    const response = await fetch(
      `https://student-rent-finder-default-rtdb.europe-west1.firebasedatabase.app/partner.json`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Error inesperado al cargar los compañeros');
      throw error;
    }

    const partner = [];
    for (const key in responseData) {
      const partn = {
        id: key,
        title: responseData[key].title,
        description: responseData[key].description,
        genre: responseData[key].genre,
        rate: responseData[key].rate,
        area: responseData[key].area,
        startMonth: responseData[key].startMonth,
        monthsDuration: responseData[key].monthsDuration,
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
      partner.push(partn);
    }

    this.partner = partner;
    this.lastFetch = new Date().getTime();
  },
};
