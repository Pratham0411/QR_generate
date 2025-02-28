

// backend/db.js

const fs = require('fs');  
const { pool } = require('./config'); 
const path = require('path'); // Ensure path module is included
const QRCode = require('qrcode'); // Import the qrcode library

async function checkAndAddMachine(id) {
    let conn;
    try {
        conn = await pool.getConnection();

        console.log(`Checking machine with ID: ${id}`); 

        id = String(id);  

        const result = await conn.query('SELECT * FROM machines WHERE id = ?', [id]);

        if (result.length > 0) {
            return "ID exists in the database.";
        } else {
            // Get the count of machines from the database
            const countResult = await conn.query('SELECT COUNT(*) as count FROM machines');

            // const machineNumber = countResult[0].count + 1;  // Calculate next machine number
            const machineNumber = Number(countResult[0].count) + 1;  // Explicitly convert to number

            const machineName = `machine_${machineNumber}`;  // Create the machine name

            // Generate the QR code for the machine
            const qrCode = await generateQRCode(id, machineName);

            // Insert the new machine into the database
            await conn.query('INSERT INTO machines (id, name, qr_code) VALUES (?, ?, ?)', [id, machineName, qrCode]);

            return `New machine added with ID: ${id} and Name: ${machineName}`;
        }
    } catch (error) {
        console.error("Database Error:", error);  // Log the database error
        throw new Error(error.message);
    } finally {
        if (conn) conn.release();  // Ensure the connection is always released
    }
}

async function generateQRCode(id, name) {
    try {
        const qrDir = path.join(__dirname, 'qr'); 

        if (!fs.existsSync(qrDir)) {
            fs.mkdirSync(qrDir, { recursive: true }); 
        }

        const qrCodePath = path.join(qrDir, `${name}.png`);  

        await QRCode.toFile(qrCodePath, id, {
            width: 150,
            margin: 1,
        });

        return qrCodePath;  
    } catch (error) {
        console.error("QR Code Generation Error:", error); 
        throw new Error("Failed to generate QR code.");
    }
}

module.exports = { checkAndAddMachine };













