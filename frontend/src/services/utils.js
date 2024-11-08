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

