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
  `duration` INT NULL,
  `subject` VARCHAR(45) NULL,
  `location` VARCHAR(125) NULL,
  `student` VARCHAR(45) NULL,
  `notes` TEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `subject`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `subject` ;

CREATE TABLE IF NOT EXISTS `subject` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Student`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Student` ;

CREATE TABLE IF NOT EXISTS `Student` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `grade`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `grade` ;

CREATE TABLE IF NOT EXISTS `grade` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `grade` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `address`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `address` ;

CREATE TABLE IF NOT EXISTS `address` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `street` VARCHAR(45) NULL,
  `street2` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,
  `zip` VARCHAR(45) NULL,
  `url` VARCHAR(45) NULL,
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
INSERT INTO `education_event` (`id`, `date`, `duration`, `subject`, `location`, `student`, `notes`) VALUES (1, '2022-09-02', 30, 'Math', 'Home', 'Billy', 'Covered Algebra, \"Algebra I\" pg 17');
INSERT INTO `education_event` (`id`, `date`, `duration`, `subject`, `location`, `student`, `notes`) VALUES (2, '2022-09-03', 45, 'Social Studies', 'Home', 'Timmy', 'Introduction to ancient Egyptian culture.');
INSERT INTO `education_event` (`id`, `date`, `duration`, `subject`, `location`, `student`, `notes`) VALUES (3, '2022-09-01', 60, 'Language Arts', 'Home', 'Sally', 'Spelling');
INSERT INTO `education_event` (`id`, `date`, `duration`, `subject`, `location`, `student`, `notes`) VALUES (4, '2022-08-31', 30, 'Science', 'Kansas City Science Center', 'Billy', 'Homeschool Event Day, special focus on gravitational forces.');
INSERT INTO `education_event` (`id`, `date`, `duration`, `subject`, `location`, `student`, `notes`) VALUES (5, '2022-08-31', 45, 'Reading', 'Home', 'Timmy', 'Read 33 pages of \"The Hobbit\".');
INSERT INTO `education_event` (`id`, `date`, `duration`, `subject`, `location`, `student`, `notes`) VALUES (6, '2022-08-31', 60, 'Elective', 'Missouri Maple Leaf Conservation Area', 'Sally', 'Recorded sightings of each animal spotted on trail hike. Discussed and Googled each sighting.');

COMMIT;

