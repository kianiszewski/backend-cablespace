--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: carrito; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carrito (
    id_carrito integer NOT NULL,
    id_usuario integer,
    id_producto integer,
    cantidad integer NOT NULL
);


ALTER TABLE public.carrito OWNER TO postgres;

--
-- Name: carrito_id_carrito_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.carrito_id_carrito_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.carrito_id_carrito_seq OWNER TO postgres;

--
-- Name: carrito_id_carrito_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.carrito_id_carrito_seq OWNED BY public.carrito.id_carrito;


--
-- Name: categorias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categorias (
    id_categoria integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text
);


ALTER TABLE public.categorias OWNER TO postgres;

--
-- Name: categorias_id_categoria_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categorias_id_categoria_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categorias_id_categoria_seq OWNER TO postgres;

--
-- Name: categorias_id_categoria_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categorias_id_categoria_seq OWNED BY public.categorias.id_categoria;


--
-- Name: compras; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.compras (
    id_compra integer NOT NULL,
    id_usuario integer,
    id_producto integer,
    cantidad integer NOT NULL,
    fecha_compra timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    id_metodo integer
);


ALTER TABLE public.compras OWNER TO postgres;

--
-- Name: compras_id_compra_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.compras_id_compra_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.compras_id_compra_seq OWNER TO postgres;

--
-- Name: compras_id_compra_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.compras_id_compra_seq OWNED BY public.compras.id_compra;


--
-- Name: detalle_pedido; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detalle_pedido (
    id_detalle integer NOT NULL,
    id_pedido integer,
    id_producto integer,
    cantidad integer NOT NULL,
    precio_unitario numeric(10,2) NOT NULL
);


ALTER TABLE public.detalle_pedido OWNER TO postgres;

--
-- Name: detalle_pedido_id_detalle_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalle_pedido_id_detalle_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.detalle_pedido_id_detalle_seq OWNER TO postgres;

--
-- Name: detalle_pedido_id_detalle_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalle_pedido_id_detalle_seq OWNED BY public.detalle_pedido.id_detalle;


--
-- Name: envios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.envios (
    id_envio integer NOT NULL,
    id_pedido integer,
    direccion_envio character varying(200) NOT NULL,
    fecha_envio timestamp without time zone,
    fecha_entrega timestamp without time zone,
    estado character varying(50) DEFAULT 'pendiente'::character varying
);


ALTER TABLE public.envios OWNER TO postgres;

--
-- Name: envios_id_envio_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.envios_id_envio_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.envios_id_envio_seq OWNER TO postgres;

--
-- Name: envios_id_envio_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.envios_id_envio_seq OWNED BY public.envios.id_envio;


--
-- Name: favoritos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favoritos (
    id_favorito integer NOT NULL,
    id_usuario integer,
    id_producto integer
);


ALTER TABLE public.favoritos OWNER TO postgres;

--
-- Name: favoritos_id_favorito_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.favoritos_id_favorito_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.favoritos_id_favorito_seq OWNER TO postgres;

--
-- Name: favoritos_id_favorito_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.favoritos_id_favorito_seq OWNED BY public.favoritos.id_favorito;


--
-- Name: historial; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.historial (
    id_historial integer NOT NULL,
    id_producto integer,
    precio numeric(10,2) NOT NULL,
    fecha_cambio timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.historial OWNER TO postgres;

--
-- Name: historial_id_historial_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.historial_id_historial_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.historial_id_historial_seq OWNER TO postgres;

--
-- Name: historial_id_historial_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.historial_id_historial_seq OWNED BY public.historial.id_historial;


--
-- Name: imagenes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.imagenes (
    id_imagen integer NOT NULL,
    id_producto integer,
    url_imagen character varying(500) NOT NULL
);


ALTER TABLE public.imagenes OWNER TO postgres;

--
-- Name: imagenes_id_imagen_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.imagenes_id_imagen_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.imagenes_id_imagen_seq OWNER TO postgres;

--
-- Name: imagenes_id_imagen_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.imagenes_id_imagen_seq OWNED BY public.imagenes.id_imagen;


--
-- Name: mensaje; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mensaje (
    id_mensaje integer NOT NULL,
    id_remitente integer,
    id_destinatario integer,
    mensaje text NOT NULL,
    fecha_envio timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.mensaje OWNER TO postgres;

--
-- Name: mensaje_id_mensaje_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mensaje_id_mensaje_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mensaje_id_mensaje_seq OWNER TO postgres;

--
-- Name: mensaje_id_mensaje_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mensaje_id_mensaje_seq OWNED BY public.mensaje.id_mensaje;


--
-- Name: metodos_pago; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.metodos_pago (
    id_metodo integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text
);


ALTER TABLE public.metodos_pago OWNER TO postgres;

--
-- Name: metodos_pago_id_metodo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.metodos_pago_id_metodo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.metodos_pago_id_metodo_seq OWNER TO postgres;

--
-- Name: metodos_pago_id_metodo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.metodos_pago_id_metodo_seq OWNED BY public.metodos_pago.id_metodo;


--
-- Name: notificaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notificaciones (
    id_notificacion integer NOT NULL,
    id_usuario integer,
    mensaje text NOT NULL,
    fecha_notificacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    leido boolean DEFAULT false,
    tipo character varying(50)
);


ALTER TABLE public.notificaciones OWNER TO postgres;

--
-- Name: notificaciones_id_notificacion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notificaciones_id_notificacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notificaciones_id_notificacion_seq OWNER TO postgres;

--
-- Name: notificaciones_id_notificacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notificaciones_id_notificacion_seq OWNED BY public.notificaciones.id_notificacion;


--
-- Name: ofertas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ofertas (
    id_oferta integer NOT NULL,
    id_producto integer,
    descuento numeric(5,2) NOT NULL,
    fecha_inicio timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    fecha_fin timestamp without time zone
);


ALTER TABLE public.ofertas OWNER TO postgres;

--
-- Name: ofertas_id_oferta_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ofertas_id_oferta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ofertas_id_oferta_seq OWNER TO postgres;

--
-- Name: ofertas_id_oferta_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ofertas_id_oferta_seq OWNED BY public.ofertas.id_oferta;


--
-- Name: pagos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pagos (
    id_pago integer NOT NULL,
    id_pedido integer,
    id_metodo integer,
    monto numeric(10,2) NOT NULL,
    fecha_pago timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    estado character varying(50) DEFAULT 'pendiente'::character varying
);


ALTER TABLE public.pagos OWNER TO postgres;

--
-- Name: pagos_id_pago_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pagos_id_pago_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pagos_id_pago_seq OWNER TO postgres;

--
-- Name: pagos_id_pago_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pagos_id_pago_seq OWNED BY public.pagos.id_pago;


--
-- Name: pedidos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pedidos (
    id_pedido integer NOT NULL,
    id_usuario integer,
    fecha_pedido timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    estado character varying(50) DEFAULT 'pendiente'::character varying
);


ALTER TABLE public.pedidos OWNER TO postgres;

--
-- Name: pedidos_id_pedido_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pedidos_id_pedido_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pedidos_id_pedido_seq OWNER TO postgres;

--
-- Name: pedidos_id_pedido_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pedidos_id_pedido_seq OWNED BY public.pedidos.id_pedido;


--
-- Name: productos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.productos (
    id_producto integer NOT NULL,
    nombre character varying(200) NOT NULL,
    descripcion text,
    precio numeric(10,2) NOT NULL,
    stock integer NOT NULL,
    id_categoria integer,
    id_vendedor integer,
    fecha_publicacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    estado character varying(10) DEFAULT 'NUEVO'::character varying,
    CONSTRAINT productos_estado_check CHECK (((estado)::text = ANY ((ARRAY['NUEVO'::character varying, 'USADO'::character varying])::text[])))
);


ALTER TABLE public.productos OWNER TO postgres;

--
-- Name: productos_id_producto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.productos_id_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.productos_id_producto_seq OWNER TO postgres;

--
-- Name: productos_id_producto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.productos_id_producto_seq OWNED BY public.productos.id_producto;


--
-- Name: reseña; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."reseña" (
    "id_reseña" integer NOT NULL,
    id_producto integer,
    id_usuario integer,
    calificacion integer,
    comentario text,
    "fecha_reseña" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "reseña_calificacion_check" CHECK (((calificacion >= 1) AND (calificacion <= 5)))
);


ALTER TABLE public."reseña" OWNER TO postgres;

--
-- Name: reseña_id_reseña_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."reseña_id_reseña_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."reseña_id_reseña_seq" OWNER TO postgres;

--
-- Name: reseña_id_reseña_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."reseña_id_reseña_seq" OWNED BY public."reseña"."id_reseña";


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id_usuario integer NOT NULL,
    nombre character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    "contraseña" character varying(100) NOT NULL,
    direccion character varying(200),
    telefono character varying(20),
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    rol character varying(20) DEFAULT 'usuario'::character varying
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_usuario_seq OWNER TO postgres;

--
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_usuario_seq OWNED BY public.usuarios.id_usuario;


--
-- Name: usuarios_metodos_pago; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios_metodos_pago (
    id_pago integer NOT NULL,
    id_usuario integer,
    id_metodo integer,
    numero_tarjeta character varying(16),
    fecha_vencimiento character varying(7),
    cvv character varying(3),
    cuotas integer,
    CONSTRAINT usuarios_metodos_pago_cuotas_check CHECK (((cuotas >= 1) AND (cuotas <= 12)))
);


ALTER TABLE public.usuarios_metodos_pago OWNER TO postgres;

--
-- Name: usuarios_metodos_pago_id_pago_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_metodos_pago_id_pago_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_metodos_pago_id_pago_seq OWNER TO postgres;

--
-- Name: usuarios_metodos_pago_id_pago_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_metodos_pago_id_pago_seq OWNED BY public.usuarios_metodos_pago.id_pago;


--
-- Name: ventas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ventas (
    id_venta integer NOT NULL,
    id_vendedor integer,
    id_producto integer,
    cantidad integer NOT NULL,
    fecha_venta timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.ventas OWNER TO postgres;

--
-- Name: ventas_id_venta_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ventas_id_venta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ventas_id_venta_seq OWNER TO postgres;

--
-- Name: ventas_id_venta_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ventas_id_venta_seq OWNED BY public.ventas.id_venta;


--
-- Name: carrito id_carrito; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carrito ALTER COLUMN id_carrito SET DEFAULT nextval('public.carrito_id_carrito_seq'::regclass);


--
-- Name: categorias id_categoria; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias ALTER COLUMN id_categoria SET DEFAULT nextval('public.categorias_id_categoria_seq'::regclass);


--
-- Name: compras id_compra; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compras ALTER COLUMN id_compra SET DEFAULT nextval('public.compras_id_compra_seq'::regclass);


--
-- Name: detalle_pedido id_detalle; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_pedido ALTER COLUMN id_detalle SET DEFAULT nextval('public.detalle_pedido_id_detalle_seq'::regclass);


--
-- Name: envios id_envio; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.envios ALTER COLUMN id_envio SET DEFAULT nextval('public.envios_id_envio_seq'::regclass);


--
-- Name: favoritos id_favorito; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos ALTER COLUMN id_favorito SET DEFAULT nextval('public.favoritos_id_favorito_seq'::regclass);


--
-- Name: historial id_historial; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial ALTER COLUMN id_historial SET DEFAULT nextval('public.historial_id_historial_seq'::regclass);


--
-- Name: imagenes id_imagen; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imagenes ALTER COLUMN id_imagen SET DEFAULT nextval('public.imagenes_id_imagen_seq'::regclass);


--
-- Name: mensaje id_mensaje; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensaje ALTER COLUMN id_mensaje SET DEFAULT nextval('public.mensaje_id_mensaje_seq'::regclass);


--
-- Name: metodos_pago id_metodo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metodos_pago ALTER COLUMN id_metodo SET DEFAULT nextval('public.metodos_pago_id_metodo_seq'::regclass);


--
-- Name: notificaciones id_notificacion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notificaciones ALTER COLUMN id_notificacion SET DEFAULT nextval('public.notificaciones_id_notificacion_seq'::regclass);


--
-- Name: ofertas id_oferta; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ofertas ALTER COLUMN id_oferta SET DEFAULT nextval('public.ofertas_id_oferta_seq'::regclass);


--
-- Name: pagos id_pago; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagos ALTER COLUMN id_pago SET DEFAULT nextval('public.pagos_id_pago_seq'::regclass);


--
-- Name: pedidos id_pedido; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedidos ALTER COLUMN id_pedido SET DEFAULT nextval('public.pedidos_id_pedido_seq'::regclass);


--
-- Name: productos id_producto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos ALTER COLUMN id_producto SET DEFAULT nextval('public.productos_id_producto_seq'::regclass);


--
-- Name: reseña id_reseña; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."reseña" ALTER COLUMN "id_reseña" SET DEFAULT nextval('public."reseña_id_reseña_seq"'::regclass);


--
-- Name: usuarios id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass);


--
-- Name: usuarios_metodos_pago id_pago; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_metodos_pago ALTER COLUMN id_pago SET DEFAULT nextval('public.usuarios_metodos_pago_id_pago_seq'::regclass);


--
-- Name: ventas id_venta; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventas ALTER COLUMN id_venta SET DEFAULT nextval('public.ventas_id_venta_seq'::regclass);


--
-- Data for Name: carrito; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carrito (id_carrito, id_usuario, id_producto, cantidad) FROM stdin;
40	11	15	1
\.


--
-- Data for Name: categorias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categorias (id_categoria, nombre, descripcion) FROM stdin;
10	MONITORES	Categoría de monitores de audio
11	CONTROLADORES	Controladores MIDI y DJ
12	MICROFONOS	Micrófonos de estudio y en vivo
13	ACCESORIOS	Accesorios y periféricos de audio
14	USADOS	Productos de segunda mano
15	NUEVOS	Productos nuevos en stock
\.


--
-- Data for Name: compras; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.compras (id_compra, id_usuario, id_producto, cantidad, fecha_compra, id_metodo) FROM stdin;
5	11	22	1	2025-03-09 21:04:04.550967	1
6	11	22	1	2025-03-09 21:57:52.695191	1
7	11	22	1	2025-03-09 22:16:03.052451	1
8	11	15	1	2025-03-09 22:27:19.236618	1
41	11	15	1	2025-03-09 22:32:35.003161	1
42	11	15	1	2025-03-09 22:33:44.461187	1
43	11	15	1	2025-03-09 22:41:31.449053	1
44	11	15	1	2025-03-09 22:45:53.05126	1
45	11	15	1	2025-03-09 22:51:44.933664	1
78	12	17	1	2025-03-10 23:09:01.419039	1
79	12	21	1	2025-03-10 23:15:21.360412	1
80	12	19	1	2025-03-10 23:15:33.464439	1
81	12	17	1	2025-03-10 23:17:42.854419	1
82	12	16	1	2025-03-11 21:43:17.657837	1
\.


--
-- Data for Name: detalle_pedido; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.detalle_pedido (id_detalle, id_pedido, id_producto, cantidad, precio_unitario) FROM stdin;
28	26	22	1	12.00
29	27	22	1	12.00
30	28	15	1	120.00
63	61	15	1	120.00
64	62	15	1	120.00
65	63	15	1	120.00
66	64	15	1	120.00
67	65	15	1	120.00
100	98	17	1	140.00
101	99	21	1	15.00
102	100	19	1	220.00
103	101	17	1	140.00
104	102	16	1	200.00
\.


--
-- Data for Name: envios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.envios (id_envio, id_pedido, direccion_envio, fecha_envio, fecha_entrega, estado) FROM stdin;
3	4	Calle 123, Ciudad X	2025-02-28 00:00:00	2025-03-05 00:00:00	pendiente
\.


--
-- Data for Name: favoritos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favoritos (id_favorito, id_usuario, id_producto) FROM stdin;
\.


--
-- Data for Name: historial; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.historial (id_historial, id_producto, precio, fecha_cambio) FROM stdin;
19	13	899.00	2025-03-09 15:11:16.670575
20	14	599.00	2025-03-09 15:12:38.471039
21	15	120.00	2025-03-09 17:19:27.566227
22	16	110.00	2025-03-09 17:20:42.019951
23	16	110.00	2025-03-09 17:21:36.317077
24	17	140.00	2025-03-09 17:23:08.855802
25	13	899.00	2025-03-09 17:23:28.162596
26	14	599.00	2025-03-09 17:23:40.178295
27	16	110.00	2025-03-09 17:24:15.938611
28	15	120.00	2025-03-09 17:24:32.371591
29	13	899.00	2025-03-09 17:24:57.46778
30	14	599.00	2025-03-09 17:25:04.110843
31	18	1200.00	2025-03-09 17:26:03.481355
32	18	1200.00	2025-03-09 17:26:14.370154
33	19	220.00	2025-03-09 17:27:04.983322
34	20	190.00	2025-03-09 17:28:10.320073
35	20	190.00	2025-03-09 17:28:35.05505
36	19	220.00	2025-03-09 17:28:44.374423
37	21	15.00	2025-03-09 17:29:51.079584
38	22	12.00	2025-03-09 17:31:00.349885
39	23	190.00	2025-03-10 23:45:57.995786
40	24	99.00	2025-03-10 23:47:19.300746
41	23	190.00	2025-03-10 23:47:38.905445
\.


--
-- Data for Name: imagenes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.imagenes (id_imagen, id_producto, url_imagen) FROM stdin;
30	13	https://imgur.com/kytqxos.jpg
31	13	https://imgur.com/eytCSlt.jpg
32	13	https://imgur.com/eNNPm8P.jpg
33	13	https://imgur.com/N20kfmj.jpg
34	14	https://imgur.com/kytqxos.jpg
35	14	https://imgur.com/eNNPm8P.jpg
36	14	https://imgur.com/eytCSlt.jpg
37	14	https://imgur.com/N20kfmj.jpg
38	15	https://imgur.com/j4QA53I.jpg
39	15	https://imgur.com/d5iiX1t.jpg
40	15	https://imgur.com/voUFSpM.jpg
41	16	https://imgur.com/j4QA53I.jpg
42	16	https://imgur.com/d5iiX1t.jpg
43	16	https://imgur.com/voUFSpM.jpg
44	17	https://imgur.com/1IJRPOG.jpg
45	17	https://imgur.com/XTsP2uI.jpg
46	17	https://imgur.com/I0tbGlb.jpg
47	18	https://imgur.com/sWvzEOc.jpg
48	18	https://imgur.com/pWd9ftD.jpg
49	18	https://imgur.com/ZJy4ifc.jpg
50	19	https://imgur.com/eFGrWlx.jpg
51	19	https://imgur.com/3lAIAyF.jpg
52	19	https://imgur.com/VARqNPF.jpg
53	20	https://imgur.com/3i378tt.jpg
54	20	https://imgur.com/jq3s3jG.jpg
55	20	https://imgur.com/V7dYwCv.jpg
56	21	https://imgur.com/31wbytv.jpg
57	21	https://imgur.com/jTTluWo.jpg
58	21	https://imgur.com/l2mw0DQ.jpg
59	22	https://imgur.com/wpnQPzz.jpg
60	22	https://imgur.com/iJuEDcT.jpg
61	22	https://imgur.com/nSPQAE5.jpg
62	23	https://imgur.com/IyqwujN.jpg
63	23	https://imgur.com/TWqqR9K.jpg
64	23	https://imgur.com/S1Yv4fB.jpg
65	24	https://imgur.com/0ZSkvUV.jpg
66	24	https://imgur.com/UZ1VoX9.jpg
67	24	https://imgur.com/2iCcD4x.jpg
\.


--
-- Data for Name: mensaje; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mensaje (id_mensaje, id_remitente, id_destinatario, mensaje, fecha_envio) FROM stdin;
1	2	3	Hola, ¿tienes este producto en stock?	2025-02-21 19:54:36.980288
2	2	3	¿El precio es negociable?	2025-02-21 22:30:55.882938
3	1	2	Hola, ¿cómo estás?	2025-02-26 22:23:24.12812
\.


--
-- Data for Name: metodos_pago; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.metodos_pago (id_metodo, nombre, descripcion) FROM stdin;
1	Tarjeta de Crédito	Pago con tarjeta de crédito Visa, MasterCard
2	PayPal	Pago seguro con PayPal
\.


--
-- Data for Name: notificaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notificaciones (id_notificacion, id_usuario, mensaje, fecha_notificacion, leido, tipo) FROM stdin;
\.


--
-- Data for Name: ofertas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ofertas (id_oferta, id_producto, descuento, fecha_inicio, fecha_fin) FROM stdin;
\.


--
-- Data for Name: pagos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pagos (id_pago, id_pedido, id_metodo, monto, fecha_pago, estado) FROM stdin;
6	4	1	149.99	2025-02-26 21:10:20.282261	pendiente
8	6	1	12.00	2025-03-09 21:59:44.749485	pendiente
9	6	1	12.00	2025-03-09 22:16:52.098219	pagado
\.


--
-- Data for Name: pedidos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pedidos (id_pedido, id_usuario, fecha_pedido, estado) FROM stdin;
5	2	2025-02-26 21:08:53.495152	cancelado
8	1	2025-03-01 00:36:16.343022	completado
11	1	2025-02-25 10:29:03.329524	cancelado
4	2	2025-02-22 13:19:44.464202	cancelado
6	1	2025-02-28 23:49:26.893585	cancelado
7	1	2025-03-01 00:34:07.747067	cancelado
12	1	2025-03-01 10:53:41.540311	cancelado
13	1	2025-03-01 10:55:01.219364	cancelado
14	1	2025-03-01 11:16:30.036979	cancelado
15	1	2025-03-01 11:24:47.130639	cancelado
16	1	2025-03-01 11:28:30.90902	cancelado
17	1	2025-03-01 11:45:38.370366	cancelado
18	1	2025-03-01 11:53:24.582133	cancelado
19	1	2025-03-01 11:57:42.706681	cancelado
20	1	2025-03-01 12:00:51.127813	cancelado
21	1	2025-03-01 12:09:42.568153	cancelado
22	4	2025-03-01 22:23:44.727873	cancelado
26	11	2025-03-09 21:57:52.695191	pendiente
27	11	2025-03-09 22:16:03.052451	pendiente
28	11	2025-03-09 22:27:19.236618	pendiente
61	11	2025-03-09 22:32:35.003161	pendiente
62	11	2025-03-09 22:33:44.461187	pendiente
63	11	2025-03-09 22:41:31.449053	pendiente
64	11	2025-03-09 22:45:53.05126	pendiente
65	11	2025-03-09 22:51:44.933664	pendiente
98	12	2025-03-10 23:09:01.419039	pendiente
99	12	2025-03-10 23:15:21.360412	pendiente
100	12	2025-03-10 23:15:33.464439	pendiente
101	12	2025-03-10 23:17:42.854419	pendiente
102	12	2025-03-11 21:43:17.657837	pendiente
\.


--
-- Data for Name: productos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.productos (id_producto, nombre, descripcion, precio, stock, id_categoria, id_vendedor, fecha_publicacion, estado) FROM stdin;
22	NEUTIK XLR	Cable XLR de 15mts para exterior - Hembra a macho	60.00	347	13	11	2025-03-09 17:31:00.346111	NUEVO
23	Monitor Behringer	Monitor de studio para afionados del audio	190.00	50	10	12	2025-03-10 23:45:57.991722	USADO
16	SHURE SM58	Micrófono profesional de calidad para eventos y entrevistas	200.00	7	12	11	2025-03-09 17:20:42.017329	USADO
13	Numark NS7 III	La Numark NS7 III es una controladora DJ de alto rendimiento 	2150.00	5	11	11	2025-03-09 15:11:16.667041	USADO
14	Numark NS7 III	NUEVO** La Numark NS7 III es una controladora DJ de alto rendimiento	1300.00	2	11	11	2025-03-09 15:12:38.465979	NUEVO
18	Numark NS7 MK3	Controladora DJ Performance, con platos motorizados 	1350.00	15	11	11	2025-03-09 17:26:03.477497	NUEVO
20	Samson RESOLV SE	Monitores de estudio de 8 pulgadas - 2 Vias	200.00	30	10	11	2025-03-09 17:28:10.316657	NUEVO
15	RØDE MIC 1	Micrófono dinámico para estudio musical, con soporte	100.00	4	12	11	2025-03-09 17:19:27.562971	NUEVO
21	NEUTIK Speakon	Cable SPEAKON de 15 mts conectores - Macho a macho	40.00	399	13	11	2025-03-09 17:29:51.076622	NUEVO
24	Microfono RAZER	Microfono calidad studio con formato Gamer	99.00	99	12	12	2025-03-10 23:47:19.296752	USADO
19	KRK Rokit 8"	Monitores de estudio de 9 pulgadas KRK	150.00	19	10	11	2025-03-09 17:27:04.980545	NUEVO
17	AKAI MPK Mini	CONTROLADOR MIDI MPK Mini para realizar sampleo musical	150.00	8	11	11	2025-03-09 17:23:08.851728	USADO
\.


--
-- Data for Name: reseña; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."reseña" ("id_reseña", id_producto, id_usuario, calificacion, comentario, "fecha_reseña") FROM stdin;
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id_usuario, nombre, email, "contraseña", direccion, telefono, fecha_registro, rol) FROM stdin;
1	Juan Perez	juan@example.com	$2a$10$r3RDsqSdTKEJbftDUmXVlO2pZ4tA2tKR0FEcP49rEStrWZERL/8by	\N	\N	2025-02-19 21:56:39.960075	usuario
4	Usuario de Prueba	correo@ejemplo.com	$2a$10$NvtAm1soHhhEKESKWIZt0.hMwgATesfUwc.sP3tBp4wuwZZK83CQy	\N	\N	2025-03-01 14:48:37.807644	usuario
5	Admin	correo@admin.cl	$2a$10$8PuBlam5M7EeEl5K.FnkTuXTpbM823gwLX87yegfvB0Wv/Ach7/Rq	\N	\N	2025-03-01 21:41:20.364549	admin
7	Admin2	correo2@admin.cl	$2a$10$v.2vlwUAqqnhtEIat.m5o.PbN/JlEwX0LQ88uLhH0rqSnXAK/dzRu	\N	\N	2025-03-01 22:02:33.617412	admin
3	Maria López	maria@example.com	$2a$10$N9qo8uLOickgx2ZMRZo4ie1GQ7JTtYyq9sEBPZK3lhgtT9HYoXz42	Av. Principal 456, Ciudad	987654321	2025-02-19 22:07:41.317665	usuario
2	Jose Purina	jose@example.com	$2a$10$2bG3pQl9HzOP5G8X9rj5Ue7A2X5FUX7Jh2yI6r12POb82FoKZ9zH6	Calle 0000, Ciudad	997654321	2025-02-19 22:07:41.317665	admin
11	Nuevo Usuario	nuevo@example.com	$2a$10$RhB1ofhXTAqShV1RFVR0T.SJNu6QGVGkeaYy3J3QAb9mCOiRDNgZC	\N	\N	2025-03-06 21:49:58.869178	usuario
12	Kevin 	kianiszewski@gmail.com	$2a$10$tey91hVA7PHPCBWYhCzCuexPLETP0D/O3Q/5pYkQPI9QNXsj6s.Ii	Av. Siempre Viva 742	955330683	2025-03-10 22:08:30.644553	usuario
\.


--
-- Data for Name: usuarios_metodos_pago; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios_metodos_pago (id_pago, id_usuario, id_metodo, numero_tarjeta, fecha_vencimiento, cvv, cuotas) FROM stdin;
1	11	1	4111111111111111	2027-12	123	1
\.


--
-- Data for Name: ventas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas (id_venta, id_vendedor, id_producto, cantidad, fecha_venta) FROM stdin;
\.


--
-- Name: carrito_id_carrito_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carrito_id_carrito_seq', 63, true);


--
-- Name: categorias_id_categoria_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categorias_id_categoria_seq', 15, true);


--
-- Name: compras_id_compra_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.compras_id_compra_seq', 82, true);


--
-- Name: detalle_pedido_id_detalle_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detalle_pedido_id_detalle_seq', 104, true);


--
-- Name: envios_id_envio_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.envios_id_envio_seq', 3, true);


--
-- Name: favoritos_id_favorito_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.favoritos_id_favorito_seq', 5, true);


--
-- Name: historial_id_historial_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.historial_id_historial_seq', 41, true);


--
-- Name: imagenes_id_imagen_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.imagenes_id_imagen_seq', 67, true);


--
-- Name: mensaje_id_mensaje_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mensaje_id_mensaje_seq', 3, true);


--
-- Name: metodos_pago_id_metodo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.metodos_pago_id_metodo_seq', 2, true);


--
-- Name: notificaciones_id_notificacion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notificaciones_id_notificacion_seq', 1, true);


--
-- Name: ofertas_id_oferta_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ofertas_id_oferta_seq', 3, true);


--
-- Name: pagos_id_pago_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pagos_id_pago_seq', 44, true);


--
-- Name: pedidos_id_pedido_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pedidos_id_pedido_seq', 102, true);


--
-- Name: productos_id_producto_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.productos_id_producto_seq', 24, true);


--
-- Name: reseña_id_reseña_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."reseña_id_reseña_seq"', 5, true);


--
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_usuario_seq', 12, true);


--
-- Name: usuarios_metodos_pago_id_pago_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_metodos_pago_id_pago_seq', 1, true);


--
-- Name: ventas_id_venta_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_id_venta_seq', 1, false);


--
-- Name: carrito carrito_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carrito
    ADD CONSTRAINT carrito_pkey PRIMARY KEY (id_carrito);


--
-- Name: categorias categorias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id_categoria);


--
-- Name: compras compras_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compras
    ADD CONSTRAINT compras_pkey PRIMARY KEY (id_compra);


--
-- Name: detalle_pedido detalle_pedido_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_pedido
    ADD CONSTRAINT detalle_pedido_pkey PRIMARY KEY (id_detalle);


--
-- Name: envios envios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.envios
    ADD CONSTRAINT envios_pkey PRIMARY KEY (id_envio);


--
-- Name: favoritos favoritos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos
    ADD CONSTRAINT favoritos_pkey PRIMARY KEY (id_favorito);


--
-- Name: historial historial_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial
    ADD CONSTRAINT historial_pkey PRIMARY KEY (id_historial);


--
-- Name: imagenes imagenes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imagenes
    ADD CONSTRAINT imagenes_pkey PRIMARY KEY (id_imagen);


--
-- Name: mensaje mensaje_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensaje
    ADD CONSTRAINT mensaje_pkey PRIMARY KEY (id_mensaje);


--
-- Name: metodos_pago metodos_pago_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metodos_pago
    ADD CONSTRAINT metodos_pago_pkey PRIMARY KEY (id_metodo);


--
-- Name: notificaciones notificaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notificaciones
    ADD CONSTRAINT notificaciones_pkey PRIMARY KEY (id_notificacion);


--
-- Name: ofertas ofertas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ofertas
    ADD CONSTRAINT ofertas_pkey PRIMARY KEY (id_oferta);


--
-- Name: pagos pagos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagos
    ADD CONSTRAINT pagos_pkey PRIMARY KEY (id_pago);


--
-- Name: pedidos pedidos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_pkey PRIMARY KEY (id_pedido);


--
-- Name: productos productos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id_producto);


--
-- Name: reseña reseña_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."reseña"
    ADD CONSTRAINT "reseña_pkey" PRIMARY KEY ("id_reseña");


--
-- Name: carrito unique_user_product; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carrito
    ADD CONSTRAINT unique_user_product UNIQUE (id_usuario, id_producto);


--
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- Name: usuarios_metodos_pago usuarios_metodos_pago_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_metodos_pago
    ADD CONSTRAINT usuarios_metodos_pago_pkey PRIMARY KEY (id_pago);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);


--
-- Name: ventas ventas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventas
    ADD CONSTRAINT ventas_pkey PRIMARY KEY (id_venta);


--
-- Name: carrito carrito_id_producto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carrito
    ADD CONSTRAINT carrito_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES public.productos(id_producto);


--
-- Name: carrito carrito_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carrito
    ADD CONSTRAINT carrito_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario);


--
-- Name: compras compras_id_metodo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compras
    ADD CONSTRAINT compras_id_metodo_fkey FOREIGN KEY (id_metodo) REFERENCES public.metodos_pago(id_metodo) ON DELETE CASCADE;


--
-- Name: compras compras_id_producto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compras
    ADD CONSTRAINT compras_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES public.productos(id_producto) ON DELETE CASCADE;


--
-- Name: compras compras_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compras
    ADD CONSTRAINT compras_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario) ON DELETE CASCADE;


--
-- Name: detalle_pedido detalle_pedido_id_pedido_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_pedido
    ADD CONSTRAINT detalle_pedido_id_pedido_fkey FOREIGN KEY (id_pedido) REFERENCES public.pedidos(id_pedido) ON DELETE CASCADE;


--
-- Name: detalle_pedido detalle_pedido_id_producto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_pedido
    ADD CONSTRAINT detalle_pedido_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES public.productos(id_producto);


--
-- Name: envios envios_id_pedido_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.envios
    ADD CONSTRAINT envios_id_pedido_fkey FOREIGN KEY (id_pedido) REFERENCES public.pedidos(id_pedido) ON DELETE CASCADE;


--
-- Name: favoritos favoritos_id_producto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos
    ADD CONSTRAINT favoritos_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES public.productos(id_producto);


--
-- Name: favoritos favoritos_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos
    ADD CONSTRAINT favoritos_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario);


--
-- Name: historial historial_id_producto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial
    ADD CONSTRAINT historial_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES public.productos(id_producto);


--
-- Name: imagenes imagenes_id_producto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imagenes
    ADD CONSTRAINT imagenes_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES public.productos(id_producto);


--
-- Name: mensaje mensaje_id_destinatario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensaje
    ADD CONSTRAINT mensaje_id_destinatario_fkey FOREIGN KEY (id_destinatario) REFERENCES public.usuarios(id_usuario);


--
-- Name: mensaje mensaje_id_remitente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensaje
    ADD CONSTRAINT mensaje_id_remitente_fkey FOREIGN KEY (id_remitente) REFERENCES public.usuarios(id_usuario);


--
-- Name: notificaciones notificaciones_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notificaciones
    ADD CONSTRAINT notificaciones_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario);


--
-- Name: ofertas ofertas_id_producto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ofertas
    ADD CONSTRAINT ofertas_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES public.productos(id_producto);


--
-- Name: pagos pagos_id_metodo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagos
    ADD CONSTRAINT pagos_id_metodo_fkey FOREIGN KEY (id_metodo) REFERENCES public.metodos_pago(id_metodo);


--
-- Name: pagos pagos_id_pedido_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagos
    ADD CONSTRAINT pagos_id_pedido_fkey FOREIGN KEY (id_pedido) REFERENCES public.pedidos(id_pedido) ON DELETE CASCADE;


--
-- Name: pedidos pedidos_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario);


--
-- Name: productos productos_id_categoria_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_id_categoria_fkey FOREIGN KEY (id_categoria) REFERENCES public.categorias(id_categoria);


--
-- Name: productos productos_id_vendedor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_id_vendedor_fkey FOREIGN KEY (id_vendedor) REFERENCES public.usuarios(id_usuario);


--
-- Name: reseña reseña_id_producto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."reseña"
    ADD CONSTRAINT "reseña_id_producto_fkey" FOREIGN KEY (id_producto) REFERENCES public.productos(id_producto);


--
-- Name: reseña reseña_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."reseña"
    ADD CONSTRAINT "reseña_id_usuario_fkey" FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario);


--
-- Name: usuarios_metodos_pago usuarios_metodos_pago_id_metodo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_metodos_pago
    ADD CONSTRAINT usuarios_metodos_pago_id_metodo_fkey FOREIGN KEY (id_metodo) REFERENCES public.metodos_pago(id_metodo) ON DELETE CASCADE;


--
-- Name: usuarios_metodos_pago usuarios_metodos_pago_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_metodos_pago
    ADD CONSTRAINT usuarios_metodos_pago_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario) ON DELETE CASCADE;


--
-- Name: ventas ventas_id_producto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventas
    ADD CONSTRAINT ventas_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES public.productos(id_producto);


--
-- Name: ventas ventas_id_vendedor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventas
    ADD CONSTRAINT ventas_id_vendedor_fkey FOREIGN KEY (id_vendedor) REFERENCES public.usuarios(id_usuario);


--
-- PostgreSQL database dump complete
--

