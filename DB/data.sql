insert into reviewers (email, pass, firstname, lastname) values ('kusen.mario@gmail.com', HASHBYTES('MD5', 'pass'), 'Mario', 'Kušen'), 
('VedranaPavic@jourrapide.com', HASHBYTES('MD5', 'pass1'), 'Vedrana', 'Pavić'),
('DankoMatic@armyspy.com', HASHBYTES('MD5', 'pass2'), 'Danko', 'Matić'),
('LjudevitVarga@jourrapide.com', HASHBYTES('MD5', 'pass3'), 'Ljudevit', 'Varga'),
('VedranPavlic@jourrapide.com', HASHBYTES('MD5', 'pass4'), 'Vedran', 'Pavlić'),
('LorenaVukelic@dayrep.com', HASHBYTES('MD5', 'pass5'), 'Lorena', 'Vukelić'),
('VanjaMaric@armyspy.com', HASHBYTES('MD5', 'pass6'), 'Vanja', 'Marić');

--select * from reviewers;

insert into wines (maker, wine_name, year_of_harvest, price) values ('Krauthaker', 'Graševina', '2022', 9.5),
('Krauthaker', 'Chardonnay', '2021', 17.5),
('Krauthaker', 'Pinot sivi', '2020', 9.9),
('Krauthaker', 'Pinot crni', '2021', 17),
('Belje', 'Merlot', '2020', 11.5),
('Belje', 'Pinot crni', '2015', 11.28),
('Belje', 'Frankovka', '2015', 9.5),
('Belje', 'Graševina', '2021', 7.3),
('Josić', 'Cabernet Franc', '2019', 25.95),
('Josić', 'Cabernet Sauvignon', '2019', 23.90),
('Josić', 'Merlot', '2019', 22.95),
('Josić', 'Pinot bijeli', '2022', 11.50);

--select * from wines;

insert into event_places (country, city,place_name, event_name) values ('hr', 'Osijek', 'Crna svinja', ''),
('hr', 'Vardarac', 'Citadela',''),
('hr', 'Osijek', 'Strossmayer 2',''),
('hr', 'Bilje', 'Čingi lingi čarda','ručak'),
('hr', 'Osijek', 'Lipov hlad','večera'),
('hr', 'Osijek', 'Kod javora','večera');

--select * from event_places;

--select * from event_places as e inner join reviewers as r on e.id=r.id inner join wines as w on w.id=r.id;

insert into tastings (id_reviewer, id_wine, id_event_place, review, event_date) values (1,1,1,'vrhunsko bijelo vino','2024-02-01'),
(2,2,2,'vrhunsko bijelo vino','2024-02-02'),
(3,3,3,'vrhunsko bijelo vino','2024-02-03'),
(4,4,4,'vrhunsko crno vino','2024-02-04'),
(5,5,5,'vrhunsko crno vino','2024-02-05'),
(6,6,6,'vrhunsko crno vino','2024-02-06'),
(1,7,1,'vrhunsko crno vino','2024-02-07'),
(2,8,2,'vrhunsko bijelo vino','2024-02-08'),
(3,9,3,'vrhunsko bijelo vino','2024-02-09'),
(4,10,4,'vrhunsko bijelo vino','2024-02-10'),
(5,11,5,'vrhunsko crno vino','2024-02-11'),
(6,12,6,'vrhunsko bijelo vino','2024-02-12');

--select * from tastings;

-- select t.id, r.firstname, r.lastname, e.place_name, e.city, event_date, wine_name, year_of_harvest from tastings as t join reviewers as r on t.id=r.id
-- join wines as w on t.id=w.id
-- join event_places as e on t.id=e.id
-- where t.id=3;

-- select d.city, d.place_name, d.event_name, b.maker, b.wine_name, a.review from 
-- tastings a inner join wines b on b.id = a.id_wine 
-- inner join reviewers c on c.id = a.id_reviewer 
-- inner join event_places d on d.id = a.id_event_place 
-- where b.maker LIKE '%kr%';

select * from reviewers where id=2;
select*from wines where  id=4;
select * from event_places where id=6;

select * from tastings where id=13;


 select t.id, r.firstname, r.lastname, e.place_name, e.city, t.event_date, w.wine_name, w.maker, w.year_of_harvest, t.review, w.price from tastings as t 
 join reviewers as r on r.id =t.id_reviewer
 join wines as w on w.id=t.id_wine
 join event_places as e on e.id=t.id_event_place
 where t.id=13;