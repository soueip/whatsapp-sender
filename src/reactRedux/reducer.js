const initialState = {
  contact: "",
  device: "",
};

export const contactReducer = (state = initialState, action) => {
  try {
    switch (action.type) {
      case "SETCONTACT":
        return {
          ...initialState,
          contact: action.payload,
        };
      case "SETDEVICE":
        return {
          ...initialState,
          device: action.payload,
        };
      default:
        return state;
    }
  } catch (err) {
    console.log(err);
  }
};
