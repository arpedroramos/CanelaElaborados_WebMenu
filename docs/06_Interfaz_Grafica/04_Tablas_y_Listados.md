# Capítulo 4: Tablas y Listados de Datos

Las tablas son un pilar central en **App Canela**, donde se gestionan inventarios, órdenes y fórmulas. 

## 1. Regla de Oro (AGENTS.md)

**Obligatorio:** Todas las tablas de visualización que se construyan deben incluir la opción de ordenar **todas sus columnas** de forma ascendente y descendente haciendo clic en las cabeceras de columna.
No existen excepciones.

## 2. Tecnologías y Herramientas

Para las tablas se usa HTML nativo (`<table>`) con estilos CSS propios de la aplicación. Para manejar la lógica de ordenamiento sin requerir complejas librerías *headless*, se ha desarrollado un hook personalizado llamado `useSortableData`.

## 3. Estructura HTML de la Tabla

Este es el esqueleto estándar que **toda tabla nueva** debe seguir para asegurar la homogeneidad visual:

```html
<div class="table-wrapper">
  <table class="data-table">
    <thead>
      <tr>
        <!-- Checkbox seleccionar todo -->
        <th class="col-selector" style="width: 44px">
          <input type="checkbox" aria-label="Seleccionar todos" />
        </th>

        <!-- Columna de texto ordenable -->
        <th class="col-sortable" data-sort="" data-field="nombre" onclick="requestSort('nombre')">
          Nombre
          <span class="sort-icon" aria-hidden="true">⇅</span>
        </th>

        <!-- Columna numérica ordenable (alineación derecha + mono) -->
        <th class="col-sortable col-number" data-sort="" data-field="precio" onclick="requestSort('precio')">
          Precio
          <span class="sort-icon" aria-hidden="true">⇅</span>
        </th>

        <!-- Columna de acciones (NO ordenable) -->
        <th class="col-actions" style="width: 100px">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr class="data-row">
        <td class="col-selector"><input type="checkbox" /></td>
        <td class="cell-text">Nombre del ítem</td>
        <td class="cell-number">$ 1.250,00</td>
        <td class="col-actions">
          <!-- Action Buttons -->
        </td>
      </tr>
    </tbody>
    <tfoot>
      <!-- Totales/Agregados: font-weight: 700, JetBrains Mono -->
    </tfoot>
  </table>
</div>
```

## 4. Estética y Tokens CSS de Tablas

### 4.1 Variables
```css
:root {
    --table-header-bg:          #ede4da;              /* Warm Linen — thead */
    --table-header-color:       #1d1d1b;              /* Near Black */
    --table-row-bg:             #ffffff;              /* Blanco puro */
    --table-row-hover-bg:       rgba(147,28,71,0.06); /* Crimson Rose 6% — sutil */
    --table-row-selected-bg:    #fcdbb8;              /* Peach Blush — primary fixed */
    --table-border:             #ede4da;              /* Warm Linen — divisores */
    --table-cell-px:            16px;                 /* Padding horizontal de celda */
    --table-row-height:         44px;                 /* Altura de fila de datos */
    --table-sort-icon-default:  rgba(29,29,27,0.30);  /* ⇅ sin orden activo */
    --table-sort-icon-active:   #931c47;              /* ↑↓ columna activa (Crimson Rose) */
}
```

### 4.2 Reglas Visuales Importantes
- **Cabeceras Permanentes (Sticky Header):** El `<thead>` siempre debe tener posición fija (`position: sticky; top: 0; z-index: 2;`).
- **Iconografía de Ordenamiento:** 
  - Default: `⇅` semi-transparente en gris.
  - Ascendente: `↑` en **Crimson Rose**.
  - Descendente: `↓` en **Crimson Rose**.
- **Filas y Striping (Opcional):** Las tablas se basan en fondos blancos separados por `--table-border`. Se puede aplicar un cebrado muy sutil (`bg-black/[0.015]`) en tablas de alta densidad. El hover sobre filas aplica `--table-row-hover-bg`.
- **Datos Numéricos:** Toda columna de valores numéricos debe alinearse a la **derecha**, utilizando la clase `.cell-number` que aplica la fuente `JetBrains Mono` y la regla `font-variant-numeric: tabular-nums`.

## 5. Buscador Unificado y Selección
- **Combobox:** Para listas largas de selección (ej. elegir un ingrediente), no se usa `<select>` nativo. Se usa un combobox (`InlineSearch`) que filtre mientras se escribe.
- **Selección de filas:** Si hay selección masiva, se usa una columna `col-selector` con checkbox. Seleccionar la fila cambia su fondo a `--table-row-selected-bg`. El click en la fila NO debe seleccionar el checkbox por defecto (para evitar errores si se intenta abrir un panel de detalle), solo el clic explícito en el checkbox.
