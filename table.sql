create table greetings(id serial primary key, 
greeted_name text not null, greeted_count int not null);

-- `insert into greetings(greeted_name, greeted_count) values ($1, $2)`, ['name', 1]