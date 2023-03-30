export default {
  contactHousing(context, data) {
    const newRequest = {
      id: new Date().toISOString(),
      housingId: data.housingId,
      email: data.email,
      message: data.message,
    };
    context.commit('addRequest', newRequest);
  },
};
