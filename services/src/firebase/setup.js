import admin from "firebase-admin";

import accessEnv from "#root/helpers/accessEnv";

const FIREBASE_SDK_AUTH_PROVIDER_X509_CERT_URL = accessEnv(
  "FIREBASE_SDK_AUTH_PROVIDER_X509_CERT_URL"
);
const FIREBASE_SDK_AUTH_URI = accessEnv("FIREBASE_SDK_AUTH_URI");
const FIREBASE_SDK_DB_URL = accessEnv("FIREBASE_SDK_DB_URL");
const FIREBASE_SDK_EMAIL = accessEnv("FIREBASE_SDK_EMAIL");
const FIREBASE_SDK_ID = accessEnv("FIREBASE_SDK_ID");
const FIREBASE_SDK_PRIVATE_KEY = accessEnv("FIREBASE_SDK_PRIVATE_KEY").replace(
  /\\n/g,
  "\n"
);
const FIREBASE_SDK_PRIVATE_KEY_ID = accessEnv("FIREBASE_SDK_PRIVATE_KEY_ID");
const FIREBASE_SDK_PROJECT_ID = accessEnv("FIREBASE_SDK_PROJECT_ID");
const FIREBASE_SDK_TYPE = accessEnv("FIREBASE_SDK_TYPE");
const FIREBASE_SDK_TOKEN_URI = accessEnv("FIREBASE_SDK_TOKEN_URI");
const FIREBASE_SDK_X509_CERT_URL = accessEnv("FIREBASE_SDK_X509_CERT_URL");

admin.initializeApp({
  credential: admin.credential.cert({
    auth_provider_x509_cert_url: FIREBASE_SDK_AUTH_PROVIDER_X509_CERT_URL,
    auth_uri: FIREBASE_SDK_AUTH_URI,
    client_email: FIREBASE_SDK_EMAIL,
    client_id: FIREBASE_SDK_ID,
    client_x509_cert_url: FIREBASE_SDK_X509_CERT_URL,
    private_key: FIREBASE_SDK_PRIVATE_KEY,
    private_key_id: FIREBASE_SDK_PRIVATE_KEY_ID,
    project_id: FIREBASE_SDK_PROJECT_ID,
    token_uri: FIREBASE_SDK_TOKEN_URI,
    type: FIREBASE_SDK_TYPE
  }),
  databaseURL: FIREBASE_SDK_DB_URL
});
