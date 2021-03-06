module.exports = (db) => {
    var flight = {
        "bookable": true,
        "change-policy": [],
        "bookings": [],
        "refunds": [],
        "arrival-airport": "BGW Baghdad International Airport",
        "cancelation-policy": [
            {
                "penalty": 100,
                "classes": [
                    "AC",
                    "AB",
                    "AA",
                    "A0",
                    "A1",
                    "A2",
                    "A3",
                    "A4",
                    "A5",
                    "A6",
                    "A7",
                    "A8",
                    "A9",
                    "A10",
                    "A11",
                    "A12",
                    "A13"
                ],
                "penalty-unit": "%",
                "reference-date": "Reservation Date",
                "before-after": "After",
                "class": "Economy"
            }
        ],
        "created-by-name": "Ibrahim Dakdouk",
        "arrival-airport-tax-usd": 7,
        "canceled-bookings": [],
        "canceled-reservations": [],
        "description": "",
        "cancelable": true,
        "aircraft-capacity": 154,
        "connections": [],
        "booking-policy": [
            {
                "class": "Economy",
                "before-after": "After",
                "reference-date": "Booking Date",
                "classes": [
                    "AC",
                    "AB",
                    "AA",
                    "A0",
                    "A1",
                    "A2",
                    "A3",
                    "A4",
                    "A5",
                    "A6",
                    "A7",
                    "A8",
                    "A9",
                    "A10",
                    "A11",
                    "A12",
                    "A13"
                ]
            }
        ],
        "hand-baggage-kg": 7,
        "departure-airport": "BEY Rafic Hariri International Airport",
        "first-class-classes": [],
        "created-by": "Pc3epyux0mQeFus4YqbO",
        "fees-and-charges-usd": 0,
        "airline": "IF Fly Baghdad",
        "goshow-classes": [],
        "waiting-list-classes": [],
        "sellings": [],
        "departure-time": 78300000,
        "arrival-time": 84300000,
        "active": true,
        "total-flown-seats": 0,
        "departure-airport-tax-usd": 33,
        "total-sold-usd": 0,
        "note": "",
        "arrival-day": 1653782400000,
        "departure-day": 1653782400000,
        "aircraft": "737-700",
        "changeable": false,
        "id": "xs7YqkxMGwr65HoecW2r",
        "flight-number": "IF302",
        "connected": false,
        "reservations": [],
        "creation-date": 1653301512665,
        "status": "Schedualed",
        "business-classes": [],
        "economy-classes": [
            "AC",
            "AB",
            "AA",
            "A0",
            "A1",
            "A2",
            "A3",
            "A4",
            "A5",
            "A6",
            "A7",
            "A8",
            "A9",
            "A10",
            "A11",
            "A12",
            "A13"
        ],
        "total-reserved-seats": 0,
        "total-noshow-seats": 0,
        "total-booked-seats": 0,
        "additional-profit-usd": 0,
        "flight-type": "Charter",
        "total-canceled-seats": 0,
        "flight-duration": "01:40",
        "seats": [
            {
                "class": "Economy",
                "sub-class": "AC",
                "additional-profit-unit": "%",
                "av-seats": 9,
                "additional-profit": 0,
                "seats": 9,
                "commission": 2,
                "pricing": [
                    {
                        "baggage-kg": 30,
                        "chd-base-fare-usd": 85,
                        "trip": "One Way",
                        "adt-base-fare-usd": 100
                    }
                ],
                "group-reserved-seats": 0,
                "commission-unit": "%",
                "individual-reserved-seats": 0,
                "meal-included": true
            },
            {
                "class": "Economy",
                "sub-class": "AB",
                "seats": 9,
                "commission": 2,
                "meal-included": true,
                "pricing": [
                    {
                        "adt-base-fare-usd": 105,
                        "baggage-kg": 30,
                        "trip": "One Way",
                        "chd-base-fare-usd": 90
                    }
                ],
                "commission-unit": "%",
                "additional-profit": 0,
                "addtional-profit-unit": "%",
                "individual-reserved-seats": 0,
                "group-reserved-seats": 0,
                "av-seats": 9
            },
            {
                "class": "Economy",
                "sub-class": "AA",
                "individual-reserved-seats": 0,
                "addtional-profit-unit": "%",
                "pricing": [
                    {
                        "baggage-kg": 30,
                        "adt-base-fare-usd": 110,
                        "chd-base-fare-usd": 95,
                        "trip": "One Way"
                    }
                ],
                "meal-included": true,
                "av-seats": 9,
                "additional-profit": 0,
                "commission": 2,
                "commission-unit": "%",
                "group-reserved-seats": 0,
                "seats": 9
            },
            {
                "class": "Economy",
                "sub-class": "A0",
                "commission": 2,
                "meal-included": true,
                "pricing": [
                    {
                        "trip": "One Way",
                        "chd-base-fare-usd": 100,
                        "baggage-kg": 30,
                        "adt-base-fare-usd": 115
                    }
                ],
                "additional-profit": 0,
                "group-reserved-seats": 0,
                "av-seats": 9,
                "commission-unit": "%",
                "addtional-profit-unit": "%",
                "seats": 9,
                "individual-reserved-seats": 0
            },
            {
                "class": "Economy",
                "sub-class": "A1",
                "pricing": [
                    {
                        "chd-base-fare-usd": 105,
                        "baggage-kg": 30,
                        "adt-base-fare-usd": 120,
                        "trip": "One Way"
                    }
                ],
                "seats": 9,
                "addtional-profit-unit": "%",
                "individual-reserved-seats": 0,
                "meal-included": true,
                "av-seats": 9,
                "commission": 2,
                "additional-profit": 0,
                "commission-unit": "%",
                "group-reserved-seats": 0
            },
            {
                "class": "Economy",
                "sub-class": "A2",
                "meal-included": true,
                "group-reserved-seats": 0,
                "commission-unit": "%",
                "additional-profit": 0,
                "individual-reserved-seats": 0,
                "pricing": [
                    {
                        "baggage-kg": 30,
                        "chd-base-fare-usd": 110,
                        "adt-base-fare-usd": 125,
                        "trip": "One Way"
                    }
                ],
                "addtional-profit-unit": "%",
                "av-seats": 9,
                "commission": 2,
                "seats": 9
            },
            {
                "class": "Economy",
                "sub-class": "A3",
                "group-reserved-seats": 0,
                "av-seats": 9,
                "meal-included": true,
                "pricing": [
                    {
                        "baggage-kg": 30,
                        "adt-base-fare-usd": 130,
                        "trip": "One Way",
                        "chd-base-fare-usd": 115
                    }
                ],
                "addtional-profit-unit": "%",
                "seats": 9,
                "commission": 2,
                "commission-unit": "%",
                "additional-profit": 0,
                "individual-reserved-seats": 0
            },
            {
                "class": "Economy",
                "sub-class": "A4",
                "commission": 2,
                "meal-included": true,
                "commission-unit": "%",
                "individual-reserved-seats": 0,
                "av-seats": 9,
                "additional-profit": 0,
                "pricing": [
                    {
                        "chd-base-fare-usd": 120,
                        "trip": "One Way",
                        "adt-base-fare-usd": 135,
                        "baggage-kg": 30
                    }
                ],
                "group-reserved-seats": 0,
                "addtional-profit-unit": "%",
                "seats": 9
            },
            {
                "class": "Economy",
                "sub-class": "A5",
                "commission": 2,
                "pricing": [
                    {
                        "baggage-kg": 30,
                        "adt-base-fare-usd": 140,
                        "trip": "One Way",
                        "chd-base-fare-usd": 125
                    }
                ],
                "meal-included": true,
                "commission-unit": "%",
                "seats": 9,
                "group-reserved-seats": 0,
                "addtional-profit-unit": "%",
                "av-seats": 9,
                "additional-profit": 0,
                "individual-reserved-seats": 0
            },
            {
                "class": "Economy",
                "sub-class": "A6",
                "individual-reserved-seats": 0,
                "addtional-profit-unit": "%",
                "av-seats": 9,
                "commission-unit": "%",
                "meal-included": true,
                "group-reserved-seats": 0,
                "additional-profit": 0,
                "commission": 2,
                "pricing": [
                    {
                        "trip": "One Way",
                        "adt-base-fare-usd": 145,
                        "chd-base-fare-usd": 130,
                        "baggage-kg": 30
                    }
                ],
                "seats": 9
            },
            {
                "class": "Economy",
                "sub-class": "A7",
                "additional-profit": 0,
                "group-reserved-seats": 0,
                "pricing": [
                    {
                        "chd-base-fare-usd": 135,
                        "adt-base-fare-usd": 150,
                        "baggage-kg": 30,
                        "trip": "One Way"
                    }
                ],
                "individual-reserved-seats": 0,
                "meal-included": true,
                "commission-unit": "%",
                "av-seats": 9,
                "seats": 9,
                "addtional-profit-unit": "%",
                "commission": 2
            },
            {
                "class": "Economy",
                "sub-class": "A8",
                "av-seats": 9,
                "additional-profit": 0,
                "commission-unit": "%",
                "pricing": [
                    {
                        "baggage-kg": 30,
                        "trip": "One Way",
                        "adt-base-fare-usd": 155,
                        "chd-base-fare-usd": 140
                    }
                ],
                "commission": 2,
                "addtional-profit-unit": "%",
                "seats": 9,
                "meal-included": true,
                "group-reserved-seats": 0,
                "individual-reserved-seats": 0
            },
            {
                "class": "Economy",
                "sub-class": "A9",
                "meal-included": true,
                "addtional-profit-unit": "%",
                "commission": 2,
                "additional-profit": 0,
                "av-seats": 9,
                "pricing": [
                    {
                        "trip": "One Way",
                        "chd-base-fare-usd": 145,
                        "adt-base-fare-usd": 160,
                        "baggage-kg": 30
                    }
                ],
                "group-reserved-seats": 0,
                "commission-unit": "%",
                "seats": 9,
                "individual-reserved-seats": 0
            },
            {
                "class": "Economy",
                "sub-class": "A10",
                "seats": 9,
                "addtional-profit-unit": "%",
                "group-reserved-seats": 0,
                "pricing": [
                    {
                        "chd-base-fare-usd": 150,
                        "adt-base-fare-usd": 165,
                        "trip": "One Way",
                        "baggage-kg": 30
                    }
                ],
                "individual-reserved-seats": 0,
                "additional-profit": 0,
                "commission-unit": "%",
                "commission": 2,
                "av-seats": 9,
                "meal-included": true
            },
            {
                "class": "Economy",
                "sub-class": "A11",
                "meal-included": true,
                "av-seats": 9,
                "seats": 9,
                "additional-profit": 0,
                "group-reserved-seats": 0,
                "individual-reserved-seats": 0,
                "commission": 2,
                "commission-unit": "%",
                "pricing": [
                    {
                        "baggage-kg": 30,
                        "chd-base-fare-usd": 155,
                        "adt-base-fare-usd": 170,
                        "trip": "One Way"
                    }
                ],
                "addtional-profit-unit": "%"
            },
            {
                "class": "Economy",
                "sub-class": "A12",
                "commission-unit": "%",
                "pricing": [
                    {
                        "adt-base-fare-usd": 175,
                        "baggage-kg": 30,
                        "chd-base-fare-usd": 160,
                        "trip": "One Way"
                    }
                ],
                "av-seats": 9,
                "group-reserved-seats": 0,
                "meal-included": true,
                "commission": 2,
                "addtional-profit-unit": "%",
                "individual-reserved-seats": 0,
                "additional-profit": 0,
                "seats": 9
            },
            {
                "class": "Economy",
                "sub-class": "A13",
                "pricing": [
                    {
                        "baggage-kg": 30,
                        "adt-base-fare-usd": 180,
                        "trip": "One Way",
                        "chd-base-fare-usd": 165
                    }
                ],
                "commission": 2,
                "individual-reserved-seats": 0,
                "addtional-profit-unit": "%",
                "meal-included": true,
                "av-seats": 9,
                "additional-profit": 0,
                "commission-unit": "%",
                "group-reserved-seats": 0,
                "seats": 9
            }
        ],
        "total-seats": 0
    }

    db.collection("flights-alsabil-tourism").doc("xs7YqkxMGwr65HoecW2r").set(flight).then(() => { console.log("Flight saved succefully!"); })
}