use master;
go
drop database if exists wine_review;
go
create database wine_review collate Croatian_CI_AS;
go
use wine_review;
go


--on remote server DB
--SELECT name, collation_name FROM sys.databases;
--GO
--ALTER DATABASE db_aace17_winereview SET SINGLE_USER WITH
--ROLLBACK IMMEDIATE;
--GO
--ALTER DATABASE db_aace17_winereview COLLATE Croatian_CI_AS;
--GO
--ALTER DATABASE db_aace17_winereview SET MULTI_USER;
--GO
--SELECT name, collation_name FROM sys.databases;
--GO

create table reviewers(
id int not null primary key identity(1,1),
email varchar (50) not null,
pass char (255) not null,
firstname varchar(20) not null,
lastname varchar(20) not null
);


create table wines(
id int not null primary key identity(1,1),
maker varchar(20) not null,
wine_name varchar (20) not null,
year_of_harvest varchar(5) not null,
price decimal(10,2)
);

--an event where wine was tasted
create table event_places(
id int not null primary key identity(1,1),
country varchar(50) not null,
city varchar(50) not null,
place_name varchar(50) not null,
event_name varchar(50)
);

--combine user, wine and event 
create table tastings (
id int not null primary key identity (1,1),
id_reviewer int not null,
id_wine int not null,
id_event_place int not null,
review varchar (255) not null,
event_date datetime not null
foreign key (id_reviewer) references reviewers (id),
foreign key (id_wine) references wines (id),
foreign key (id_event_place) references event_places (id)
);


