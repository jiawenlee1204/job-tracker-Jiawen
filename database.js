const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'data.json');

let db = {
  users: [],
  records: []
};

if (fs.existsSync(dbPath)) {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    db = JSON.parse(data);
    console.log('Database loaded from file');
  } catch (err) {
    console.error('Error loading database:', err.message);
  }
} else {
  console.log('New database created');
}

function saveDatabase() {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  } catch (err) {
    console.error('Error saving database:', err.message);
  }
}

const dbInterface = {
  users: {
    create: (userData) => {
      const newUser = {
        id: db.users.length > 0 ? Math.max(...db.users.map(u => u.id)) + 1 : 1,
        ...userData,
        created_at: new Date().toISOString()
      };
      db.users.push(newUser);
      saveDatabase();
      return newUser;
    },
    findByUsername: (username) => {
      return db.users.find(u => u.username === username);
    },
    findById: (id) => {
      return db.users.find(u => u.id === id);
    }
  },
  records: {
    create: (recordData) => {
      const newRecord = {
        id: db.records.length > 0 ? Math.max(...db.records.map(r => r.id)) + 1 : 1,
        ...recordData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      db.records.push(newRecord);
      saveDatabase();
      return newRecord;
    },
    findByUserId: (userId) => {
      return db.records.filter(r => r.user_id === userId);
    },
    findById: (id) => {
      return db.records.find(r => r.id === id);
    },
    update: (id, userId, data) => {
      const index = db.records.findIndex(r => r.id === id && r.user_id === userId);
      if (index !== -1) {
        db.records[index] = {
          ...db.records[index],
          ...data,
          updated_at: new Date().toISOString()
        };
        saveDatabase();
        return db.records[index];
      }
      return null;
    },
    delete: (id, userId) => {
      const index = db.records.findIndex(r => r.id === id && r.user_id === userId);
      if (index !== -1) {
        db.records.splice(index, 1);
        saveDatabase();
        return true;
      }
      return false;
    },
    getStats: (userId) => {
      const userRecords = db.records.filter(r => r.user_id === userId);
      const stats = {
        total: userRecords.length,
        applied: 0,
        笔试: 0,
        一面: 0,
        二面: 0,
        三面: 0,
        offer: 0,
        rejected: 0
      };
      
      userRecords.forEach(record => {
        if (stats.hasOwnProperty(record.status)) {
          stats[record.status]++;
        }
      });
      
      return stats;
    }
  }
};

module.exports = dbInterface;
