-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Verify extensions are enabled
SELECT extname FROM pg_extension WHERE extname IN ('uuid-ossp', 'postgis', 'pgcrypto');
