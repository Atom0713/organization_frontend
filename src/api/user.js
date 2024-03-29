import {headers} from './headers'


export async function fetchUser() {
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/`, {
    method: "GET",
    headers: headers,
  });

  return response.json();
}


export async function fetchUserById(user_id) {
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/${user_id}`, {
    method: "GET",
    headers: headers,
  });

  return response.json();
}

export async function fetchUsersByRole(id) {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/user/role/${id}/`,
    {
      method: "GET",
      headers: headers,
    }
  );

  return response.json();
}

export async function addUser(body) {
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });

  return response.json();
}
