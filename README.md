# Landing · AG Casco Histórico de Puente Alto

Página de presentación de la agrupación. **Estática y autocontenida**: HTML, CSS
y nada más. Sin backend, sin base de datos, sin JavaScript, sin build. Corre en
cualquier hosting.

No es una copia del sistema de socios ni se conecta a él. Es una página de
presentación independiente: quiénes somos, qué hacemos, de dónde venimos y cómo
contactarnos.

## Qué contiene

```
public_html/            ← esto es lo que se sube a Hostinger
├── index.html          la página (10 KB)
├── 404.html            página de error
├── .htaccess           HTTPS, caché, cabeceras de seguridad
├── robots.txt
├── sitemap.xml
├── favicon.svg
├── assets/             emblema e íconos
└── css/
    └── estilos.css     la hoja de estilos (10 KB)
```

**156 KB en total, 9 archivos.** De esos, 111 KB son el emblema.

## Cómo subirlo a Hostinger

1. Entra a hPanel → **Administrador de archivos**.
2. Abre `public_html` y borra el `default.php` o `index.html` de ejemplo.
3. Sube **lo que hay dentro** de la carpeta `public_html/` de este proyecto, no
   la carpeta misma. Si subes la carpeta, el sitio te queda en
   `tudominio.cl/public_html/`.
4. Activa **Mostrar archivos ocultos** y confirma que `.htaccess` subió. Empieza
   con punto, así que muchos programas lo esconden. Sin él pierdes el HTTPS
   forzado, la página 404 propia, las cabeceras de seguridad y la caché.

## Antes de publicar: poner el dominio real

Tres archivos traen `TU-DOMINIO.cl` como marcador:

| Archivo | Qué cambiar |
|---|---|
| `index.html` | `canonical`, `og:url`, `og:image` y el bloque JSON-LD |
| `robots.txt` | la línea `Sitemap:` |
| `sitemap.xml` | la etiqueta `<loc>` |

## Decisiones de diseño

- **Sin JavaScript.** El menú de celular se resuelve con CSS: los cuatro enlaces
  se envuelven bajo el logo. No hace falta botón de hamburguesa.
- **Sin formulario de contacto.** Un formulario necesita servidor. En su lugar
  hay enlaces directos a WhatsApp y correo, que es lo que la agrupación ya usa.
- **El emblema se sirve en WebP.** El PNG original pesaba 2,47 MB; en WebP a
  620 px pesa 111 KB.
- **Tipografías desde Google Fonts.** Cinzel, Cormorant Garamond y Source Sans 3.
  Es la única dependencia externa de la página.

## Si más adelante quieres un formulario

Hostinger permite PHP, así que se puede: hace falta un `contacto.php` que reciba
el formulario, lo valide, mande el correo y filtre bots. Son unas pocas decenas
de líneas.
