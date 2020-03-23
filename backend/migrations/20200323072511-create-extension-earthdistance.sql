
-- +migrate Up
SET SCHEMA 'public';
CREATE EXTENSION IF NOT EXISTS cube;
CREATE EXTENSION IF NOT EXISTS earthdistance;

-- +migrate Down
SET SCHEMA 'public';
DROP EXTENSION IF EXISTS cube;
DROP EXTENSION IF EXISTS earthdistance;
