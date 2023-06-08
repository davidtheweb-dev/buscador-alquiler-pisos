import { useAuthStore } from '../auth/AuthStore';

export default {
  async addRequest(newRequestData) {
    const newRequest = {
      email: newRequestData.email,
      message: newRequestData.message,
    };

    const response = await fetch(
      `https://student-rent-finder-default-rtdb.europe-west1.firebasedatabase.app/requests/${newRequestData.housingId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Error inesperado al enviar el mensaje');
      throw error;
    }

    newRequest.id = responseData.name;
    newRequest.housingId = newRequestData.housingId;

    this.requests.push(newRequest);
  },

  async fetchRequests() {
    const authStore = useAuthStore();
    const userId = authStore.getUserId;
    const token = authStore.getToken;

    const response = await fetch(
      `https://student-rent-finder-default-rtdb.europe-west1.firebasedatabase.app/requests/${userId}.json?auth=${token}`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Error inesperado al cargar los mensajes');
      throw error;
    }

    const requests = [];
    for (const key in responseData) {
      const request = {
        id: key,
        housingId: userId,
        email: responseData[key].email,
        message: responseData[key].message,
      };
      requests.push(request);
    }

    this.requests = requests;
  },
};
