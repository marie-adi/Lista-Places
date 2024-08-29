
# 🌍 ¡Bienvenido a **Lugares a Visitar**! 
✈️ Con esta api fake se puede mantener un registro de todos esos sitios que planeas visitar. 
Además, puedes marcar como visitados aquellos lugares que ya has tachado de tu lista y eliminar los que cambiaste por un nuevo destino.🌟

## 🚀 Instalación y Configuración

Sigue estos sencillos pasos.

### 1. 🧰 Pre-requisitos

Antes de comenzar, asegúrate de tener lo siguiente instalado en tu máquina:

- **Node.js** y **npm**: Node.js es el entorno de ejecución necesario para que el servidor funcione. npm es el gestor de paquetes de Node.js que utilizaremos para instalar dependencias.
  
  Puedes descargarlo [aquí](https://nodejs.org/).

- **json-server**: Es una herramienta que te permite simular una API REST rápidamente. Lo utilizaremos para manejar los datos de los lugares que planeas visitar.

### 2. 📂 Clona este Repositorio

Primero, clona este repositorio en tu máquina local:

```bash
git clone https://github.com/tuusuario/lugares-a-visitar.git
cd lugares-a-visitar
```

### 3. 📦 Instalación de Dependencias

Instala las dependencias necesarias con npm:

```bash
npm install
```
Instála globalmente JSON server con el siguiente comando:

```bash
npm install -g json-server
npm run api
```
Ahora tu aplicación debería estar corriendo en `http://localhost:8000`. Abre tu navegador y empieza a visualizarlo.

### 4. 🗄️ Configura json-server
Este proyecto utiliza json-server para simular una API REST, lo que nos permite manejar los datos de los lugares a visitar. Para configurar json-server, sigue estos pasos:

Crea un archivo db.json en la raíz del proyecto (si no está ya creado):

```bash
{
  "placesToVisit": []
}
```
Inicia json-server para que sirva la API:

```bash
json-server --watch db.json --port 8000
```
Esto levantará un servidor en http://localhost:8000 que servirá el contenido de db.json.

5. 🏁 Inicia la Aplicación
Con json-server corriendo. En una nueva terminal, inicia el servidor local:

```bash
npm run api
```











