# Capítulo 1: Manual de marca

Identidad de **Canela** (pastelería artesanal). El detalle de colores, tipografías y uso está en [00_Guia_de_Diseno_Web.md](./00_Guia_de_Diseno_Web.md); este capítulo resume lo esencial.

## 1. Elementos gráficos

El logotipo "CANELA" (letras pesadas) y la mascota (conejo en un molde) son arte gráfico, no fuentes. Archivos en `src/assets/`:

| Archivo | Uso |
|---|---|
| `logo_canela.png` | Barra superior (30 px de alto). |
| `logo_mascota_canela.png` | Bloque Inicio. |
| `mascota_canela.png` | Bloque Nosotros. |

Los tres traen incrustado el fondo avena `#EDE4DA`. Para usarlos sobre otros fondos hace falta una versión SVG o PNG transparente.

## 2. Paleta

Avena `#EDE4DA` (fondo), crema `#F4F0ED` (superficies), lavanda `#CAA6CE` (logo y espacios de foto), lila `#A07FA5` (contornos), lila profundo `#705873` (texto en lila), azul profundo `#2A3E82` (titulares, botones, pie), carbón `#1D1D1B` (texto), línea `#D9CCC0` (bordes).

## 3. Tipografías

Todas salen del kit de Adobe Fonts `coc2fgk`, cargado en `index.html`:

```html
<link rel="stylesheet" href="https://use.typekit.net/coc2fgk.css">
```

| Rol | Familia |
|---|---|
| Títulos y nombres de producto (peso 700) | `optima-nova-lt-pro` |
| Cuerpo, botones, navegación | `gotham` |
| Frase de marca | `felt-tip-woman` |
| Cierre "Hecho en Argentina" | `optima-nova-lt-pro-cond` |

`coyote` no se usa en la web. El kit solo trae pesos 400 y 700. No se usan fuentes de Google ni otras fuentes fuera del kit. El dominio `canelaelaborados.com.ar` (y `localhost` para desarrollo) deben estar autorizados en el kit, en fonts.adobe.com.
