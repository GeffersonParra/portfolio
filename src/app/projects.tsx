import { SiDjango, SiMysql, SiNginx } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import { FaReact, FaLaravel, FaBootstrap } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { DiUbuntu } from "react-icons/di";
import { SiAseprite, SiKotlin } from "react-icons/si";

export const Projects = ({ theme }: any) => {
    return ([
    {
        "name": "EDL Ingenieros SAS",
        "description": {
            "es": "Plataforma integral de gestión empresarial con arquitectura basada en Django y React. Implementa comunicación bidireccional mediante WebSockets (Daphne), un esquema relacional de +50 tablas en PostgreSQL y un motor de edición visual con GrapesJS. Desplegado en entorno Linux endurecido con protocolos de seguridad activa (Fail2ban/Nginx).",
            "en": "Full-stack ERP infrastructure leveraging a Django/React decoupled architecture. Engineered a normalized PostgreSQL backend (+50 entities) with asynchronous real-time event handling via Daphne and Redis. Deployed on a hardened Linux stack featuring Nginx-level hardening and Fail2Ban for intrusion prevention.",
        },
        "contain": false,
        "photos": [
            {"src": "/images/edl/1.webp", "description": {"es": "Desarrollo de la página principal (Landing Page) | EDL Ingenieros SAS", "en": "Landing page development | EDL Ingenieros SAS"}},
            {"src": "/images/edl/2.webp", "description": {"es": "Desarrollo de login para Intranet | EDL Ingenieros SAS", "en": "Intranet Login Module | EDL Ingenieros SAS"}},
            {"src": "/images/edl/3.webp", "description": {"es": "Desarrollo de dashboard principal para Intranet / Tema Oscuro | EDL Ingenieros SAS", "en": "Intranet's main dashboard development / Dark Theme | EDL Ingenieros SAS"}},
            {"src": "/images/edl/4.webp", "description": {"es": "Módulo de Usuarios (Módulo Core) Intranet | EDL Ingenieros SAS", "en": "Users module (Core Module) | EDL Ingenieros SAS"}},
            {"src": "/images/edl/5.webp", "description": {"es": "Motor de plantillas de documentos con sintaxis personalizada (Integración con GrapesJS) | EDL Ingenieros SAS", "en": "Document templates engine with custom syntax (GrapesJS Integration) | EDL Ingenieros SAS"}},
            {"src": "/images/edl/6.webp", "description": {"es": "Vista de estadísticas básicas | EDL Ingenieros SAS", "en": "Basic statistics view | EDL Ingenieros SAS"}},
        ],
        "builtwith": ["Django | PostgreSQL | React | Tailwind | GSAP | Linux | Nginx"],
        "icons": [
            <div className="w-10 h-10 border border-[#0c4b33] p-1 rounded-full shrink-0 flex justify-center items-center hover:bg-[#0c4b33] hover:text-white duration-200 group/icon">
                <SiDjango className="text-2xl text-[#0c4b33] group-hover/icon:text-white"/>
            </div>,
            <div className="w-10 h-10 border border-[#336791] p-1 rounded-full shrink-0 flex justify-center items-center hover:bg-[#336791] duration-200 group/icon">
                <BiLogoPostgresql className="text-2xl text-[#336791] group-hover/icon:text-white"/>
            </div>,
            <div className="w-10 h-10 border border-[#35bef8] p-1 rounded-full shrink-0 flex justify-center items-center hover:bg-[#35bef8] duration-200 group/icon">
                <RiTailwindCssFill className="text-2xl text-[#35bef8] group-hover/icon:text-white"/>
            </div>,
            <div className="w-10 h-10 border border-[#00d8ff] p-1 rounded-full shrink-0 flex justify-center items-center hover:bg-[#00d8ff] duration-200 group/icon">
                <FaReact className="text-2xl text-[#00d8ff] group-hover/icon:text-white"/>
            </div>,
            <div className="w-10 h-10 border border-[#009639] p-1 rounded-full shrink-0 flex justify-center items-center hover:bg-[#009639] duration-200 group/icon">
                <SiNginx className="text-2xl text-[#009639] group-hover/icon:text-white"/>
            </div>,
            <div className="w-10 h-10 border border-[#dd4810] p-1 rounded-full shrink-0 flex justify-center items-center hover:bg-[#dd4810] duration-200 group/icon">
                <DiUbuntu className="text-3xl text-[#dd4810] group-hover/icon:text-white"/> 
            </div>
        ],
        "link": "https://edlingenieros.com"
    },
    {
        "name": "Bolicheck",
        "description": {
            "es": "Sistema de automatización de procesos clave con módulos de control de beneficios, gestión de inventario y reservas en tiempo real para mejorar la competitividad digital.",
            "en": "Key process automation system featuring profit tracking, real-time inventory management and reservations modules to enhance digital competitiveness.",
        },
        "photos": [
            {"src": "/images/bolicheck/5.webp", "description": {"es": "Desarrollo de la página principal (Landing Page) | Bolicheck", "en": "Landing page development | Bolicheck"}},
            {"src": "/images/bolicheck/8.webp", "description": {"es": "Módulo de login | Bolicheck", "en": "Login Module | Bolicheck"}},
            {"src": "/images/bolicheck/2.webp", "description": {"es": "Módulo de ventas | Bolicheck", "en": "Sales Module | Bolicheck"}},
            {"src": "/images/bolicheck/11.webp", "description": {"es": "Módulo de Reservas | Bolicheck", "en": "Booking module | Bolicheck"}},
            {"src": "/images/bolicheck/17.webp", "description": {"es": "Módulo de Productos | Bolicheck", "en": "Products Module | Bolicheck"}},
            {"src": "/images/bolicheck/7.webp", "description": {"es": "Programa de Puntos | Bolicheck", "en": "Points Program | Bolicheck"}},
        ],
        "builtwith": ["Django | DRF | PostgreSQL | Bootstrap | React"],
        "icons": [
            <div className="w-10 h-10 border border-[#0c4b33] p-1 rounded-full shrink-0 flex justify-center items-center hover:bg-[#0c4b33] hover:text-white duration-200 group/icon">
                <SiDjango className="text-2xl text-[#0c4b33] group-hover/icon:text-white"/>
            </div>,
            <div className="w-10 h-10 border border-[#336791] p-1 rounded-full shrink-0 flex justify-center items-center hover:bg-[#336791] duration-200 group/icon">
                <BiLogoPostgresql className="text-2xl text-[#336791] group-hover/icon:text-white"/>
            </div>,
            <div className="w-10 h-10 border border-[#6f2bf6] p-1 rounded-full shrink-0 flex justify-center items-center hover:bg-[#6f2bf6] duration-200 group/icon">
                <FaBootstrap className="text-2xl text-[#6f2bf6] group-hover/icon:text-white"/>
            </div>,
            <div className="w-10 h-10 border border-[#00d8ff] p-1 rounded-full shrink-0 flex justify-center items-center hover:bg-[#00d8ff] duration-200 group/icon">
                <FaReact className="text-2xl text-[#00d8ff] group-hover/icon:text-white"/>
            </div>
        ]
    },
    {
        "name": "Compraya",
        "description": {
            "es": "Sistema de tienda móvil con facturación electrónica integrada mediante la API de Factus (DIAN).",
            "en": "Mobile e-commerce system with electronic invoicing integration via Factus API.",
        },
        "contain": true,
        "photos": [
            {"src": "/images/factus/1.webp", "description": {"es": "Módulo de login | Compraya", "en": "Login Module | Compraya"}},
            {"src": "/images/factus/2.webp", "description": {"es": "Panel de administrador | Compraya", "en": "Admin Panel | Compraya"}},
            {"src": "/images/factus/3.webp", "description": {"es": "Productos | Compraya", "en": "Products | Compraya"}},
            {"src": "/images/factus/4.webp", "description": {"es": "Carrito de compras | Compraya", "en": "Shopping Cart | Compraya"}},
            {"src": "/images/factus/5.webp", "description": {"es": "Detalles de Compra | Compraya", "en": "Order Summary | Compraya"}},
        ],
        "builtwith": ["Laravel | MySQL | Tailwind | React Native"],
        "icons": [
            <div className="w-10 h-10 border border-[#ff291a] p-1 rounded-full shrink-0 flex justify-center items-center hover:bg-[#ff291a] duration-200 group/icon">
                <FaLaravel className="text-2xl text-[#ff291a] group-hover/icon:text-white"/>
            </div>,
            <div className="w-10 h-10 border border-[#177f98] p-1 rounded-full shrink-0 flex justify-center items-center hover:bg-[#FFF] duration-200">
                <SiMysql className="text-2xl text-[#177f98]"/>
            </div>,
            <div className="w-10 h-10 border border-[#00d8ff] p-1 rounded-full shrink-0 flex justify-center items-center hover:bg-[#00d8ff] duration-200 group/icon">
                <FaReact className="text-2xl text-[#00d8ff] group-hover/icon:text-white"/>
            </div>
        ],
        "github": "https://github.com/GeffersonParra/Factus"
    },
    {
        "name": "The Element's Fate",
        "description": {
            "es": "Videojuego plataformero para dispositivos android.",
            "en": "Platform videogame for android devices.",
        },
        "contain": false,
        "photos": [
            {"src": "/images/elements/1.webp", "description": {"es": "Pantalla de bienvenida | The Element's Fate", "en": "Welcome screen | The Element's Fate"}},
            {"src": "/images/elements/2.webp", "description": {"es": "Selector de fase | The Element's Fate", "en": "Stage selector | The Element's Fate"}},
            {"src": "/images/elements/3.webp", "description": {"es": "Selector de nivel | The Element's Fate", "en": "Level selector | The Element's Fate"}},
            {"src": "/images/elements/4.webp", "description": {"es": "Gameplay | The Element's Fate", "en": "Gameplay | The Element's Fate"}},
            {"src": "/images/elements/5.webp", "description": {"es": "Configuración | The Element's Fate", "en": "Settings | The Element's Fate"}},
            {"src": "/images/elements/6.webp", "description": {"es": "Créditos | The Element's Fate", "en": "Credits | The Element's Fate"}},
        ],
        "builtwith": ["Kotlin | LibGDX | Aseprite"],
        "icons": [
            <div className="w-10 h-10 border border-[#973cf7] p-1 rounded-full shrink-0 flex justify-center items-center hover:bg-[#973cf7] duration-200 group/icon">
                <SiKotlin className="text-xl text-[#973cf7] group-hover/icon:text-white"/>
            </div>,
            <div className="w-10 h-10 border border-[#177f98] p-1 rounded-full shrink-0 flex justify-center items-center hover:bg-[#FFF] duration-200">
                <img src={`${theme == "light" ? "/images/icons/libgdx.webp" : "/images/icons/libgdx_light.webp"}`}/>
            </div>,
            <div className="w-10 h-10 border p-1 rounded-full shrink-0 flex justify-center items-center duration-200 group/icon">
                <SiAseprite className="text-2xl"/>
            </div>
        ],
        "github": "https://github.com/GeffersonParra/Factus"
    }
])}