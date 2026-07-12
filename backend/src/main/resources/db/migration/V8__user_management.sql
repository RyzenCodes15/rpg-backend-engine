-- Add enabled column to users
ALTER TABLE users ADD COLUMN enabled BOOLEAN NOT NULL DEFAULT TRUE;

-- Insert default admin user
-- Password is 'admin123'
INSERT INTO users (id, username, email, password_hash, role, created_at, updated_at, enabled)
VALUES (
    gen_random_uuid(), 
    'admin', 
    'admin@rpgengine.com', 
    '$2b$12$AUIJ4Wkp1iXDLSxAbKuVBukOhohLwWZqAAmjijADb94ORp93VHOga', 
    'ADMIN', 
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP,
    TRUE
);
