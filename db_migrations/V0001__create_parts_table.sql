CREATE TABLE IF NOT EXISTS t_p72686990_metal_working_landin.parts (
  id SERIAL PRIMARY KEY,
  code TEXT,
  drawing_number TEXT,
  qty_per_pump INTEGER,
  name TEXT NOT NULL,
  dimensions TEXT,
  weight_kg NUMERIC(10,3),
  material TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);