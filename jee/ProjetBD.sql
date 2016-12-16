CREATE DATABASE `projet` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
CREATE TABLE `user` (
  `iduser` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(45) CHARACTER SET utf8 NOT NULL,
  `role` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lastname` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `surname` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`iduser`),
  UNIQUE KEY `login_UNIQUE` (`login`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


INSERT INTO `projet`.`user`
(`login`,`password`,`role`,`lastname`,`surname`)
VALUES
('Superman', 'pwd', 'USER', 'Kent', 'Clark');
INSERT INTO `projet`.`user`
(`login`,`password`,`role`,`lastname`,`surname`)
VALUES
('Wonderwoman', 'pwd', 'ADMIN', 'Prince', 'Diana');
INSERT INTO `projet`.`user`
(`login`,`password`,`role`,`lastname`,`surname`)
VALUES
('Batman', 'pwd', 'user', 'Wane', 'Bruce');

