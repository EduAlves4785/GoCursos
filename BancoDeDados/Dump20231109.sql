-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: pi
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alunocursos`
--

DROP TABLE IF EXISTS `alunocursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alunocursos` (
  `aluno_curso_id` int NOT NULL AUTO_INCREMENT,
  `aluno_id` int DEFAULT NULL,
  `curso_id` int DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`aluno_curso_id`),
  KEY `aluno_id` (`aluno_id`),
  KEY `curso_id` (`curso_id`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alunocursos`
--

LOCK TABLES `alunocursos` WRITE;
/*!40000 ALTER TABLE `alunocursos` DISABLE KEYS */;
INSERT INTO `alunocursos` VALUES (14,1,7,'Concluído'),(15,16,6,'Cursando'),(16,1,1,'Cursando'),(17,13,2,'Cursando'),(18,13,3,'Cursando'),(19,13,1,'Cursando'),(20,13,7,'Cursando'),(21,13,1,'Cursando'),(22,17,4,'Cursando'),(23,17,7,'Concluído'),(24,18,5,'Cursando'),(25,18,7,'Concluído'),(26,18,2,'Cursando'),(27,20,5,'Cursando'),(28,20,7,'Concluído');
/*!40000 ALTER TABLE `alunocursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cadastro`
--

DROP TABLE IF EXISTS `cadastro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cadastro` (
  `nome_Completo` varchar(30) NOT NULL,
  `cpf` varchar(11) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `senha` varchar(59) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cadastro`
--

LOCK TABLES `cadastro` WRITE;
/*!40000 ALTER TABLE `cadastro` DISABLE KEYS */;
INSERT INTO `cadastro` VALUES ('João da Silva','12345678901','joao@email.com','senha123',1),('Maria Oliveira','98765432101','maria@email.com','senha456',2),('Carlos Pereira','45678912301','carlos@email.com','senha789',3),('Ana Santos','78912345601','ana@email.com','senhaabc',4),('Paulo Sousa','15935724601','paulo@email.com','senha789xyz',5),('Juliana Lima','25836914701','juliana@email.com','senha123abc',6),('Fernando Rodrigues','75395185201','fernando@email.com','senha123456',7),('Mariana Costa','95175385201','mariana@email.com','senhamariana',8),('Ricardo Alves','12398765401','ricardo@email.com','senha456789',9),('Isabel Ribeiro','32145678901','isabel@email.com','senha789123',10),('Gustavo Silva','85236914701','gustavo@email.com','senha123xyz',11),('Eduarda Mendes','98765485201','eduarda@email.com','senhaabcxyz',12),('Sandra Santos','36985214701','sandra@email.com','senhasandra123',13),('Roberto Oliveira','65498732101','roberto@email.com','senha123456xyz',14),('Helena Pereira','12332112301','helena@email.com','senhahelena',15),('Kleber ','11111111111','klebaodamassa@hotmail.com','123456',16),('Eduardo Alves','11111111112','eduardo@gmail.com','123456',17),('Junior Plinio','55555555555','plinio@gmail.com','123456',18),('Ursolino','66666666666','lutas.s@hotmail.com','5145564',19),('Mario Duna','44444444444','mario@gmail.com','123456',20);
/*!40000 ALTER TABLE `cadastro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compartilha_projeto`
--

DROP TABLE IF EXISTS `compartilha_projeto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compartilha_projeto` (
  `id_projeto` int NOT NULL AUTO_INCREMENT,
  `nome_projeto` varchar(70) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `fk_projeto` int DEFAULT NULL,
  PRIMARY KEY (`id_projeto`),
  KEY `fk_projeto` (`fk_projeto`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compartilha_projeto`
--

LOCK TABLES `compartilha_projeto` WRITE;
/*!40000 ALTER TABLE `compartilha_projeto` DISABLE KEYS */;
/*!40000 ALTER TABLE `compartilha_projeto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curso`
--

DROP TABLE IF EXISTS `curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curso` (
  `id_curso` int NOT NULL AUTO_INCREMENT,
  `nome_curso` varchar(70) NOT NULL,
  `duracao` int NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `status_curso` varchar(25) NOT NULL,
  `nivel_curso` varchar(25) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `fk_curso` int NOT NULL,
  PRIMARY KEY (`id_curso`),
  KEY `fk_curso` (`fk_curso`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curso`
--

LOCK TABLES `curso` WRITE;
/*!40000 ALTER TABLE `curso` DISABLE KEYS */;
INSERT INTO `curso` VALUES (1,'Pacote Office',2,'Curso de Pacote Office','Ativo','Iniciante','Informática',1),(2,'Marketing Digital',3,'Curso de Marketing Digital','Ativo','Avançado','Marketing',2),(3,'Culinária',2,'Curso de Culinária','Ativo','Iniciante','Culinária',3),(4,'Data Lake',4,'Curso de Data Lake','Ativo','Intermediário','Tecnologia',4),(5,'Python',3,'Curso de Python','Ativo','Avançado','Programação',5),(6,'Node JS',3,'Curso de Node JS','Ativo','Avançado','Programação',6),(7,'Curso teste',0,'Curso teste','Ativo','Avançado','Programação',7);
/*!40000 ALTER TABLE `curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `id_feedback` int NOT NULL AUTO_INCREMENT,
  `feedback` varchar(255) NOT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`id_feedback`),
  KEY `usuario_id` (`usuario_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuariospremium`
--

DROP TABLE IF EXISTS `usuariospremium`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuariospremium` (
  `usuario_id` int NOT NULL AUTO_INCREMENT,
  `premium` tinyint(1) NOT NULL,
  PRIMARY KEY (`usuario_id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuariospremium`
--

LOCK TABLES `usuariospremium` WRITE;
/*!40000 ALTER TABLE `usuariospremium` DISABLE KEYS */;
INSERT INTO `usuariospremium` VALUES (1,0),(2,1),(3,1),(4,0),(5,1),(6,1),(7,1),(8,1),(9,1),(10,0),(11,1),(12,1),(13,1),(14,0),(15,0),(16,1),(19,0),(20,1);
/*!40000 ALTER TABLE `usuariospremium` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-09 23:54:37
