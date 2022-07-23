data1 := map[string]any{
	"accountHolderCode": "convious_demo",
	"accountHolderDetails": map[string]any{
		"address": map[string]any{
			"country": "asdhsdas", //! <-- invalid country
		},
		"businessDetails": map[string]any{
			"doingBusinessAs":    "Convious",
			"legalBusinessName":  "Convious BV",
			"registrationNumber": "123456789",
			"shareholders": []map[string]any{
				{
					"shareholderType": "business",
					"jobTitle":        "COO",
					"name": map[string]any{
						"firstName": "John",
						"gender":    "MALE",
						"lastName":  "Kohn",
					},
					"address": map[string]any{
						"country": "NL",
					},
					"email": "support@convious.com",
				},
			},
			"email":      "support@convious.com",
			"webAddress": "www.convious.com",
		},
		"legalEntity":    "Business",
		"processingTier": 1,
	},
}

// convert data1 into url.Values{}
data2, _ := json.Marshal(data1)
data3 := strings.NewReader(string(data2))

client := &http.Client{}

r, err := http.NewRequest(http.MethodPost, "https://cal-test.adyen.com/cal/services/Account/v6/createAccountHolder", data3)

if err != nil {
	log.Fatal(err)
}

r.Header.Set("x-API-Key", "AQEuhmfxL4/MbxdHw0exgG89s9SXSYhIQ7BFVnNfyW24+/F+wIOIQ7gnf8VWD1vJWhDBXVsNvuR83LVYjEgiTGAH-2AdH4tSncBxsC783RTZmdPffgDzWF1zEY1gIeq2OPt8=-u#,?AxwaWJJC&Dw7")

resp, err := client.Do(r)

if err != nil {
	log.Fatal(err)
}

// body, _ := io.ReadAll(resp.Body)

fmt.Println(resp.Status)
// fmt.Println(resp.Header)
fmt.Println(resp.Request)
// fmt.Println(string(body))

//! ------------------------------------------------------------
payload := strings.NewReader(`{
    "accountHolderCode": "youseum_se",
    "accountHolderDetails": {
        "address": {
            "country": "SE"
        },
        "businessDetails": {
            "doingBusinessAs": "Youseum",
            "legalBusinessName": "Youseum AB",
            "registrationNumber": "559360-5297",
            "shareholders": [
                {
                    "shareholderType": "Controller",
                    "jobTitle": "COO",
                    "name": {
                        "firstName": "JOEP",
                        "gender": "MALE",
                        "lastName": "HEUSSCHEN"
                    },
                    "address": {
                        "country": "NL"
                    },
                    "email": "joep@youseum.art"
                }
            ]
        },
        "email": "joep@youseum.art",
        "webAddress": "https://youseum.se/"
    },
    "legalEntity": "Business",
    "processingTier": 1
}`)

//! ------------------------------------------------------------

payload := strings.NewReader(`{
	"accountHolderCode": "convious_demo",
	"accountHolderDetails": {
		"address": {
			"country": "asdhsdas",
		},
		"businessDetails": {
			"doingBusinessAs":    "Convious",
			"legalBusinessName":  "Convious BV",
			"registrationNumber": "123456789",
			"shareholders": {
				{
					"shareholderType": "business",
					"jobTitle":        "COO",
					"name": {
						"firstName": "John",
						"gender":    "MALE",
						"lastName":  "Kohn",
					},
					"address": {
						"country": "NL",
					},
					"email": "support@convious.com",
				},
			},
			"email":      "support@convious.com",
			"webAddress": "www.convious.com",
		},
		"legalEntity":    "Business",
		"processingTier": 1,
}`)

//! ------------------------------------------------------------
, map[string]any{
	"businessDetails": map[string]any{
		"doingBusinessAs":    doing_business_as,
		"legalBusinessName":  legal_business_name,
		"registrationNumber": registration_number,
		"shareholders": []map[string]any{
			{
				"shareholderType": "Controller",
				"jobTitle":        job_title,
				"name": map[string]string{
					"firstName": first_name,
					"gender":    gender,
					"lastName":  last_name,
				},
				"address": map[string]string{
					"country": address_country,
				},
				"email": shareholder_email,
			},
		},
		"email":      email,
		"webAddress": web_address,
	},
	"legalEntity":    legal_entity,
	"processingTier": 1,
},
}

//! ------------------------------------------------------------
doing_business_as := "Convious"
legal_business_name := "Convious BV"
registration_number := "123415"
job_title := "COO"
first_name := ""
gender := "MALE"
last_name := "Kohn"
shareholder_email := "shareholder@convious.com"
email := "support@convious.com"
address_country := "NL"
web_address := "https://www.convious.com"
legal_entity := "Business"
