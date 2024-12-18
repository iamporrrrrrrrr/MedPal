import { neon } from '@neondatabase/serverless';

export async function GET() {
    try {
        // Query all patients from the 'patients' table in Neon
        const sql = neon(process.env.DATABASE_URL);
        const result = await sql`SELECT * FROM patients`;

        // Respond with the list of patients
        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Error fetching patients' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function POST(req) {
    try {
        // Parse the incoming request body to get patient details
        const sql = neon(process.env.DATABASE_URL);
        const { name, sex, dob, medicalInfo, meds,  emptyTubes, log} = await req.json();

        // Insert a new patient into the 'patients' table
        const result = await sql`
            INSERT INTO patients (name, sex, dob, "medicalInfo", meds, "emptyTubes", log) 
            VALUES (${name}, ${sex}, ${dob}, ${medicalInfo}, ${JSON.stringify(meds)}, ${JSON.stringify(emptyTubes)}, ${JSON.stringify(log)})
            RETURNING *;
        `;

        return new Response(JSON.stringify(result[0]), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Error adding patient' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function DELETE(req) {
    try {
        // Parse the incoming request body to get the patient ID
        const sql = neon(process.env.DATABASE_URL);
        const { id } = await req.json();

        // Delete the patient with the specified ID from the 'patients' table
        const result = await sql`
            DELETE FROM patients 
            WHERE id = ${id}
            RETURNING *;
        `;

        if (result.length === 0) {
            return new Response(JSON.stringify({ message: 'Patient not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ message: 'Patient deleted successfully', patient: result[0] }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Error deleting patient' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}


export async function PATCH(req) {
    try {
        // Parse the incoming request body to get updated patient details
        const sql = neon(process.env.DATABASE_URL);
        const { id, name, sex, dob, medicalInfo, meds,  emptyTubes, log} = await req.json();

        // Update the patient with the specified ID
        const result = await sql`
            UPDATE patients
            SET 
                name = ${name},
                sex = ${sex},
                dob = ${dob},
                "medicalInfo" = ${medicalInfo},
                meds = ${JSON.stringify(meds)},
                "emptyTubes" = ${JSON.stringify(emptyTubes)},
                log = ${JSON.stringify(log)}
            WHERE id = ${id}
            RETURNING *;
        `;

        if (result.length === 0) {
            return new Response(JSON.stringify({ message: 'Patient not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ message: 'Patient updated successfully', patient: result[0] }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Error updating patient' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}


