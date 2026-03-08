/**
 * Script to update the `skills` document in Firestore using the Admin SDK.
 *
 * Usage:
 * 1. Install dependency (once): `npm install firebase-admin`
 * 2. In Firebase Console, create a service account key for your project
 *    and download the JSON file (DO NOT commit it to git).
 * 3. Set env var pointing to the key, e.g.:
 *      export FIREBASE_SERVICE_ACCOUNT_PATH="./serviceAccountKey.json"
 * 4. Run the script:
 *      npx ts-node scripts/updateSkills.ts
 *
 * This script:
 * - Finds the first document in the `skills` collection (same assumption as your app)
 * - Updates it with new hard/soft skills and structured categories
 */

import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'node:fs';
import path from 'node:path';

const serviceAccountPath =
  process.env.FIREBASE_SERVICE_ACCOUNT_PATH ||
  path.join(process.cwd(), 'serviceAccountKey.json');

if (!fs.existsSync(serviceAccountPath)) {
  console.error(
    `Service account file not found at: ${serviceAccountPath}. ` +
    'Set FIREBASE_SERVICE_ACCOUNT_PATH or place serviceAccountKey.json in project root.'
  );
  process.exit(1);
}

const serviceAccount = JSON.parse(
  fs.readFileSync(serviceAccountPath, 'utf8')
);

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const db = getFirestore();

const newSkillsData = {
  hardSkills: [
    { name: 'JavaScript', category: 'languages' },
    { name: 'TypeScript', category: 'languages' },
    { name: 'HTML5', category: 'languages' },
    { name: 'CSS3', category: 'languages' },
    { name: 'React.js', category: 'frameworks' },
    { name: 'Next.js', category: 'frameworks' },
    { name: 'Git', category: 'tools' },
    { name: 'Webpack', category: 'tools' },
    { name: 'Vite', category: 'tools' },
    { name: 'Docker', category: 'tools' },
    { name: 'Node.js', category: 'backend' },
    { name: 'GraphQL', category: 'backend' },
  ],
  softSkills: [
    'Analytical mind',
    'Creative thinking',
    'Attention to detail',
    'Conflict management',
    'Mentoring & onboarding',
    'Collaboration in international teams',
  ],
};

async function updateSkills() {
  const snapshot = await db.collection('skills').get();

  if (snapshot.empty) {
    console.log(
      'No documents found in `skills` collection. Creating a new one...'
    );
    const docRef = await db.collection('skills').add(newSkillsData);
    console.log('Created new skills document with ID:', docRef.id);
    return;
  }

  const docRef = snapshot.docs[0].ref;

  await docRef.set(newSkillsData, { merge: true });
  console.log('Updated skills document with ID:', docRef.id);
}

updateSkills()
  .then(() => {
    console.log('Skills update completed.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Failed to update skills:', err);
    process.exit(1);
  });

