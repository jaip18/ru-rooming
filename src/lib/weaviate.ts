import weaviate, { WeaviateClient } from 'weaviate-ts-client';

// Weaviate client configuration
const client: WeaviateClient = weaviate.client({
  scheme: 'https',
  host: process.env.WEAVIATE_URL || 'localhost:8080',
  apiKey: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY || ''),
  headers: {
    'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || '',
  },
});

// Schema for user profiles
const userProfileSchema = {
  class: 'UserProfile',
  description: 'User profiles for roommate matching',
  vectorizer: 'text2vec-openai',
  moduleConfig: {
    'text2vec-openai': {
      model: 'ada',
      modelVersion: '002',
      type: 'text',
    },
  },
  properties: [
    {
      name: 'userId',
      dataType: ['string'],
      description: 'Auth0 user ID',
    },
    {
      name: 'email',
      dataType: ['string'],
      description: 'User email address',
    },
    {
      name: 'name',
      dataType: ['string'],
      description: 'User full name',
    },
    {
      name: 'age',
      dataType: ['int'],
      description: 'User age',
    },
    {
      name: 'bio',
      dataType: ['text'],
      description: 'User bio/description',
    },
    {
      name: 'profileImage',
      dataType: ['string'],
      description: 'Profile image URL',
    },
    {
      name: 'city',
      dataType: ['string'],
      description: 'User city',
    },
    {
      name: 'neighborhood',
      dataType: ['string'],
      description: 'User neighborhood',
    },
    {
      name: 'coordinates',
      dataType: ['number[]'],
      description: 'Latitude and longitude coordinates',
    },
    {
      name: 'budgetMin',
      dataType: ['int'],
      description: 'Minimum budget',
    },
    {
      name: 'budgetMax',
      dataType: ['int'],
      description: 'Maximum budget',
    },
    {
      name: 'moveInDate',
      dataType: ['date'],
      description: 'Preferred move-in date',
    },
    {
      name: 'duration',
      dataType: ['string'],
      description: 'Lease duration preference',
    },
    {
      name: 'lifestyle',
      dataType: ['string[]'],
      description: 'Lifestyle preferences',
    },
    {
      name: 'habits',
      dataType: ['string[]'],
      description: 'Living habits',
    },
    {
      name: 'interests',
      dataType: ['string[]'],
      description: 'User interests',
    },
    {
      name: 'isActive',
      dataType: ['boolean'],
      description: 'Whether profile is active',
    },
    {
      name: 'createdAt',
      dataType: ['date'],
      description: 'Profile creation date',
    },
    {
      name: 'updatedAt',
      dataType: ['date'],
      description: 'Last update date',
    },
  ],
};

// Schema for matches
const matchSchema = {
  class: 'Match',
  description: 'Roommate matches and interactions',
  properties: [
    {
      name: 'user1Id',
      dataType: ['string'],
      description: 'First user ID',
    },
    {
      name: 'user2Id',
      dataType: ['string'],
      description: 'Second user ID',
    },
    {
      name: 'compatibility',
      dataType: ['number'],
      description: 'Compatibility score (0-100)',
    },
    {
      name: 'status',
      dataType: ['string'],
      description: 'Match status: pending, matched, rejected',
    },
    {
      name: 'swipeDirection',
      dataType: ['string'],
      description: 'Swipe direction: like, pass',
    },
    {
      name: 'createdAt',
      dataType: ['date'],
      description: 'Match creation date',
    },
  ],
};

// Schema for messages
const messageSchema = {
  class: 'Message',
  description: 'Chat messages between matched users',
  properties: [
    {
      name: 'senderId',
      dataType: ['string'],
      description: 'Message sender user ID',
    },
    {
      name: 'receiverId',
      dataType: ['string'],
      description: 'Message receiver user ID',
    },
    {
      name: 'content',
      dataType: ['text'],
      description: 'Message content',
    },
    {
      name: 'isRead',
      dataType: ['boolean'],
      description: 'Whether message is read',
    },
    {
      name: 'createdAt',
      dataType: ['date'],
      description: 'Message creation date',
    },
  ],
};

// Initialize schemas
export const initializeSchemas = async () => {
  try {
    // Check if schemas exist and create if they don't
    const existingClasses = await client.schema.getter().do();
    const existingClassNames = existingClasses.classes?.map(c => c.class) || [];

    if (!existingClassNames.includes('UserProfile')) {
      await client.schema.classCreator().withClass(userProfileSchema).do();
      console.log('✅ UserProfile schema created');
    }

    if (!existingClassNames.includes('Match')) {
      await client.schema.classCreator().withClass(matchSchema).do();
      console.log('✅ Match schema created');
    }

    if (!existingClassNames.includes('Message')) {
      await client.schema.classCreator().withClass(messageSchema).do();
      console.log('✅ Message schema created');
    }

    console.log('🎉 All schemas initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing schemas:', error);
    throw error;
  }
};

export default client;
