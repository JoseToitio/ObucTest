export function getUser() {
  const user = localStorage.getItem('user');

  return JSON.parse(user);
}


export function configToken() {
  const user = getUser();
  if (!user) {
    return {};
  }
  return {
    headers: {
      'Authorization': user.token,
    },
  };
}

export const initialData = {
  columns: {
    pending: {
      name: "To do",
      items: [
      ],
    },
    inProgress: {
      name: "In Progress",
      items: [
      ],
    },
    completed: {
      name: "Completed",
      items: [],
    },
  },
};