// turns current user (based on firebase token) into an admin

import axios from "axios";

const becomeAdmin = async idToken => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: idToken
  };

  const response = await axios.patch(
    `${process.env.SERVICES_URI}/api/become_admin`,
    {},
    {
      headers
    }
  );

  return response;
};

export default becomeAdmin;
