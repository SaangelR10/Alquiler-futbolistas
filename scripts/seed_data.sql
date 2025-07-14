-- Datos de ejemplo para usuarios y perfiles
INSERT INTO usuarios (nombre, email, password, rol, verificado) VALUES
  ('Juan Pérez', 'juan@correo.com', 'hash_password', 'jugador', TRUE),
  ('Carlos López', 'carlos@correo.com', 'hash_password', 'cliente', TRUE);

INSERT INTO perfiles (usuario_id, edad, posicion, experiencia, habilidades, ciudad, tarifa)
VALUES
  (1, 28, 'Delantero', 'Profesional', 'Velocidad, remate, regate', 'Madrid', 50.00);

INSERT INTO reservas (cliente_id, jugador_id, fecha, estado)
VALUES
  (2, 1, '2024-07-20 18:00:00', 'pendiente'); 