-- Enable RLS
ALTER TABLE "News" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Gallery" ENABLE ROW LEVEL SECURITY;

-- Policies for News
CREATE POLICY "Users can view all news" ON "News"
    FOR SELECT
    USING (true);

CREATE POLICY "Users can insert news" ON "News"
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Users can update news" ON "News"
    FOR UPDATE
    USING (true);

CREATE POLICY "Users can delete news" ON "News"
    FOR DELETE
    USING (true);

-- Policies for Gallery
CREATE POLICY "Users can view all galleries" ON "Gallery"
    FOR SELECT
    USING (true);

CREATE POLICY "Users can insert galleries" ON "Gallery"
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Users can update galleries" ON "Gallery"
    FOR UPDATE
    USING (true);

CREATE POLICY "Users can delete galleries" ON "Gallery"
    FOR DELETE
    USING (true);