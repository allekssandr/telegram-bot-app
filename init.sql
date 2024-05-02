CREATE TABLE course (
	id int4 DEFAULT 1 NOT NULL,
	title varchar NULL,
	description varchar NULL,
	"label" varchar NULL,
	price int4 DEFAULT 1500000 NOT NULL,
	CONSTRAINT course_pkey PRIMARY KEY (id)
);

CREATE TABLE chat (
	id serial4 NOT NULL,
	"chatId" int4 NULL,
	username varchar(255) NULL,
	first_name varchar(255) NULL,
	last_name varchar(255) NULL,
	is_admin bool NOT NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT "chat_chatId_key" UNIQUE ("chatId"),
	CONSTRAINT chat_pkey PRIMARY KEY (id)
);

CREATE TABLE payment (
	id serial4 NOT NULL,
	"chatId" int4 NULL,
	"courseId" int4 NULL,
	is_payment varchar(255) NULL,
	provider_payment_charge_id text NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT "payment_chatId_key" UNIQUE ("chatId"),
	CONSTRAINT "payment_courseId_key" UNIQUE ("courseId"),
	CONSTRAINT payment_pkey PRIMARY KEY (id),
	CONSTRAINT payment_provider_payment_charge_id_key UNIQUE (provider_payment_charge_id)
);

CREATE TABLE lesson (
	id int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	"number" int4 NULL,
	course_id int4 NULL,
	"name" text NULL,
	description text NULL,
	video_id text NULL,
	pdf_id text NULL,
	is_final bool NULL,
	CONSTRAINT lesson_unique UNIQUE (id)
);

CREATE TABLE progress (
	id serial4 NOT NULL,
	"chatId" int4 NOT NULL,
	"courseId" int4 NOT NULL,
	number_lesson int4 NOT NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	date_add date DEFAULT now() NOT NULL,
	CONSTRAINT progress_pkey PRIMARY KEY (id)
);

CREATE TABLE timer (
	id serial4 NOT NULL,
	"chatId" int4 NULL,
	date_timer timestamptz NOT NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT "timer_chatId_key" UNIQUE ("chatId"),
	CONSTRAINT timer_pkey PRIMARY KEY (id)
);

INSERT INTO course
(id, title, description, "label", price)
VALUES(1, 'Курс', 'Привет! Рад, что тебе хочется работать над своей речью. На этой странице происходит оплата за курс. Если ты здесь, мне нужно тебе ничего рассказывать, жду от тебя оплаты и начинаем заниматься! До встречи на уроке!', 'Голос Багизова', 1500000);

INSERT INTO lesson ("number",course_id,name,description,video_id,pdf_id,is_final) VALUES
	 (1,1,'Старт','Я вижу, что оплата прошла! Давай приступим к занятиям!','','BQACAgIAAxkBAAMnZIHI_-Rk6wORL2X-9mDXRUjYZfwAAv4tAAINChBI26Yp7pIfy0svBA',NULL),
	 (2,1,'Урок 1. Введение.','Твой первый  урок! Давай начинать)','BAACAgIAAxkBAAMZZIHCZ0ZZrJJiDcVG9Cj0g4ULs0cAApktAAINChBIZNwnAAGZGHoqLwQ','BQACAgIAAxkBAAMvZIHJJKcxmCuTTabPv4bYs8wpDgYAAgMuAAINChBIfDjGCAkSLLcvBA',NULL),
	 (3,1,'Урок 2.','Привет! Сегодня у нас второй урок','BAACAgIAAxkBAAMXZIHAwL7_vuQRNtaGy12eDwUB8OcAAnItAAINChBIW7ZOtb68CSgvBA','BQACAgIAAxkBAAMwZIHJJRQGI8oGOxbeoFLllNSbsVQAAgQuAAINChBIyDwOF8BW1FwvBA',NULL),
	 (4,1,'Урок 3.','Привет! Вот и 3 урок','BAACAgIAAxkBAAMVZIG_mvLrnumn21iU__ihD-5Sbg4AAlgtAAINChBIDq5-8ApZ5B8vBA','BQACAgIAAxkBAAMxZIHJJRTXcNcosUhz009W75IgYZ0AAgUuAAINChBIlUIGC-hoS8svBA',NULL),
	 (5,1,'Урок 4.','Приветствую! Четвертый урок, пройдешь его и уже половина курса, круто же?','BAACAgIAAxkBAAMTZIG-MXuk3CTTb5Bk5f2dzaJVbikAAkEtAAINChBIH3lJWriXlvcvBA','BQACAgIAAxkBAAMyZIHJJvQ_xolzGvyVVhSnPIXV-QkAAgYuAAINChBItaA18SPsGecvBA',NULL),
	 (6,1,'Урок 5.','Привет! Мне кажется, у тебя хорошо получается. Сегодня важный урок.','BAACAgIAAxkBAAMRZIG8NFxOsMx8DBBlBPizQKpKBrkAAh0tAAINChBI9Af8-qPvGAwvBA','BQACAgIAAxkBAAM0ZIHJJq7CCsc9-mfNxFaz1wABbXy2AAIHLgACDQoQSCjIh6gigEPOLwQ',NULL),
	 (7,1,'Урок 6.','Ну, как ты там? Уже 6 урок, ты справишься с ним!','BAACAgIAAxkBAAMPZIG64kbw-zViR8ImlMVl2hIRi5oAAt4sAAINChBIKhVZeMkZU9ovBA','BQACAgIAAxkBAAM2ZIHJJ_TfhJwruTy0YTczAVUKdfMAAgguAAINChBIwuHY1sSRIQQvBA',NULL),
	 (8,1,'Урок 7.','Привет! Ну, как ты там? Уже 7 урок, ты справишься с ним!','BAACAgIAAxkBAAMNZIG5qOFclhL4OQ-6_q_oswoLt98AArQsAAINChBI_UXWWLXtqwcvBA','BQACAgIAAxkBAAMqZIHJI3P5bibFkbSarkwXyVJ5M2AAAy4AAg0KEEiXKQctWyFgMC8E',NULL),
	 (9,1,'Урок 8.','Это наш финальный урок, тебе удалось дойти до него, это круто)))','BAACAgIAAxkBAAMLZIG4qVuVBefDZBzGGea87x4Mi58AAo8sAAINChBIIne-d43Ly1QvBA','BQACAgIAAxkBAAMrZIHJIwI6PphRCWl-IlMQj60LrQ4AAgEuAAINChBIKpHqZMGtpnUvBA',NULL),
	 (10,1,'Финал',NULL,NULL,'BQACAgIAAxkBAAIBJ2SVgJ5rzV7tFfD1Wn3YBe-S8nNMAALKLwACCUyxSJcAAXuuFg1eIC8E',true);


--CREATE ROLE telegram_bot WITH LOGIN PASSWORD 123 SUPERUSER CREATEDB CREATEROLE;
--CREATE ROLE postgres WITH LOGIN PASSWORD 123 SUPERUSER CREATEDB CREATEROLE;