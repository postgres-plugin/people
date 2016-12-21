-- Create trigger
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

CREATE TRIGGER toggleOrgUsers
AFTER
UPDATE ON organisations
FOR EACH ROW
WHEN (OLD.active IS DISTINCT FROM NEW.active)
EXECUTE PROCEDURE toggleOrgUsers();
