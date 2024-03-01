const result = {
    "user": {
        "address": {
            "city": "string",
            "country": "string",
            "line1": "string",
            "line2": "string",
            "location": {
                "latitude": 0,
                "longitude": 0
            },
            "state_province_region": "string",
            "zip_postal_code": "string"
        },
        "auto_billing": true,
        "created_at_ms": "string",
        "dob": "string",
        "id": "string",
        "kyc_errors": [
            "INVALID_ERROR"
        ],
        "kyc_status": "INVALID",
        "legal_name": {
            "first_name": "string",
            "last_name": "string"
        },
        "monitor_credit": true,
        "nickname": "string",
        "picture_url": "string",
        "report_credit": true,
        "shipping": {
            "address": {
                "city": "Palo Alto",
                "country": "United States",
                "line1": "120 Hawthorne Ave",
                "line2": "",
                "location": {
                    "latitude": 0,
                    "longitude": 0
                },
                "state_province_region": "CA",
                "zip_postal_code": "94301"
            },
            "is_confirmed": true,
            "is_validated": true
        },
        "ssn_on_file": "INVALID_SSN_ON_FILE",
        "updated_at_ms": "string"
    }
}

module.exports = result