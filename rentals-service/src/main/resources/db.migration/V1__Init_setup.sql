create table if not exists public.property
(
    id       uuid         not null primary key,
    city     varchar(255) not null,
    country  varchar(255) not null,
    province varchar(255) not null,
    street   varchar(255) not null,
    zip_code varchar(255) not null
);

alter table public.property
    owner to rental;
