--
-- PostgreSQL database cluster dump
--

-- Started on 2026-09-28 14:00:40

\restrict M6egV6dGpZSlOU2FlsCyH9IVZmGS25qZNO3mXflpP4xrYSjgkbTKWXLbhGE254k

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;

--
-- User Configurations
--








\unrestrict M6egV6dGpZSlOU2FlsCyH9IVZmGS25qZNO3mXflpP4xrYSjgkbTKWXLbhGE254k

--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

\restrict ePFf4SrP32YGOitWGpBVd161b01Vluy0UdWJluQIeRKjIWv4aLYsTtsG0KwqycX

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

-- Started on 2026-09-28 14:00:40

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2026-09-28 14:00:40

--
-- PostgreSQL database dump complete
--

\unrestrict ePFf4SrP32YGOitWGpBVd161b01Vluy0UdWJluQIeRKjIWv4aLYsTtsG0KwqycX

--
-- Database "data_sampah" dump
--

--
-- PostgreSQL database dump
--

\restrict 4eSZTGk5gXPmxOQP5SHMfgA6SPbbmTQOoEfcLb2T6b9wfybw4Op7VMNUw0aLtEd

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

-- Started on 2026-09-28 14:00:40

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4984 (class 1262 OID 17207)
-- Name: data_sampah; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE data_sampah WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Indonesia.1252';


ALTER DATABASE data_sampah OWNER TO postgres;

\unrestrict 4eSZTGk5gXPmxOQP5SHMfgA6SPbbmTQOoEfcLb2T6b9wfybw4Op7VMNUw0aLtEd
\connect data_sampah
\restrict 4eSZTGk5gXPmxOQP5SHMfgA6SPbbmTQOoEfcLb2T6b9wfybw4Op7VMNUw0aLtEd

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 17336)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 4985 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 17337)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 17404)
-- Name: dompet_pengguna; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dompet_pengguna (
    id_pengguna integer NOT NULL,
    saldo numeric(12,2) DEFAULT 0 NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.dompet_pengguna OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 17355)
-- Name: jenis_sampah; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jenis_sampah (
    id_jenis integer NOT NULL,
    nama_jenis character varying(50) NOT NULL,
    harga_per_kg numeric(10,2) DEFAULT 0 NOT NULL
);


ALTER TABLE public.jenis_sampah OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 17354)
-- Name: jenis_sampah_id_jenis_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.jenis_sampah_id_jenis_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.jenis_sampah_id_jenis_seq OWNER TO postgres;

--
-- TOC entry 4987 (class 0 OID 0)
-- Dependencies: 220
-- Name: jenis_sampah_id_jenis_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.jenis_sampah_id_jenis_seq OWNED BY public.jenis_sampah.id_jenis;


--
-- TOC entry 222 (class 1259 OID 17365)
-- Name: laporan_jenis; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.laporan_jenis (
    id_laporan integer NOT NULL,
    id_jenis integer NOT NULL,
    berat_kg numeric(5,2)
);


ALTER TABLE public.laporan_jenis OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 17373)
-- Name: laporan_sampah; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.laporan_sampah (
    id_laporan integer NOT NULL,
    id_pengguna integer NOT NULL,
    lokasi text,
    tanggal_laporan date,
    status character varying(20)
);


ALTER TABLE public.laporan_sampah OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 17372)
-- Name: laporan_sampah_id_laporan_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.laporan_sampah_id_laporan_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.laporan_sampah_id_laporan_seq OWNER TO postgres;

--
-- TOC entry 4988 (class 0 OID 0)
-- Dependencies: 223
-- Name: laporan_sampah_id_laporan_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.laporan_sampah_id_laporan_seq OWNED BY public.laporan_sampah.id_laporan;


--
-- TOC entry 226 (class 1259 OID 17384)
-- Name: pengguna; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pengguna (
    id_pengguna integer NOT NULL,
    nama character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password text NOT NULL,
    no_hp character varying(20)
);


ALTER TABLE public.pengguna OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 17383)
-- Name: pengguna_id_pengguna_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pengguna_id_pengguna_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pengguna_id_pengguna_seq OWNER TO postgres;

--
-- TOC entry 4989 (class 0 OID 0)
-- Dependencies: 225
-- Name: pengguna_id_pengguna_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pengguna_id_pengguna_seq OWNED BY public.pengguna.id_pengguna;


--
-- TOC entry 227 (class 1259 OID 17396)
-- Name: profil_pengguna; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profil_pengguna (
    id_pengguna integer NOT NULL,
    alamat text,
    tanggal_lahir date
);


ALTER TABLE public.profil_pengguna OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 17415)
-- Name: transaksi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaksi (
    id_transaksi integer NOT NULL,
    id_pengguna integer NOT NULL,
    id_laporan integer,
    jenis_transaksi character varying(20) NOT NULL,
    nominal numeric(12,2) NOT NULL,
    tanggal timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    keterangan text
);


ALTER TABLE public.transaksi OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 17414)
-- Name: transaksi_id_transaksi_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transaksi_id_transaksi_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transaksi_id_transaksi_seq OWNER TO postgres;

--
-- TOC entry 4990 (class 0 OID 0)
-- Dependencies: 229
-- Name: transaksi_id_transaksi_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transaksi_id_transaksi_seq OWNED BY public.transaksi.id_transaksi;


--
-- TOC entry 4788 (class 2604 OID 17358)
-- Name: jenis_sampah id_jenis; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jenis_sampah ALTER COLUMN id_jenis SET DEFAULT nextval('public.jenis_sampah_id_jenis_seq'::regclass);


--
-- TOC entry 4790 (class 2604 OID 17376)
-- Name: laporan_sampah id_laporan; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laporan_sampah ALTER COLUMN id_laporan SET DEFAULT nextval('public.laporan_sampah_id_laporan_seq'::regclass);


--
-- TOC entry 4791 (class 2604 OID 17387)
-- Name: pengguna id_pengguna; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pengguna ALTER COLUMN id_pengguna SET DEFAULT nextval('public.pengguna_id_pengguna_seq'::regclass);


--
-- TOC entry 4794 (class 2604 OID 17418)
-- Name: transaksi id_transaksi; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaksi ALTER COLUMN id_transaksi SET DEFAULT nextval('public.transaksi_id_transaksi_seq'::regclass);


--
-- TOC entry 4967 (class 0 OID 17337)
-- Dependencies: 219
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
205c4026-f048-437f-8088-c0f911ac0420	272c2ec5dac4025384aceb96f153b7c0647c81c88c6a273f7d1c12d84573a638	2026-09-28 12:39:01.557556+07	20260928053901_add_password	\N	\N	2026-09-28 12:39:01.434218+07	1
\.


--
-- TOC entry 4976 (class 0 OID 17404)
-- Dependencies: 228
-- Data for Name: dompet_pengguna; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dompet_pengguna (id_pengguna, saldo, updated_at) FROM stdin;
1	0.00	2026-09-28 06:24:25.594
\.


--
-- TOC entry 4969 (class 0 OID 17355)
-- Dependencies: 221
-- Data for Name: jenis_sampah; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jenis_sampah (id_jenis, nama_jenis, harga_per_kg) FROM stdin;
1	Botol Plastik / PET	3000.00
2	Kardus Bekas	2000.00
3	Kertas / Majalah	1500.00
4	Besi / Logam	5000.00
5	Kaleng Aluminium	8000.00
\.


--
-- TOC entry 4970 (class 0 OID 17365)
-- Dependencies: 222
-- Data for Name: laporan_jenis; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.laporan_jenis (id_laporan, id_jenis, berat_kg) FROM stdin;
1	1	1.00
\.


--
-- TOC entry 4972 (class 0 OID 17373)
-- Dependencies: 224
-- Data for Name: laporan_sampah; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.laporan_sampah (id_laporan, id_pengguna, lokasi, tanggal_laporan, status) FROM stdin;
1	1	goonification	2026-09-28	SELESAI
\.


--
-- TOC entry 4974 (class 0 OID 17384)
-- Dependencies: 226
-- Data for Name: pengguna; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pengguna (id_pengguna, nama, email, password, no_hp) FROM stdin;
1	Sultan Rasyid Abidin	sultanjakarta7@gmail.com	$2b$10$ECrb4FODJjkkh18pGeAhRO8cOwJ7j1u1kINx/OOLTapukrY8F/1aW	\N
\.


--
-- TOC entry 4975 (class 0 OID 17396)
-- Dependencies: 227
-- Data for Name: profil_pengguna; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profil_pengguna (id_pengguna, alamat, tanggal_lahir) FROM stdin;
\.


--
-- TOC entry 4978 (class 0 OID 17415)
-- Dependencies: 230
-- Data for Name: transaksi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaksi (id_transaksi, id_pengguna, id_laporan, jenis_transaksi, nominal, tanggal, keterangan) FROM stdin;
1	1	1	PEMASUKAN	3000.00	2026-09-28 06:18:52.701	Setor Sampah #1 (1 jenis)
2	1	\N	PENGELUARAN	3000.00	2026-09-28 06:24:25.564	Penarikan Saldo (Tunai) - GoonGoonGoon
\.


--
-- TOC entry 4991 (class 0 OID 0)
-- Dependencies: 220
-- Name: jenis_sampah_id_jenis_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.jenis_sampah_id_jenis_seq', 5, true);


--
-- TOC entry 4992 (class 0 OID 0)
-- Dependencies: 223
-- Name: laporan_sampah_id_laporan_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.laporan_sampah_id_laporan_seq', 1, true);


--
-- TOC entry 4993 (class 0 OID 0)
-- Dependencies: 225
-- Name: pengguna_id_pengguna_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pengguna_id_pengguna_seq', 1, true);


--
-- TOC entry 4994 (class 0 OID 0)
-- Dependencies: 229
-- Name: transaksi_id_transaksi_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaksi_id_transaksi_seq', 2, true);


--
-- TOC entry 4797 (class 2606 OID 17350)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4810 (class 2606 OID 17413)
-- Name: dompet_pengguna dompet_pengguna_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dompet_pengguna
    ADD CONSTRAINT dompet_pengguna_pkey PRIMARY KEY (id_pengguna);


--
-- TOC entry 4799 (class 2606 OID 17364)
-- Name: jenis_sampah jenis_sampah_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jenis_sampah
    ADD CONSTRAINT jenis_sampah_pkey PRIMARY KEY (id_jenis);


--
-- TOC entry 4801 (class 2606 OID 17371)
-- Name: laporan_jenis laporan_jenis_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laporan_jenis
    ADD CONSTRAINT laporan_jenis_pkey PRIMARY KEY (id_laporan, id_jenis);


--
-- TOC entry 4803 (class 2606 OID 17382)
-- Name: laporan_sampah laporan_sampah_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laporan_sampah
    ADD CONSTRAINT laporan_sampah_pkey PRIMARY KEY (id_laporan);


--
-- TOC entry 4806 (class 2606 OID 17395)
-- Name: pengguna pengguna_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pengguna
    ADD CONSTRAINT pengguna_pkey PRIMARY KEY (id_pengguna);


--
-- TOC entry 4808 (class 2606 OID 17403)
-- Name: profil_pengguna profil_pengguna_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profil_pengguna
    ADD CONSTRAINT profil_pengguna_pkey PRIMARY KEY (id_pengguna);


--
-- TOC entry 4812 (class 2606 OID 17428)
-- Name: transaksi transaksi_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaksi
    ADD CONSTRAINT transaksi_pkey PRIMARY KEY (id_transaksi);


--
-- TOC entry 4804 (class 1259 OID 17429)
-- Name: pengguna_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX pengguna_email_key ON public.pengguna USING btree (email);


--
-- TOC entry 4817 (class 2606 OID 17450)
-- Name: dompet_pengguna dompet_pengguna_id_pengguna_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dompet_pengguna
    ADD CONSTRAINT dompet_pengguna_id_pengguna_fkey FOREIGN KEY (id_pengguna) REFERENCES public.pengguna(id_pengguna) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4813 (class 2606 OID 17430)
-- Name: laporan_jenis laporan_jenis_id_jenis_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laporan_jenis
    ADD CONSTRAINT laporan_jenis_id_jenis_fkey FOREIGN KEY (id_jenis) REFERENCES public.jenis_sampah(id_jenis) ON DELETE CASCADE;


--
-- TOC entry 4814 (class 2606 OID 17435)
-- Name: laporan_jenis laporan_jenis_id_laporan_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laporan_jenis
    ADD CONSTRAINT laporan_jenis_id_laporan_fkey FOREIGN KEY (id_laporan) REFERENCES public.laporan_sampah(id_laporan) ON DELETE CASCADE;


--
-- TOC entry 4815 (class 2606 OID 17440)
-- Name: laporan_sampah laporan_sampah_id_pengguna_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laporan_sampah
    ADD CONSTRAINT laporan_sampah_id_pengguna_fkey FOREIGN KEY (id_pengguna) REFERENCES public.pengguna(id_pengguna);


--
-- TOC entry 4816 (class 2606 OID 17445)
-- Name: profil_pengguna profil_pengguna_id_pengguna_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profil_pengguna
    ADD CONSTRAINT profil_pengguna_id_pengguna_fkey FOREIGN KEY (id_pengguna) REFERENCES public.pengguna(id_pengguna) ON DELETE CASCADE;


--
-- TOC entry 4818 (class 2606 OID 17460)
-- Name: transaksi transaksi_id_laporan_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaksi
    ADD CONSTRAINT transaksi_id_laporan_fkey FOREIGN KEY (id_laporan) REFERENCES public.laporan_sampah(id_laporan) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4819 (class 2606 OID 17455)
-- Name: transaksi transaksi_id_pengguna_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaksi
    ADD CONSTRAINT transaksi_id_pengguna_fkey FOREIGN KEY (id_pengguna) REFERENCES public.pengguna(id_pengguna) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4986 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2026-09-28 14:00:41

--
-- PostgreSQL database dump complete
--

\unrestrict 4eSZTGk5gXPmxOQP5SHMfgA6SPbbmTQOoEfcLb2T6b9wfybw4Op7VMNUw0aLtEd

-- Completed on 2026-09-28 14:00:41

--
-- PostgreSQL database cluster dump complete
--

