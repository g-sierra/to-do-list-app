const events = {};

export const subscribe = (event, handler) => {
  if (!events[event]) events[event] = [];
  events[event].push(handler);
};

export const publish = (event, data) => {
  if (!events[event]) return;
  events[event].forEach((handler) => handler(data));
};
