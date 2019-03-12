export const setMessageAction = messageText => ({
  type: 'SET_MESSAGE',
  message: messageText
});

export const setAsyncMessageAction = messageText => dispatch => (
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(), 2000);
    }).then(() => dispatch(setMessageAction(messageText)))
);
