
-- +migrate Up
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL UNIQUE,
  `phone` varchar(100) NOT NULL UNIQUE,
  `type` smallint NOT NULL,
  `created_at` TIMESTAMP DEFAULT now() NOT NULL,
  `updated_at` TIMESTAMP DEFAULT now() NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- +migrate Down
DROP TABLE User;