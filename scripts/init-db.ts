import client, { initializeSchemas } from './src/lib/weaviate';

async function initializeDatabase() {
  try {
    console.log('🚀 Initializing Weaviate database...');
    
    // Initialize schemas
    await initializeSchemas();
    
    console.log('✅ Database initialization completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

// Run initialization
initializeDatabase();
