import { initializeApp, getApps, getApp, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getStorage, Storage } from 'firebase-admin/storage';

const serviceAccount = {
  projectId: "curious-bharat-e3c65",
  clientEmail: "firebase-adminsdk-fbsvc@curious-bharat-e3c65.iam.gserviceaccount.com",
  privateKey: `-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDIU+8bq4UbX2TA
b0yPfrNIuBhch5OL+Mf/sYAmPHRF9o+Wae0nBw21f/zPijnCxIH8PgKC1gQkKJT+
zXA1BhtZ+CVv8UCEFRqM+HeIkg/ohhse0HGxonVnzyqnG+TIJllPy04hA3BwYNw7
2WVSkmHSbJu8OwuAJclEk3MGOsKMmOOw+uANh49A59+8hX1lH+oLouShDe4odaXy
NQv6dmV+lzc2ekFaf8jbWwAVzT/tWFzblYcBP2T/i6WeplE6auYMjI+84Oa7u2Ot
TqZsxx0doxEIUHZfFwUgVtHr0ycgXJB2s+8+pMH4E735bJv75ekZ3WWxOfmVd5gt
upEB26QtAgMBAAECggEACYaaOSsPb4hT92WWrHOGWj5TMQhkxWD9WHG4w2vlAIdG
qsABng7TDoIi3XCRqhE9K03JW0gKsHh6JOEHRXIzcaef1uicwrS1/qWTAFX0g5m0
gPAOM/e8bitqK3UwJhQfjTCNV/sJb49fiy+decI9r6tovv57LJFynMjt84oh3A/h
WG5/7TGRMArd8ctnLXI8DC+JE1BwjHr4/ZEFqyOXHi2D3ze0mmC4RQCHyDXgrMlM
364kPkVa9qeMi9tF+SWAK2A58Za+gI8PcXbDm/q86xKSGFRzqKar29gLL0eOc86+
3Hvh6QRBNuVxXMHnf7jNNWVnDRsOaqOyDFCjOA5N4QKBgQDrLeFNe0DDxLKp145C
f4eoRAFciry/UnRIajMkVMEU1mZQCq+52WUdoFjZHvzR9SsyeoVwp4ne4xj2/UiS
ITTZiYJyeV1kj1kYaa1BOLjnRGhlRQtPl3Yvcjt5xvLBWrUc3+eVA492eLYxHgNK
xyqTOBcZaZoENKYp/GcATKxD4QKBgQDaEC4iJBOLbhLyqws4BISlD7y72Sg7PiAZ
XcQm3OcBZUZxK/+UEfPpdZ7dtsvBr0fnWCkxl/TVACSgKeoAolAqlGn9s5JrQhP7
lEg7C7vTLjMBUbjfmU6Wgexzxb0AcS+sy0hhCneV99imx1ZaW/Hd0+xzmEfXXr86
RDaZ9lJpzQKBgQDkO11IJVH/6vb8bs2HaV5MhNrRZW6xOaLR2AaTvpC22S7nhMdu
1DQWIVO4OiNe2tA2J8MyRdU98iR7Jej0r7crWhC3aWKiQZ9UWtIh1ptTDQdHKE9G
yZWPjAt+Lf3OeWoEgKKs8Yybi6A8YIUPX+PIhYmdRueKJ1IOsv1+w+n14QKBgQCk
DdI3Wz7dAgX9TVNWZIfKiqlqBbjvwRBzJQkCV+TvNtslH33bTxpaxGOt1+05HP6S
fNAZAIJwkPf9CyuCKJr5Pcjz1lpMmVzhQ7CHw48eFL7IukvE5NisALj8bIKBx6Wf
cRxV7YMEb38uEf/UYSH4yow0dxdtX1mso08Uy6067QKBgQDPvP+NL1rS6k2RlW5U
i3rCPmL+uYFU4hyKG2vG5zUE+X7oOEMl7IrbfMEz0gUxIVECLrP2E2+fywOl1QRg
428Xvwk1nT1ju70KmCGXJz5WXxt7aGzb/TfnXagp6LNVOGF+ip+UERSKDraA2rps
qc6uwBqCgh2iH4slxiVTSXJyAw==
-----END PRIVATE KEY-----`.replace(/\\n/g, '\n'),
};

let adminApp: App | null = null;
let firestoreDb: Firestore | null = null;
let storageBucket: any = null;

try {
  if (getApps().length === 0) {
    adminApp = initializeApp({
      credential: cert(serviceAccount),
      storageBucket: 'curious-bharat-e3c65.firebasestorage.app',
    });
  } else {
    adminApp = getApps()[0]!;
  }
  firestoreDb = getFirestore(adminApp);
  storageBucket = getStorage(adminApp).bucket();
  console.log('Firebase Admin initialized successfully with project:', serviceAccount.projectId);
} catch (err) {
  console.error('Failed to initialize Firebase Admin SDK:', err);
}

export { adminApp, firestoreDb, storageBucket };

