-- Create table
CREATE TABLE IF NOT EXISTS organisations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  logo_url TEXT,
  mission_statement VARCHAR(200),
  active BOOLEAN NOT NULL
);

-- Create table
CREATE TABLE IF NOT EXISTS people (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  user_type VARCHAR(10) NOT NULL CHECK (user_type IN ('admin', 'primary', 'secondary')),
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(100),
  password VARCHAR(100) NOT NULL,
  org_id INTEGER REFERENCES organisations (id),
  job_title VARCHAR(80),
  last_login BIGINT,
  active BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS tags_organisations (
 tags_id INTEGER REFERENCES tags (id),
 organisations_id INTEGER REFERENCES organisations (id)
);
