-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema homeschoolhoursdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `homeschoolhoursdb` ;

-- -----------------------------------------------------
-- Schema homeschoolhoursdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `homeschoolhoursdb` DEFAULT CHARACTER SET utf8 ;
USE `homeschoolhoursdb` ;

-- -----------------------------------------------------
-- Table `education_event`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `education_event` ;

CREATE TABLE IF NOT EXISTS `education_event` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATETIME NULL,
  `duration` VARCHAR(45) NULL,
  `subject` VARCHAR(45) NULL,
  `location` VARCHAR(45) NULL,
  `student` VARCHAR(45) NULL,
  `notes` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS hshuser@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'hshuser'@'localhost' IDENTIFIED BY 'hshuser';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'hshuser'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `education_event`
-- -----------------------------------------------------
START TRANSACTION;
USE `homeschoolhoursdb`;
INSERT INTO `education_event` (`id`, `date`, `duration`, `subject`, `location`, `student`, `notes`) VALUES (1, '2022-09-02', '30', 'Math', 'Home', 'Billy', 'Covered Algebra, \"Algebra I\" pg 17');

COMMIT;

