import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

const authenticateAsAdmin = async () => {
  try {
    await pb.admins.authWithPassword('admin@example.com', 'your-admin-password');
    console.log('Admin authenticated successfully');
  } catch (error) {
    console.error('Error while authenticating as admin:', error);
  }
};

const createCollections = async () => {
  await authenticateAsAdmin();

  // Tworzenie kolekcji students
  try {
    await pb.collections.create({
      name: 'students',
      schema: [
        {
          name: 'imie',
          type: 'text',
          required: true
        },
        {
          name: 'nazwisko',
          type: 'text',
          required: true
        }
      ]
    });
    console.log('Kolekcja students została utworzona');
  } catch (error) {
    console.error('Error creating students collection:', error);
  }

  // Tworzenie kolekcji grades
  try {
    await pb.collections.create({
      name: 'grades',
      schema: [
        {
          name: 'studentId',
          type: 'relation',
          options: {
            collectionId: 'students',
            cascadeDelete: true
          },
          required: true
        },
        {
          name: 'przedmiot',
          type: 'text',
          required: true
        },
        {
          name: 'ocena',
          type: 'number',
          required: true
        }
      ]
    });
    console.log('Kolekcja grades została utworzona');
  } catch (error) {
    console.error('Error creating grades collection:', error);
  }
};

createCollections();
