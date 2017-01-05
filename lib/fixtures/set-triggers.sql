-- Delete triggers
DROP TRIGGER IF EXISTS toggleOrgUsers on organisations;

-- Create procedures
CREATE OR REPLACE FUNCTION toggleOrgUsers()
RETURNS TRIGGER AS
$BODY$
  BEGIN
    UPDATE people
    SET active = NOT people.active
    WHERE org_id = OLD.id;

    RETURN NEW;
  END;
$BODY$
LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER toggleOrgUsers
AFTER
UPDATE ON organisations
FOR EACH ROW
WHEN (OLD.active IS DISTINCT FROM NEW.active AND OLD.active = TRUE)
EXECUTE PROCEDURE toggleOrgUsers();
