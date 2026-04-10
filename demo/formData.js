// formData.js
// Sample form definitions from Cyborg Designer

var objFormConnote = [
    {
        "id": "section-connote-header",
        "caption": "Form Header",
        "containers": [
            {
                "id": "container-connote-header",
                "type": "verticalcontainer",
                "caption": "Form Header Container",
                "name": "FORMHEADER",
                "label": "Form Header",
                "children": [
                    {
                        "id": "field-connote-entity",
                        "type": "textbox",
                        "caption": "Entity Name",
                        "label": "Entity Name",
                        "name": "ENTITYNAME",
                        "value": "Connote",
                        "container": false
                    },
                    {
                        "id": "field-connote-formver",
                        "type": "number",
                        "caption": "Form Version",
                        "label": "Form Version",
                        "name": "FORMVERSION",
                        "value": "1",
                        "container": false
                    }
                ]
            }
        ]
    },
    {
        "id": "section-connote-basic",
        "caption": "Connote Details",
        "containers": [
            {
                "id": "container-connote-basic",
                "type": "verticalcontainer",
                "caption": "Basic Information",
                "name": "CONNOTEBASIC",
                "label": "Connote Information",
                "children": [
                    {
                        "id": "field-connote-number",
                        "type": "textbox",
                        "caption": "Connote Number",
                        "label": "Connote Number",
                        "name": "CONNOTENUMBER",
                        "required": "yes",
                        "readonly": "yes",
                        "container": false
                    },
                    {
                        "id": "field-connote-date",
                        "type": "date",
                        "caption": "Connote Date",
                        "label": "Connote Date",
                        "name": "CONNOTEDATE",
                        "required": "yes",
                        "container": false
                    },
                    {
                        "id": "field-connote-customerref",
                        "type": "textbox",
                        "caption": "Customer Reference",
                        "label": "Customer Reference",
                        "name": "CUSTOMERREFERENCE",
                        "container": false
                    },
                    {
                        "id": "field-connote-carrier",
                        "type": "list",
                        "caption": "Carrier",
                        "label": "Carrier",
                        "name": "CARRIERCODE",
                        "required": "yes",
                        "datasource": "Carriers",
                        "datafilter": "ISENABLED=yes",
                        "container": false
                    },
                    {
                        "id": "field-connote-service",
                        "type": "list",
                        "caption": "Service",
                        "label": "Service",
                        "name": "SERVICECODE",
                        "required": "yes",
                        "datasource": "Services",
                        "datafilter": "CARRIERCODE={CARRIERCODE} AND ISENABLED=yes",
                        "container": false
                    }
                ]
            }
        ]
    },
    {
        "id": "section-connote-parties",
        "caption": "Parties",
        "containers": [
            {
                "id": "container-connote-parties",
                "type": "horizontalcontainer",
                "caption": "Sender and Receiver",
                "name": "CONNOTEPARTIES",
                "children": [
                    {
                        "id": "container-connote-sender",
                        "type": "verticalcontainer",
                        "caption": "Sender",
                        "name": "CONNOTESENDER",
                        "children": [
                            {
                                "id": "field-connote-sendercode",
                                "type": "list",
                                "caption": "Sender",
                                "label": "Sender",
                                "name": "SENDERCODE",
                                "required": "yes",
                                "datasource": "Senders",
                                "datafilter": "ISENABLED=yes",
                                "container": false
                            }
                        ]
                    },
                    {
                        "id": "container-connote-receiver",
                        "type": "verticalcontainer",
                        "caption": "Receiver",
                        "name": "CONNOTERECEIVER",
                        "children": [
                            {
                                "id": "field-connote-receivercode",
                                "type": "list",
                                "caption": "Receiver",
                                "label": "Receiver",
                                "name": "RECEIVERCODE",
                                "required": "yes",
                                "datasource": "Receivers",
                                "datafilter": "ISENABLED=yes",
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
        "containers": [
            {
                "id": "container-connote-payment",
                "type": "verticalcontainer",
                "caption": "Payment Information",
                "name": "CONNOTEPAYMENT",
                "label": "Payment",
                "children": [
                    {
                        "id": "field-connote-paymenttype",
                        "type": "list",
                        "caption": "Payment Type",
                        "label": "Payment Type",
                        "name": "PAYMENTTYPE",
                        "required": "yes",
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
                        "container": false
                    },
                    {
                        "id": "field-connote-fuellevy",
                        "type": "number",
                        "caption": "Fuel Levy",
                        "label": "Fuel Levy",
                        "name": "FUELLEVY",
                        "container": false
                    },
                    {
                        "id": "field-connote-totalcharge",
                        "type": "number",
                        "caption": "Total Charge",
                        "label": "Total Charge",
                        "name": "TOTALCHARGE",
                        "readonly": "yes",
                        "container": false
                    }
                ]
            }
        ]
    },
    {
        "id": "section-connote-items",
        "caption": "Items",
        "containers": [
            {
                "id": "container-connote-items",
                "type": "verticalcontainer",
                "caption": "Item Details",
                "name": "CONNOTEITEMS",
                "label": "Items",
                "children": [
                    {
                        "id": "field-connote-pieces",
                        "type": "number",
                        "caption": "Number of Pieces",
                        "label": "Number of Pieces",
                        "name": "NUMBEROFPIECES",
                        "required": "yes",
                        "container": false
                    },
                    {
                        "id": "field-connote-weight",
                        "type": "number",
                        "caption": "Total Weight (kg)",
                        "label": "Total Weight (kg)",
                        "name": "TOTALWEIGHT",
                        "required": "yes",
                        "container": false
                    },
                    {
                        "id": "field-connote-volume",
                        "type": "number",
                        "caption": "Total Volume (m³)",
                        "label": "Total Volume (m³)",
                        "name": "TOTALVOLUME",
                        "container": false
                    },
                    {
                        "id": "field-connote-description",
                        "type": "multilinetextbox",
                        "caption": "Item Description",
                        "label": "Item Description",
                        "name": "ITEMDESCRIPTION",
                        "required": "yes",
                        "container": false
                    },
                    {
                        "id": "field-connote-dangerous",
                        "type": "checkbox",
                        "caption": "Dangerous Goods?",
                        "label": "Dangerous Goods?",
                        "name": "ISDANGEROUS",
                        "container": false
                    },
                    {
                        "id": "field-connote-specialinst",
                        "type": "multilinetextbox",
                        "caption": "Special Instructions",
                        "label": "Special Instructions",
                        "name": "SPECIALINSTRUCTIONS",
                        "container": false
                    }
                ]
            }
        ]
    },
    {
        "id": "section-connote-status",
        "caption": "Status",
        "containers": [
            {
                "id": "container-connote-status",
                "type": "verticalcontainer",
                "caption": "Status Information",
                "name": "CONNOTESTATUS",
                "label": "Status",
                "children": [
                    {
                        "id": "field-connote-status",
                        "type": "list",
                        "caption": "Status",
                        "label": "Status",
                        "name": "STATUS",
                        "required": "yes",
                        "value": "CREATED",
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
        "containers": [
            {
                "id": "container-form-header",
                "type": "verticalcontainer",
                "caption": "Form Header Container",
                "name": "FORMHEADER",
                "label": "Form Header",
                "children": [
                    {
                        "id": "field-entity-name",
                        "type": "textbox",
                        "caption": "Entity Name",
                        "label": "Entity Name",
                        "name": "ENTITYNAME",
                        "value": "Software Agency",
                        "container": false
                    },
                    {
                        "id": "field-form-version",
                        "type": "number",
                        "caption": "Form Version",
                        "label": "Form Version",
                        "name": "FORMVERSION",
                        "value": "1",
                        "container": false
                    }
                ]
            }
        ]
    },
    {
        "id": "section-agency-info",
        "caption": "Agency Information",
        "containers": [
            {
                "id": "container-agency-info",
                "type": "verticalcontainer",
                "caption": "Agency Information Container",
                "name": "AGENCYINFO",
                "label": "Agency Information",
                "children": [
                    {
                        "id": "field-agency-name",
                        "type": "textbox",
                        "caption": "Agency Name",
                        "label": "Agency Name",
                        "name": "AGENCYNAME",
                        "required": "yes",
                        "container": false
                    },
                    {
                        "id": "field-agency-abn",
                        "type": "textbox",
                        "caption": "ABN",
                        "label": "ABN",
                        "name": "ABN",
                        "container": false
                    },
                    {
                        "id": "field-agency-acn",
                        "type": "textbox",
                        "caption": "ACN",
                        "label": "ACN",
                        "name": "ACN",
                        "container": false
                    },
                    {
                        "id": "field-agency-email",
                        "type": "textbox",
                        "caption": "Email",
                        "label": "Email",
                        "name": "EMAIL",
                        "container": false
                    },
                    {
                        "id": "field-agency-phone",
                        "type": "textbox",
                        "caption": "Phone",
                        "label": "Phone",
                        "name": "PHONE",
                        "container": false
                    },
                    {
                        "id": "field-agency-mobile",
                        "type": "textbox",
                        "caption": "Mobile",
                        "label": "Mobile",
                        "name": "MOBILE",
                        "container": false
                    },
                    {
                        "id": "field-agency-website",
                        "type": "url",
                        "caption": "Website",
                        "label": "Website",
                        "name": "WEBSITE",
                        "container": false
                    }
                ]
            }
        ]
    },
    {
        "id": "section-project-details",
        "caption": "Project Details",
        "containers": [
            {
                "id": "container-project-details",
                "type": "verticalcontainer",
                "caption": "Project Details Container",
                "name": "PROJECTDETAILS",
                "label": "Project Details",
                "children": [
                    {
                        "id": "field-project-name",
                        "type": "textbox",
                        "caption": "Project Name",
                        "label": "Project Name",
                        "name": "PROJECTNAME",
                        "required": "yes",
                        "container": false
                    },
                    {
                        "id": "field-project-description",
                        "type": "multilinetextbox",
                        "caption": "Project Description",
                        "label": "Project Description",
                        "name": "PROJECTDESCRIPTION",
                        "container": false
                    },
                    {
                        "id": "field-start-date",
                        "type": "date",
                        "caption": "Start Date",
                        "label": "Start Date",
                        "name": "STARTDATE",
                        "container": false
                    },
                    {
                        "id": "field-end-date",
                        "type": "date",
                        "caption": "End Date",
                        "label": "End Date",
                        "name": "ENDDATE",
                        "container": false
                    },
                    {
                        "id": "field-project-manager",
                        "type": "textbox",
                        "caption": "Project Manager",
                        "label": "Project Manager",
                        "name": "PROJECTMANAGER",
                        "container": false
                    }
                ]
            }
        ]
    },
    {
        "id": "section-client-info",
        "caption": "Client Information",
        "containers": [
            {
                "id": "container-client-info",
                "type": "verticalcontainer",
                "caption": "Client Information Container",
                "name": "CLIENTINFO",
                "label": "Client Information",
                "children": [
                    {
                        "id": "field-client-name",
                        "type": "textbox",
                        "caption": "Client Name",
                        "label": "Client Name",
                        "name": "CLIENTNAME",
                        "required": "yes",
                        "container": false
                    },
                    {
                        "id": "field-client-email",
                        "type": "textbox",
                        "caption": "Client Email",
                        "label": "Client Email",
                        "name": "CLIENTEMAIL",
                        "container": false
                    },
                    {
                        "id": "field-client-phone",
                        "type": "textbox",
                        "caption": "Client Phone",
                        "label": "Client Phone",
                        "name": "CLIENTPHONE",
                        "container": false
                    }
                ]
            }
        ]
    },
    {
        "id": "section-form-actions",
        "caption": "Form Actions",
        "containers": [
            {
                "id": "container-form-actions",
                "type": "horizontalcontainer",
                "caption": "Form Actions Container",
                "name": "FORMACTIONS",
                "label": "Form Actions",
                "children": [
                    {
                        "id": "field-submit",
                        "type": "button",
                        "caption": "Submit",
                        "label": "Submit",
                        "name": "SUBMIT",
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
        "containers": [
            {
                "id": "container-tracking-header",
                "type": "verticalcontainer",
                "caption": "Form Header Container",
                "name": "FORMHEADER",
                "label": "Form Header",
                "children": [
                    {
                        "id": "field-tracking-entity",
                        "type": "textbox",
                        "caption": "Entity Name",
                        "label": "Entity Name",
                        "name": "ENTITYNAME",
                        "value": "Tracking",
                        "container": false
                    },
                    {
                        "id": "field-tracking-formver",
                        "type": "number",
                        "caption": "Form Version",
                        "label": "Form Version",
                        "name": "FORMVERSION",
                        "value": "1",
                        "container": false
                    }
                ]
            }
        ]
    },
    {
        "id": "section-tracking-data",
        "caption": "Tracking Information",
        "containers": [
            {
                "id": "container-tracking-basic",
                "type": "verticalcontainer",
                "caption": "Basic Information",
                "name": "TRACKINGBASIC",
                "label": "Tracking Details",
                "children": [
                    {
                        "id": "field-tracking-id",
                        "type": "textbox",
                        "caption": "Tracking ID",
                        "label": "Tracking ID",
                        "name": "TRACKINGID",
                        "required": "yes",
                        "readonly": "yes",
                        "container": false
                    },
                    {
                        "id": "field-tracking-connote",
                        "type": "textbox",
                        "caption": "Connote Number",
                        "label": "Connote Number",
                        "name": "CONNOTENUMBER",
                        "required": "yes",
                        "container": false
                    },
                    {
                        "id": "field-tracking-datetime",
                        "type": "date",
                        "caption": "Date/Time",
                        "label": "Date/Time",
                        "name": "TRACKINGDATETIME",
                        "required": "yes",
                        "container": false
                    },
                    {
                        "id": "field-tracking-location",
                        "type": "textbox",
                        "caption": "Location",
                        "label": "Location",
                        "name": "LOCATION",
                        "container": false
                    },
                    {
                        "id": "field-tracking-notes",
                        "type": "multilinetextbox",
                        "caption": "Notes",
                        "label": "Notes",
                        "name": "TRACKINGNOTES",
                        "container": false
                    },
                    {
                        "id": "field-tracking-gps",
                        "type": "gps",
                        "caption": "GPS Coordinates",
                        "label": "GPS Coordinates",
                        "name": "GPSCOORDINATES",
                        "container": false
                    }
                ]
            }
        ]
    }
];