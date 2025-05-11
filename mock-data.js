
const mockPayload = {
    "users": [
        {
            "id": 1,
            "name": "Artur Kasenõmm",
            "email": "artur.kasenomm@example.com",
            "age": 22,
            "address": {
                "street": "Narva mnt 18",
                "city": "Tartu",
                "county": "Tartu maakond",
                "zip": "51009"
            },
            "phone": "372-1234-5678",
            "registered": "2022-03-15",
            "active": true,
            "preferences": {
                "notifications": true,
                "newsletter": false
            }
        },
        {
            "id": 2,
            "name": "Lume Lummetaja",
            "email": "lume.lumm@example.com",
            "age": 41,
            "address": {
                "street": "Ranna tee 2",
                "city": "Pärnu",
                "county": "Pärnu maakond",
                "zip": "80010"
            },
            "phone": "372-5554-3219",
            "registered": "2023-01-22",
            "active": false,
            "preferences": {
                "theme": "system",
                "notifications": false,
                "newsletter": false
            }
        },
        {
            "id": 3,
            "name": "Kala Kalur",
            "email": "kala.kalur@example.com",
            "age": 35,
            "address": {
                "street": "Roosi 13",
                "city": "Viljandi",
                "county": "Viljandi maakond",
                "zip": "71003"
            },
            "phone": "372-5558-7654",
            "registered": "2022-08-03",
            "active": true,
            "preferences": {
                "theme": "light",
                "notifications": true,
                "newsletter": true
            }
        }
    ],
    "metadata": {
        "source": "Mock data for thesis",
        "records": 3,
        "encoding": "UTF-8"
    }
};

const mockPayloadString = JSON.stringify(mockPayload);

module.exports = {
    mockPayload,
    mockPayloadString
};