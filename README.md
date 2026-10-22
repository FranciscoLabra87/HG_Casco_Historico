# Landing · AG Casco Histórico · para Hostinger

Sitio estático de presentación. **No tiene backend**: es HTML, CSS y JS que
corre en cualquier hosting. El sistema de socios sigue viviendo en Cloudflare
(`chbeta.pages.dev`) y esta landing solo enlaza hacia allá.

## Qué subir

Todo el contenido de **`public_html/`** va dentro de la carpeta `public_html`
de Hostinger. No subas la carpeta `public_html` completa: sube lo que hay
*dentro* de ella, o te queda el sitio en `tudominio.cl/public_html/`.

```
public_html/
├── index.html          la landing
├── 404.html            página de error
├── .htaccess           HTTPS, caché, cabeceras de seguridad
├── robots.txt
├── sitemap.xml
├── favicon.svg
├── assets/             logo e íconos
├── css/                hoja de estilos del sitio
└── js/                 menú y animación de scroll
```

Pesa 280 KB en total.

## Cómo subirlo

1. Entra a hPanel → **Administrador de archivos**.
2. Abre `public_html` y borra el `default.php` o `index.html` de ejemplo si está.
3. Arrastra todos los archivos y carpetas de este `public_html/`.
4. Activa **Mostrar archivos ocultos** para confirmar que `.htaccess` subió.
   Si no lo ves, no subió: ese archivo empieza con punto y muchos programas
   lo esconden.

## Antes de publicar: reemplazar el dominio

Tres archivos traen `TU-DOMINIO.cl` como marcador. Cámbialo por tu dominio real:

| Archivo | Qué cambiar |
|---|---|
| `index.html` | `<link rel="canonical">` y `og:url` |
| `robots.txt` | la línea `Sitemap:` |
| `sitemap.xml` | la etiqueta `<loc>` |

Si no lo haces, Google puede entender que el contenido pertenece a otro sitio.

## Qué se sacó de la portada original

La landing se generó desde la portada del sistema, recortando lo que necesita
base de datos:

- **Agenda de eventos.** Se alimentaba de `/api/contenido`. Ahora hay un enlace
  a la agenda real en el sistema.
- **Formulario de contacto.** Hacía `POST` a `/api/contacto`. Lo reemplazan los
  botones de WhatsApp y correo, que es lo que la agrupación ya usa.
- **La PWA** (instalación como app y modo sin conexión). Pertenece al sistema.

Todo lo demás es idéntico: quiénes somos, los cuatro pilares, la línea de
tiempo, los comercios destacados, las preguntas frecuentes y el pie.

## Si quieres el formulario de contacto de vuelta

Hostinger sí permite PHP, así que se puede. Hace falta un `contacto.php` que
reciba el formulario y mande el correo, más protección contra bots. Pídelo y
se arma.

## Mantener las dos versiones alineadas

Esta landing es una **copia derivada**. Si cambias un texto en la portada del
sistema, acá no cambia solo. Conviene regenerarla cuando el contenido cambie
de verdad, en vez de editar los dos a mano y que se vayan separando.
