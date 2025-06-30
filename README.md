# 💎 My Precious Spa - API REST de Inventario de Joyas

Proyecto backend en **Node.js + Express + PostgreSQL** que implementa una API REST para manejar el inventario de una tienda de joyas.

## ⚛️ Tecnologías

- Node.js
- Express.js
- PostgreSQL
- dotenv
- CORS
- Consultas parametrizadas (anti SQL Injection)

## ⚙️ Configuración

1. Clona el repositorio:

```bash
git clone https://github.com/FranciscoArce92/my_precious_spa.git
cd my_precious_spa
npm install
```
2. Instala dependencias:

```bash
npm install
```

3. Crea un archivo .env con tus credenciales de PostgreSQL:

```ini
PORT=3000
DB_USER=postgres
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_NAME=joyas
DB_PORT=5432
```

4. Ejecuta el servidor:
```bash
npm run start
```

🗄️ Estructura de la base de datos
```sql
CREATE DATABASE joyas;
\c joyas;

CREATE TABLE inventario (
  id SERIAL,
  nombre VARCHAR(50),
  categoria VARCHAR(50),
  metal VARCHAR(50),
  precio INT,
  stock INT
);

INSERT INTO inventario VALUES
(DEFAULT, 'Collar Heart', 'collar', 'oro', 20000 , 2),
(DEFAULT, 'Collar History', 'collar', 'plata', 15000 , 5),
(DEFAULT, 'Aros Berry', 'aros', 'oro', 12000 , 10),
(DEFAULT, 'Aros Hook Blue', 'aros', 'oro', 25000 , 4),
(DEFAULT, 'Anillo Wish', 'aros', 'plata', 30000 , 4),
(DEFAULT, 'Anillo Cuarzo Greece', 'anillo', 'oro', 40000 , 2);
```

## 🧪 Endpoints

📍 GET /joyas
Devuelve una estructura HATEOAS con las joyas del inventario.

Parámetros query:

limits: cantidad de resultados por página (ej. ?limits=3)

page: página deseada (ej. ?page=2)

order_by: campo y orden, separados por _ (ej. precio_DESC, stock_ASC)

![image](https://github.com/user-attachments/assets/df513321-6a29-4ca5-99de-08b2b2508309)

📍 GET /joyas/filtros
Filtra joyas por distintos parámetros usando consultas parametrizadas.

Parámetros query:
precio_min: precio mínimo

precio_max: precio máximo

categoria: filtra por tipo (ej. aros, collar)

metal: filtra por metal (ej. oro, plata)

![image](https://github.com/user-attachments/assets/bda2ce4c-583f-440e-8253-6f1e18c73412)


## 📜 Middlewares
El middleware logger registra en consola cada vez que se consulta una ruta, con hora, método y URL:

```css
[2025-06-09T20:10:00.123Z] Consulta a: GET /joyas
```

## 🛡️ Seguridad

Se usan consultas parametrizadas para evitar inyección SQL.

Todos los endpoints están dentro de bloques try/catch para capturar errores.

## 📬 Autor

Desarrollado por Francisco Arce

Proyecto educativo con Node.js + PostgreSQL
