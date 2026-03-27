--
-- PostgreSQL database dump
--

\restrict 75ZHV74SaI2eBNZfGGIpzCfZAh59nLVc8arc68pGdmVH0ibiUxRMisoTyV5E9y7

-- Dumped from database version 14.19 (Homebrew)
-- Dumped by pg_dump version 14.19 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: favorite_cities; Type: TABLE; Schema: public; Owner: techtonica
--

CREATE TABLE public.favorite_cities (
    id integer NOT NULL,
    user_id integer NOT NULL,
    city_name character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.favorite_cities OWNER TO techtonica;

--
-- Name: favorite_cities_id_seq; Type: SEQUENCE; Schema: public; Owner: techtonica
--

CREATE SEQUENCE public.favorite_cities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.favorite_cities_id_seq OWNER TO techtonica;

--
-- Name: favorite_cities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: techtonica
--

ALTER SEQUENCE public.favorite_cities_id_seq OWNED BY public.favorite_cities.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: techtonica
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password text NOT NULL,
    username character varying(100),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO techtonica;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: techtonica
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO techtonica;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: techtonica
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: favorite_cities id; Type: DEFAULT; Schema: public; Owner: techtonica
--

ALTER TABLE ONLY public.favorite_cities ALTER COLUMN id SET DEFAULT nextval('public.favorite_cities_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: techtonica
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: favorite_cities; Type: TABLE DATA; Schema: public; Owner: techtonica
--

COPY public.favorite_cities (id, user_id, city_name, created_at) FROM stdin;
1	1	Austin	2026-03-17 22:32:32.956555
3	1	Seattle	2026-03-17 22:32:32.956555
4	2	New York	2026-03-17 22:32:32.956555
5	2	Boston	2026-03-17 22:32:32.956555
6	3	San Francisco	2026-03-17 22:32:32.956555
7	3	Los Angeles	2026-03-17 22:32:32.956555
8	3	San Diego	2026-03-17 22:32:32.956555
10	1	Chicago	2026-03-20 00:53:31.384483
11	1	New York	2026-03-20 00:54:53.295873
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: techtonica
--

COPY public.users (id, email, password, username, created_at) FROM stdin;
1	siyi@email.com	123456	Siyi	2026-03-17 22:32:12.475463
2	alex@email.com	123456	Alex	2026-03-17 22:32:12.475463
3	mike@email.com	123456	Mike	2026-03-17 22:32:12.475463
\.


--
-- Name: favorite_cities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: techtonica
--

SELECT pg_catalog.setval('public.favorite_cities_id_seq', 11, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: techtonica
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: favorite_cities favorite_cities_pkey; Type: CONSTRAINT; Schema: public; Owner: techtonica
--

ALTER TABLE ONLY public.favorite_cities
    ADD CONSTRAINT favorite_cities_pkey PRIMARY KEY (id);


--
-- Name: favorite_cities favorite_cities_user_id_city_name_key; Type: CONSTRAINT; Schema: public; Owner: techtonica
--

ALTER TABLE ONLY public.favorite_cities
    ADD CONSTRAINT favorite_cities_user_id_city_name_key UNIQUE (user_id, city_name);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: techtonica
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: techtonica
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: favorite_cities favorite_cities_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: techtonica
--

ALTER TABLE ONLY public.favorite_cities
    ADD CONSTRAINT favorite_cities_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict 75ZHV74SaI2eBNZfGGIpzCfZAh59nLVc8arc68pGdmVH0ibiUxRMisoTyV5E9y7

