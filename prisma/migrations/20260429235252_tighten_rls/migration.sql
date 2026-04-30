-- Drop the old 'wide open' policies
DROP POLICY "Users can insert news" ON "News";
DROP POLICY "Users can update news" ON "News";
DROP POLICY "Users can delete news" ON "News";
DROP POLICY "Users can insert galleries" ON "Gallery";
DROP POLICY "Users can update galleries" ON "Gallery";
DROP POLICY "Users can delete galleries" ON "Gallery";

-- Now, only allow 'authenticated' users (admins) to perform these actions.
-- If you only use Prisma for admin tasks, you don't even need to add these,
-- but adding them for 'authenticated' is a good safety net.

CREATE POLICY "Admins can insert news" ON "News" FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admins can update news" ON "News" FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admins can delete news" ON "News" FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admins can insert galleries" ON "Gallery" FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admins can update galleries" ON "Gallery" FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admins can delete galleries" ON "Gallery" FOR DELETE TO authenticated USING (true);
