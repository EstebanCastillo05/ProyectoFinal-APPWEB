CREATE TABLE my_friends (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  gender VARCHAR(10)
);

CREATE OR REPLACE FUNCTION notify_my_friends_update() 
RETURNS TRIGGER AS $$
BEGIN
  -- Verificamos si el evento es de tipo DELETE, UPDATE o INSERT
  IF (TG_OP = 'DELETE') THEN
    -- Para DELETE, usamos OLD para obtener los valores eliminados
    PERFORM pg_notify(
      'my_friends_update', 
      json_build_object('operation', TG_OP, 'old', row_to_json(OLD))::text
    );
  ELSIF (TG_OP = 'UPDATE') THEN
    -- Para UPDATE, usamos OLD para obtener el valor anterior y NEW para el nuevo valor
    PERFORM pg_notify(
      'my_friends_update', 
      json_build_object('operation', TG_OP, 'old', row_to_json(OLD), 'new', row_to_json(NEW))::text
    );
  ELSIF (TG_OP = 'INSERT') THEN
    -- Para INSERT, solo usamos NEW
    PERFORM pg_notify(
      'my_friends_update', 
      json_build_object('operation', TG_OP, 'new', row_to_json(NEW))::text
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER my_friends_update_trigger
AFTER INSERT OR UPDATE OR DELETE ON my_friends
FOR EACH ROW
EXECUTE FUNCTION notify_my_friends_update();