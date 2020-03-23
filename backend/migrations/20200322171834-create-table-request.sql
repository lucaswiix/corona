
-- +migrate Up
SET SCHEMA 'public';

CREATE TABLE request (
  key BIGSERIAL PRIMARY KEY,
  user_account_key BIGINT CONSTRAINT request_user_account_key_fk NOT NULL,
  voluntary_user_account_key BIGINT CONSTRAINT request_voluntary_user_account_key_fk NULL,
  description VARCHAR(255),
  status SMALLINT NOT NULL,
  evaluation SMALLINT NULL,
  priority SMALLINT NOT NULL,
  latitude varchar(40) NOT NULL,
  longitude varchar(40) NOT NULL,  
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  updated_at TIMESTAMP DEFAULT now() NOT NULL,
  FOREIGN KEY (user_account_key) REFERENCES user_account(key),
  FOREIGN KEY (voluntary_user_account_key) REFERENCES user_account(key)
  );

CREATE INDEX request_idx1 on request (user_account_key);
CREATE INDEX request_idx2 on request (voluntary_user_account_key);
CREATE INDEX request_idx3 on request (status);

GRANT SELECT, INSERT, DELETE, UPDATE ON request TO wiix;
GRANT USAGE ON request_key_seq TO wiix;

-- +migrate Down
SET SCHEMA 'public';

DROP TABLE IF EXISTS "request";