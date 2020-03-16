const USER_200 = "USER_200";
const USER_401 = "USER_401";

const firebaseAdminMock = {
  auth: () => {
    return {
      getUser: userId => {
        if (userId === USER_200) {
          return {
            customClaims: { admin: true }
          };
        } else {
          return {};
        }
      },
      verifyIdToken: idToken => {
        if (idToken === "GIVE_ME_200") {
          return { uid: USER_200 };
        } else if (idToken === "GIVE_ME_401") {
          return { uid: USER_401 };
        }
      }
    };
  }
};

export default firebaseAdminMock;
