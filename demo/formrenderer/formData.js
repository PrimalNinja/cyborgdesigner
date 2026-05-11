// formData.js
// Sample form definitions from Cyborg Designer

var objFormConnote = [
    {
        "id": "section-connote-header",
        "caption": "Form Header",
        "visible": false,
        "containers": [
            {
                "id": "container-connote-header",
                "type": "verticalcontainer",
                "caption": "Form Header Container",
                "name": "FORMHEADER",
                "label": "Form Header",
                "visible": true,
                "children": [
                    {
                        "id": "field-connote-entity",
                        "type": "textbox",
                        "caption": "Entity Name",
                        "label": "Entity Name",
                        "name": "ENTITYNAME",
                        "value": "Connote",
                        "visible": true,
                        "container": false
                    },
                    {
                        "id": "field-connote-formver",
                        "type": "number",
                        "caption": "Form Version",
                        "label": "Form Version",
                        "name": "FORMVERSION",
                        "value": "1",
                        "visible": true,
                        "container": false
                    }
                ]
            }
        ]
    },
    {
        "id": "section-connote-basic",
        "caption": "Connote Details",
        "visible": true,
        "containers": [
            {
                "id": "container-connote-basic",
                "type": "verticalcontainer",
                "caption": "Basic Information",
                "name": "CONNOTEBASIC",
                "label": "Connote Information",
                "visible": true,
                "children": [
                    {
                        "id": "field-connote-number",
                        "type": "textbox",
                        "caption": "Connote Number",
                        "label": "Connote Number",
                        "name": "CONNOTENUMBER",
                        "required": true,
                        "readonly": true,
                        "visible": true,
                        "container": false
                    },
                    {
                        "id": "field-connote-date",
                        "type": "date",
                        "caption": "Connote Date",
                        "label": "Connote Date",
                        "name": "CONNOTEDATE",
                        "required": true,
                        "visible": true,
                        "container": false
                    },
                    {
                        "id": "field-connote-customerref",
                        "type": "textbox",
                        "caption": "Customer Reference",
                        "label": "Customer Reference",
                        "name": "CUSTOMERREFERENCE",
                        "visible": true,
                        "container": false
                    },
                    {
                        "id": "field-connote-carrier",
                        "type": "list",
                        "caption": "Carrier",
                        "label": "Carrier",
                        "name": "CARRIERCODE",
                        "required": true,
                        "datasource": "Carriers",
                        "datafilter": "ISENABLED=yes",
                        "visible": true,
                        "container": false
                    },
                    {
                        "id": "field-connote-service",
                        "type": "list",
                        "caption": "Service",
                        "label": "Service",
                        "name": "SERVICECODE",
                        "required": true,
                        "datasource": "Services",
                        "datafilter": "CARRIERCODE={CARRIERCODE} AND ISENABLED=yes",
                        "visible": true,
                        "container": false
                    }
                ]
            }
        ]
    },
    {
        "id": "section-connote-parties",
        "caption": "Parties",
        "visible": true,
        "containers": [
            {
                "id": "container-connote-parties",
                "type": "horizontalcontainer",
                "caption": "Sender and Receiver",
                "name": "CONNOTEPARTIES",
                "visible": true,
                "children": [
                    {
                        "id": "container-connote-sender",
                        "type": "verticalcontainer",
                        "caption": "Sender",
                        "name": "CONNOTESENDER",
                        "visible": true,
                        "children": [
                            {
                                "id": "field-connote-sendercode",
                                "type": "list",
                                "caption": "Sender",
                                "label": "Sender",
                                "name": "SENDERCODE",
                                "required": true,
                                "datasource": "Senders",
                                "datafilter": "ISENABLED=yes",
                                "visible": true,
                                "container": false
                            }
                        ]
                    },
                    {
                        "id": "container-connote-receiver",
                        "type": "verticalcontainer",
                        "caption": "Receiver",
                        "name": "CONNOTERECEIVER",
                        "visible": true,
                        "children": [
                            {
                                "id": "field-connote-receivercode",
                                "type": "list",
                                "caption": "Receiver",
                                "label": "Receiver",
                                "name": "RECEIVERCODE",
                                "required": true,
                                "datasource": "Receivers",
                                "datafilter": "ISENABLED=yes",
                                "visible": true,
                                "container": false
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "section-connote-payment",
        "caption": "Payment Details",
        "visible": true,
        "containers": [
            {
                "id": "container-connote-payment",
                "type": "verticalcontainer",
                "caption": "Payment Information",
                "name": "CONNOTEPAYMENT",
                "label": "Payment",
                "visible": true,
                "children": [
                    {
                        "id": "field-connote-paymenttype",
                        "type": "list",
                        "caption": "Payment Type",
                        "label": "Payment Type",
                        "name": "PAYMENTTYPE",
                        "required": true,
                        "visible": true,
                        "options": [
                            {
                                "value": "SENDER",
                                "code": "SENDER",
                                "description": "Sender Pays"
                            },
                            {
                                "value": "RECEIVER",
                                "code": "RECEIVER",
                                "description": "Receiver Pays"
                            },
                            {
                                "value": "THIRDPARTY",
                                "code": "THIRDPARTY",
                                "description": "Third Party Pays"
                            }
                        ],
                        "container": false
                    },
                    {
                        "id": "field-connote-freightcharge",
                        "type": "number",
                        "caption": "Freight Charge",
                        "label": "Freight Charge",
                        "name": "FREIGHTCHARGE",
                        "visible": true,
                        "container": false
                    },
                    {
                        "id": "field-connote-fuellevy",
                        "type": "number",
                        "caption": "Fuel Levy",
                        "label": "Fuel Levy",
                        "name": "FUELLEVY",
                        "visible": true,
                        "container": false
                    },
                    {
                        "id": "field-connote-totalcharge",
                        "type": "number",
                        "caption": "Total Charge",
                        "label": "Total Charge",
                        "name": "TOTALCHARGE",
                        "readonly": true,
                        "visible": true,
                        "container": false
                    }
                ]
            }
        ]
    },
    {
        "id": "section-connote-items",
        "caption": "Items",
        "visible": true,
        "containers": [
            {
                "id": "container-connote-items",
                "type": "verticalcontainer",
                "caption": "Item Details",
                "name": "CONNOTEITEMS",
                "label": "Items",
                "visible": true,
                "children": [
                    {
                        "id": "field-connote-pieces",
                        "type": "number",
                        "caption": "Number of Pieces",
                        "label": "Number of Pieces",
                        "name": "NUMBEROFPIECES",
                        "required": true,
                        "visible": true,
                        "container": false
                    },
                    {
                        "id": "field-connote-weight",
                        "type": "number",
                        "caption": "Total Weight (kg)",
                        "label": "Total Weight (kg)",
                        "name": "TOTALWEIGHT",
                        "required": true,
                        "visible": true,
                        "container": false
                    },
                    {
                        "id": "field-connote-volume",
                        "type": "number",
                        "caption": "Total Volume (m³)",
                        "label": "Total Volume (m³)",
                        "name": "TOTALVOLUME",
                        "visible": true,
                        "container": false
                    },
                    {
                        "id": "field-connote-description",
                        "type": "multilinetextbox",
                        "caption": "Item Description",
                        "label": "Item Description",
                        "name": "ITEMDESCRIPTION",
                        "required": true,
                        "visible": true,
                        "container": false
                    },
                    {
                        "id": "field-connote-dangerous",
                        "type": "checkbox",
                        "caption": "Dangerous Goods?",
                        "label": "Dangerous Goods?",
                        "name": "ISDANGEROUS",
                        "visible": true,
                        "container": false
                    },
                    {
                        "id": "field-connote-specialinst",
                        "type": "multilinetextbox",
                        "caption": "Special Instructions",
                        "label": "Special Instructions",
                        "name": "SPECIALINSTRUCTIONS",
                        "visible": true,
                        "container": false
                    }
                ]
            }
        ]
    },
    {
        "id": "section-connote-status",
        "caption": "Status",
        "visible": true,
        "containers": [
            {
                "id": "container-connote-status",
                "type": "verticalcontainer",
                "caption": "Status Information",
                "name": "CONNOTESTATUS",
                "label": "Status",
                "visible": true,
                "children": [
                    {
                        "id": "field-connote-status",
                        "type": "list",
                        "caption": "Status",
                        "label": "Status",
                        "name": "STATUS",
                        "required": true,
                        "value": "CREATED",
                        "visible": true,
                        "options": [
                            {
                                "value": "CREATED",
                                "code": "CREATED",
                                "description": "Created"
                            },
                            {
                                "value": "BOOKED",
                                "code": "BOOKED",
                                "description": "Booked"
                            },
                            {
                                "value": "PICKEDUP",
                                "code": "PICKEDUP",
                                "description": "Picked Up"
                            },
                            {
                                "value": "INTRANSIT",
                                "code": "INTRANSIT",
                                "description": "In Transit"
                            },
                            {
                                "value": "DELIVERED",
                                "code": "DELIVERED",
                                "description": "Delivered"
                            },
                            {
                                "value": "CANCELLED",
                                "code": "CANCELLED",
                                "description": "Cancelled"
                            }
                        ],
                        "container": false
                    }
                ]
            }
        ]
    }
];

var objFormBooking = [
    {
        "id": "section-form-header",
        "caption": "Form Header",
        "visible": false,
        "containers": [
            {
                "id": "container-form-header",
                "type": "verticalcontainer",
                "caption": "Form Header Container",
                "name": "FORMHEADER",
                "label": "Form Header",
                "visible": true,
                "children": [
                    {
                        "id": "field-entity-name",
                        "type": "textbox",
                        "caption": "Entity Name",
                        "label": "Entity Name",
                        "name": "ENTITYNAME",
                        "value": "Software Agency",
                        "visible": true,
                        "container": false
                    },
                    {
                        "id": "field-form-version",
                        "type": "number",
                        "caption": "Form Version",
                        "label": "Form Version",
                        "name": "FORMVERSION",
                        "value": "1",
                        "visible": true,
                        "container": false
                    }
                ]
            }
        ]
    },
    {
        "id": "section-agency-info",
        "caption": "Agency Information",
        "visible": true,
        "containers": [
            {
                "id": "container-agency-info",
                "type": "verticalcontainer",
                "caption": "Agency Information Container",
                "name": "AGENCYINFO",
                "label": "Agency Information",
                "visible": true,
                "children": [
                    {
                        "id": "field-agency-name",
                        "type": "textbox",
                        "caption": "Agency Name",
                        "label": "Agency Name",
                        "name": "AGENCYNAME",
                        "required": true,
                        "visible": true,
                        "container": false
                    },
                    {
                        "id": "field-agency-abn",
                        "type": "textbox",
                        "caption": "ABN",
                        "label": "ABN",
                        "name": "ABN",
                        "visible": true,
                        "container": false
                    },
                    {
                        "id": "field-agency-acn",
                        "type": "textbox",
                        "caption": "ACN",
                        "label": "ACN",
                        "name": "ACN",
                        "visible": true,
                        "container": false
                    },
                    {
                        "id": "field-agency-email",
                        "type": "textbox",
                        "caption": "Email",
                        "label": "Email",
                        "name": "EMAIL",
                        "visible": true,
                        "container": false
                    },
                    {
                        "id": "field-agency-phone",
                        "type": "textbox",
                        "caption": "Phone",
                        "label": "Phone",
                        "name": "PHONE",
                        "visible": true,
                        "container": false
                    },
                    {
                        "id": "field-agency-mobile",
                        "type": "textbox",
                        "caption": "Mobile",
                        "label": "Mobile",
                        "name": "MOBILE",
                        "visible": true,
                        "container": false
                    },
                    {
                        "id": "field-agency-website",
                        "type": "url",
                        "caption": "Website",
                        "label": "Website",
                        "name": "WEBSITE",
                        "visible": true,
                        "container": false
                    }
                ]
            }
        ]
    },
    {
        "id": "section-project-details",
        "caption": "Project Details",
        "visible": true,
        "containers": [
            {
                "id": "container-project-details",
                "type": "verticalcontainer",
                "caption": "Project Details Container",
                "name": "PROJECTDETAILS",
                "label": "Project Details",
                "visible": true,
                "children": [
                    {
                        "id": "field-project-name",
                        "type": "textbox",
                        "caption": "Project Name",
                        "label": "Project Name",
                        "name": "PROJECTNAME",
                        "required": true,
                        "visible": true,
                        "container": false
                    },
                    {
                        "id": "field-project-description",
                        "type": "multilinetextbox",
                        "caption": "Project Description",
                        "label": "Project Description",
                        "name": "PROJECTDESCRIPTION",
                        "visible": true,
                        "container": false
                    },
                    {
                        "id": "field-start-date",
                        "type": "date",
                        "caption": "Start Date",
                        "label": "Start Date",
                        "name": "STARTDATE",
                        "visible": true,
                        "container": false
                    },
                    {
                        "id": "field-end-date",
                        "type": "date",
                        "caption": "End Date",
                        "label": "End Date",
                        "name": "ENDDATE",
                        "visible": true,
                        "container": false
                    },
                    {
                        "id": "field-project-manager",
                        "type": "textbox",
                        "caption": "Project Manager",
                        "label": "Project Manager",
                        "name": "PROJECTMANAGER",
                        "visible": true,
                        "container": false
                    }
                ]
            }
        ]
    },
    {
        "id": "section-client-info",
        "caption": "Client Information",
        "visible": true,
        "containers": [
            {
                "id": "container-client-info",
                "type": "verticalcontainer",
                "caption": "Client Information Container",
                "name": "CLIENTINFO",
                "label": "Client Information",
                "visible": true,
                "children": [
                    {
                        "id": "field-client-name",
                        "type": "textbox",
                        "caption": "Client Name",
                        "label": "Client Name",
                        "name": "CLIENTNAME",
                        "required": true,
                        "visible": true,
                        "container": false
                    },
                    {
                        "id": "field-client-email",
                        "type": "textbox",
                        "caption": "Client Email",
                        "label": "Client Email",
                        "name": "CLIENTEMAIL",
                        "visible": true,
                        "container": false
                    },
                    {
                        "id": "field-client-phone",
                        "type": "textbox",
                        "caption": "Client Phone",
                        "label": "Client Phone",
                        "name": "CLIENTPHONE",
                        "visible": true,
                        "container": false
                    }
                ]
            }
        ]
    },
    {
        "id": "section-form-actions",
        "caption": "Form Actions",
        "visible": true,
        "containers": [
            {
                "id": "container-form-actions",
                "type": "horizontalcontainer",
                "caption": "Form Actions Container",
                "name": "FORMACTIONS",
                "label": "Form Actions",
                "visible": true,
                "children": [
                    {
                        "id": "field-submit",
                        "type": "button",
                        "caption": "Submit",
                        "label": "Submit",
                        "name": "SUBMIT",
                        "visible": true,
                        "container": false
                    }
                ]
            }
        ]
    }
];

var objFormTracking = [
    {
        "id": "section-tracking-header",
        "caption": "Form Header",
        "visible": false,
        "containers": [
            {
                "id": "container-tracking-header",
                "type": "verticalcontainer",
                "caption": "Form Header Container",
                "name": "FORMHEADER",
                "label": "Form Header",
                "visible": true,
                "children": [
                    {
                        "id": "field-tracking-entity",
                        "type": "textbox",
                        "caption": "Entity Name",
                        "label": "Entity Name",
                        "name": "ENTITYNAME",
                        "value": "Tracking",
                        "visible": true,
                        "container": false
                    },
                    {
                        "id": "field-tracking-formver",
                        "type": "number",
                        "caption": "Form Version",
                        "label": "Form Version",
                        "name": "FORMVERSION",
                        "value": "1",
                        "visible": true,
                        "container": false
                    }
                ]
            }
        ]
    },
    {
        "id": "section-tracking-data",
        "caption": "Tracking Information",
        "visible": true,
        "containers": [
            {
                "id": "container-tracking-basic",
                "type": "verticalcontainer",
                "caption": "Basic Information",
                "name": "TRACKINGBASIC",
                "label": "Tracking Details",
                "visible": true,
                "children": [
                    {
                        "id": "field-tracking-id",
                        "type": "textbox",
                        "caption": "Tracking ID",
                        "label": "Tracking ID",
                        "name": "TRACKINGID",
                        "required": true,
                        "readonly": true,
                        "visible": true,
                        "container": false
                    },
                    {
                        "id": "field-tracking-connote",
                        "type": "textbox",
                        "caption": "Connote Number",
                        "label": "Connote Number",
                        "name": "CONNOTENUMBER",
                        "required": true,
                        "visible": true,
                        "container": false
                    },
                    {
                        "id": "field-tracking-datetime",
                        "type": "date",
                        "caption": "Date/Time",
                        "label": "Date/Time",
                        "name": "TRACKINGDATETIME",
                        "required": true,
                        "visible": true,
                        "container": false
                    },
                    {
                        "id": "field-tracking-location",
                        "type": "textbox",
                        "caption": "Location",
                        "label": "Location",
                        "name": "LOCATION",
                        "visible": true,
                        "container": false
                    },
                    {
                        "id": "field-tracking-notes",
                        "type": "multilinetextbox",
                        "caption": "Notes",
                        "label": "Notes",
                        "name": "TRACKINGNOTES",
                        "visible": true,
                        "container": false
                    },
                    {
                        "id": "field-tracking-gps",
                        "type": "gps",
                        "caption": "GPS Coordinates",
                        "label": "GPS Coordinates",
                        "name": "GPSCOORDINATES",
                        "visible": true,
                        "container": false
                    }
                ]
            }
        ]
    }
];