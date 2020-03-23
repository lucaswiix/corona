
-- +migrate Up
SET SCHEMA 'public';

CREATE TABLE user_account (
  key BIGSERIAL PRIMARY KEY,
  name VARCHAR(255),
  cpf VARCHAR(11),
  birthday DATE NULL,
  email VARCHAR(255)
    CONSTRAINT user_email
    UNIQUE,
  type SMALLINT NOT NULL,
  phone VARCHAR(50)
    CONSTRAINT user_phone
    UNIQUE,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  updated_at TIMESTAMP DEFAULT now() NOT NULL
);

CREATE INDEX user_idx1 on user_account (email);
CREATE INDEX user_idx3 on user_account (phone);

GRANT SELECT, INSERT, DELETE, UPDATE ON user_account TO wiix;
GRANT USAGE ON user_account_key_seq TO wiix;


-- +migrate Down

SET SCHEMA 'public';

DROP TABLE IF EXISTS user_account;