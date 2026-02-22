const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');
const drivesData = require('./drives.json');

db.serialize(() => {
  // Clear old table and create it with your exact JSON keys
  db.run(`DROP TABLE IF EXISTS drives`);
  db.run(`CREATE TABLE drives (
    id TEXT PRIMARY KEY, 
    family TEXT, 
    voltage INTEGER, 
    power_kw REAL, 
    Input_Current_a REAL, 
    frame TEXT, 
    type TEXT, 
    harmonics_type TEXT, 
    ip_class TEXT, 
    heat_dissipation_w INTEGER, 
    noise_dba INTEGER
  )`);
  
  // Prepare the insert statement for all 11 columns
  const stmt = db.prepare(`INSERT INTO drives VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  
  for (let d of drivesData) {
    stmt.run(
      d.id, 
      d.family, 
      d.voltage, 
      d.power_kw, 
      d.Input_Current_a, 
      d.frame, 
      d.type, 
      d.harmonics_type, 
      d.ip_class, 
      d.heat_dissipation_w, 
      d.noise_dba
    );
  }
  
  stmt.finalize();
  console.log("Database seeded successfully with your drive data!");
});
