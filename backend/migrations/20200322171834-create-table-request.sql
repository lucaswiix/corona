
-- +migrate Up
CREATE TABLE `request` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `voluntary_id` int,
  `description` varchar(255) NULL,
  `status` smallint NOT NULL,
  `score` smallint NULL,
  `priority` smallint NOT NULL,
  `latitude` varchar(255) NOT NULL,
  `longitude` varchar(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT now() NOT NULL,
  `updated_at` TIMESTAMP DEFAULT now() NOT NULL,
  PRIMARY KEY (`key`),
  FOREIGN KEY (`user_id`) REFERENCES user(`key`),
  FOREIGN KEY (`voluntary_id`) REFERENCES user(`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- +migrate Down
DROP TABLE request;