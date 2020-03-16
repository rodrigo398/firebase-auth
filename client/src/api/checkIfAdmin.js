// checks if the current user (based on firebase token) is an admin

import axios from "axios";

const checkIfAdmin = async idToken => {
  const headers = {
    Authorization: idToken
  };

  const response = await axios
    .get(`${process.env.SERVICES_URI}/api/admin_only`, {
      headers
    })
    .catch(e => e.response);

  return response.status === 200;
};

export default checkIfAdmin;
