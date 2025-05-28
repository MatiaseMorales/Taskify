Taskify - Gestión de Tareas con Vue y Supabase
Taskify es una aplicación web diseñada para facilitar la gestión personal de tareas, integrando autenticación de usuarios y persistencia de datos en tiempo real mediante Supabase. Este proyecto fue desarrollado para aplicar conocimientos en Vue 3, Pinia y Supabase, con un enfoque en una experiencia fluida y moderna.

🌐 Descripción general
Taskify permite a los usuarios registrarse, iniciar sesión y administrar sus tareas personales con funcionalidades para crear, editar, completar y eliminar tareas. La aplicación presenta un sistema de autenticación seguro, persistencia del estado de usuario, y una interfaz intuitiva para organizar el trabajo diario.

El proyecto se basa en una arquitectura modular, aprovechando Pinia para el manejo global del estado y Supabase como backend que provee autenticación y base de datos en tiempo real.

⚙️ Tecnologías utilizadas
Vue 3 – Framework frontend moderno y reactivo.

Pinia – Gestión global del estado de la aplicación con persistencia.

pinia-plugin-persistedstate – Para guardar el estado del usuario en localStorage.

Vue Router – Navegación entre vistas.

Supabase – Backend as a Service para autenticación y base de datos PostgreSQL.

HTML5 & CSS3 – Estructura y estilos responsivos.

📁 Estructura del proyecto
src/main.js: Punto de entrada donde se configuran Vue, Pinia, router y plugins.

src/store/user.js: Pinia store para manejo del usuario, autenticación y persistencia.

src/services/task.js: Funciones para manipular tareas (obtener, actualizar, eliminar) usando Supabase.

src/components/Footer.vue: Componente footer simple con estilo propio.

src/router/index.js: Definición de rutas para las vistas de la aplicación.

src/App.vue y demás componentes UI que componen la interfaz.

🧩 Características destacadas
Autenticación completa: Registro, inicio y cierre de sesión con manejo de errores.

Persistencia de sesión: Estado del usuario guardado automáticamente para mantener la sesión activa.

CRUD de tareas: Crear, editar, eliminar y marcar tareas como completadas o pendientes.

Ordenamiento dinámico: Listado de tareas ordenado por fecha u otros criterios.

Interfaz limpia y accesible: Diseño sencillo y claro con componentes reutilizables.

Integración en tiempo real con Supabase, facilitando futuras mejoras para sincronización instantánea.

Manejo asíncrono con Promesas: Todas las interacciones con Supabase usan funciones asíncronas y manejo de promesas con async/await para controlar flujos de datos y errores de manera eficiente.

🔧 Control de versiones
El proyecto se gestiona con Git y está alojado en un repositorio público de GitHub, lo que permite:

Historial detallado de cambios para mantener un seguimiento claro de modificaciones.

Colaboración eficiente mediante pull requests y revisión de código.

Branching estratégico para nuevas funcionalidades y correcciones sin afectar la rama principal.

Despliegue continuo facilitado por integraciones con plataformas como Netlify o Vercel (opcional).

Puedes clonar el repositorio ejecutando:

bash
Copiar
Editar
git clone https://github.com/tu-usuario/taskify.git
y seguir el flujo habitual de commits y pushes para contribuir o modificar el proyecto.

🚀 Estado del proyecto
Este proyecto se encuentra finalizado y funcional, listo para usarse como base para aplicaciones de gestión de tareas con autenticación y backend moderno.

👨‍💻 Autor
Desarrollado por Matías Morales en 2025 como proyecto personal para profundizar en Vue 3, Pinia y Supabase.

📄 Licencia
Este proyecto se desarrolla con fines educativos y no posee licencia específica.

¡Gracias por visitar Taskify! Para dudas, sugerencias o colaboración, no dudes en contactarme.