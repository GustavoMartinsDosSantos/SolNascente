# SolNascente
Trabalho realizado para a matéria de Banco de Dados I

O problema proposto é criar um sistema de gerenciamento de banco de dados com algumas funcionalidades básicas, simulando um sistema real.

Gustavo Martins dos Santos - HTML / CSS / JS / PHP / SQL<br>
Gustavo Constantini Mattos - Node.js / Nest / SQL<br>
Lucas S. Beiler - PHP / Lumen / SQL (uma API secundária, alternativa, simplesmente uma outra implementação da API principal.)<br>

## Codigo sql para criar o schema e as tabelas
## OBS: copiar do arquivo db.sql em back-end/db.sql para evitar erros

``` SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`residents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`residents` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `cpf` VARCHAR(15) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `telephone` VARCHAR(14) NOT NULL,
  `number` TINYINT(4) UNSIGNED NOT NULL,
  `block` TINYINT(4) NOT NULL,
  `profile` ENUM("morador", "subsindico", "sindico") NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC) VISIBLE,
  UNIQUE INDEX `telephone_UNIQUE` (`telephone` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`salon_reservation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`salon_reservation` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_resident` INT NOT NULL,
  `start_reservation` DATETIME NOT NULL,
  `end_reservation` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `id_resident_idx` (`id_resident` ASC) VISIBLE,
  UNIQUE INDEX `start_reservation_UNIQUE` (`start_reservation` ASC) VISIBLE,
  UNIQUE INDEX `end_reservation_UNIQUE` (`end_reservation` ASC) VISIBLE,
  CONSTRAINT `fk_id_resident`
    FOREIGN KEY (`id_resident`)
    REFERENCES `mydb`.`residents` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`occurrences`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`occurrences` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_reservation` INT NOT NULL,
  `description` ENUM("pertubacao de sossego", "horario limite utrapassado", "outros") NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_id_reservation`
    FOREIGN KEY (`id_reservation`)
    REFERENCES `mydb`.`salon_reservation` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`employees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`employees` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `cpf` VARCHAR(15) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `salary` FLOAT(2) NOT NULL,
  `office` ENUM("porteiro", "zelador") NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`achados_e_perdidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`lost_and_found` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_input_person` INT NOT NULL,
  `id_withdrawal_person` INT NULL,
  `description` TEXT NOT NULL,
  `local` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_id_input_person`
    FOREIGN KEY (`id_input_person`)
    REFERENCES `mydb`.`residents` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_id_withdrawal_person`
    FOREIGN KEY (`id_withdrawal_person`)
    REFERENCES `mydb`.`residents` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
