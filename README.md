# 🎮 Simon Dice PWA (Simon Says Game)

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![PWA](https://img.shields.io/badge/PWA-Ready-success.svg)
![Docker](https://img.shields.io/badge/Docker-Supported-2496ED.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

Una reimaginación moderna y progresiva del clásico juego de memoria "Simon Dice". Desarrollado con estándares web modernos, cuenta con una interfaz oscura "Dark Mode", efectos de neón, lógica orientada a objetos y capacidades PWA completas (instalable y offline).


---

## ✨ Características Principales

- **🕹️ Modos de Juego Dinámicos:** Elige tu meta: 5, 10, 15, 20 niveles o modo **Infinito**.
- **📱 Progressive Web App (PWA):**
  - **Instalable:** Añádelo a la pantalla de inicio de tu móvil o escritorio.
  - **Offline:** Funciona sin conexión a internet gracias al Service Worker.
- **🎨 Diseño Moderno:** Interfaz responsiva con tema oscuro, animaciones fluidas y efectos de iluminación CSS.
- **🔊 Feedback Audiovisual:** Sonidos clásicos sincronizados con la iluminación de los botones.
- **💾 Persistencia:** Sistema optimizado de caché para carga instantánea.

---

## 🛠️ Tecnologías Utilizadas

El proyecto ha sido refactorizado utilizando prácticas de código limpio y moderno:

- **HTML5 Semántico:** Estructura limpia y accesible.
- **CSS3 Moderno:** Variables CSS (`:root`), Flexbox y diseño adaptativo sin frameworks pesados.
- **JavaScript (ES6+):**
  - Programación Orientada a Objetos (Clases).
  - `Async/Await` para manejo de flujos.
  - Módulos nativos.
- **Service Workers:** Estrategia de caché *Cache First* para assets estáticos.
- **SweetAlert2:** Para modales y alertas estéticas.
- **Docker & Nginx:** Contenerización lista para producción.

---

## 🚀 Instalación y Despliegue

### **Opción 1: Ejecución Local**

Clona el repositorio y abre `index.html` en tu navegador.  
Para probar PWA es preferible un servidor local (como Live Server).

```bash
git clone https://github.com/tu-usuario/simon-dice-pwa.git
cd simon-dice-pwa

# Si tienes Python:
python3 -m http.server
```

---

### **Opción 2: Docker (Recomendado)**

El proyecto incluye un Dockerfile optimizado basado en Nginx Alpine.

**Construir la imagen:**

```bash
docker build -t simon-dice .
```

**Correr el contenedor:**

```bash
docker run -d -p 8080:80 --name mi-simon-dice simon-dice
```

**Jugar:**  
http://localhost:8080

---

## 📂 Estructura del Proyecto

```plaintext
/
├── images/               # Iconos para PWA (192px, 512px)
├── sounds/               # Efectos de sonido
├── index.html            # Punto de entrada
├── style.css             # Estilos globales y tema
├── main.js               # Lógica del juego (Clase Juego)
├── sw.js                 # Service Worker (Caché y PWA)
├── manifest.webmanifest  # Configuración de instalación PWA
└── Dockerfile            # Configuración de Nginx
```

---

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Haz un Fork del proyecto.  
2. Crea una rama para tu característica:  
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Haz commit de tus cambios:  
   ```bash
   git commit -m "Add some AmazingFeature"
   ```
4. Haz push a tu rama:  
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Abre un Pull Request.

---

## ✒️ Autor

**Nilson Escobar** – Desarrollo Inicial y Refactorización  
GitHub: **@Escnil994**

⌨️ con ❤️ por Nilson Escobar
