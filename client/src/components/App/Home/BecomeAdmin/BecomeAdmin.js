import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "#components/shared/AuthContext";
import Button from "#components/shared/Button";
import becomeAdmin from "#root/api/becomeAdmin";
import checkIfAdmin from "#root/api/checkIfAdmin";

const BecomeAdmin = () => {
  const { idToken } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await checkIfAdmin(idToken);

      if (response === false) {
        setIsAdmin(false);
      } else {
        setIsAdmin(true);
      }
    })();
  }, []);

  if (isAdmin === null) {
    return null;
  }

  const handleBecomeAdmin = async () => {
    setIsLoading(true);
    const response = await becomeAdmin(idToken);

    console.log(response);

    setIsLoading(false);

    if (response.status === 200) {
      setIsAdmin(true);
    }
  };

  return !isAdmin ? (
    <Button onClick={handleBecomeAdmin}>
      {isLoading ? "Becoming Admin..." : "Become Admin"}
    </Button>
  ) : null;
};

export default BecomeAdmin;
