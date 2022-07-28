package api

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"github.com/ettoma/adyen_fe/models"
)

func Create_account_holder(w http.ResponseWriter, r *http.Request) {

	EnableCors(&w)

	if r.Method == "OPTIONS" {
		return
	}

	if r.Method != "POST" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Only POST requests are allowed"))
		log.Printf("Received %s request", r.Method)
	}
	r.Body = http.MaxBytesReader(w, r.Body, 1048576) // 1MB max, prevent malicious requests

	req_body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		w.Write([]byte("Error reading request body"))
		log.Println(err)
		return
	}

	var Create_account_holder_request models.Create_account_holder_request
	err = json.Unmarshal(req_body, &Create_account_holder_request)
	if err != nil {
		w.Write([]byte("Error unmarshalling request body"))
		log.Println(err)
		return
	}

	// url := "https://cal-test.adyen.com/cal/services/Account/v6/createAccountHolder"
	url := "https://httpbin.org/post"
	method := "POST"

	account_holder_code := Create_account_holder_request.Account_holder_code
	country := Create_account_holder_request.Country
	doing_business_as := Create_account_holder_request.Doing_business_as
	legal_business_name := Create_account_holder_request.Legal_business_name
	registration_number := Create_account_holder_request.Registration_number
	shareholder_type := Create_account_holder_request.Shareholder_type
	job_title := Create_account_holder_request.Job_title
	first_name := Create_account_holder_request.First_name
	gender := Create_account_holder_request.Gender
	last_name := Create_account_holder_request.Last_name
	shareholder_email := Create_account_holder_request.Shareholder_email
	email := Create_account_holder_request.Email
	address_country := Create_account_holder_request.Address_country
	web_address := Create_account_holder_request.Web_address

	formatted_json := map[string]any{
		// "legalEntity":       "Business",

		"accountHolderCode": account_holder_code,
		"accountHolderDetails": map[string]any{
			"address": map[string]string{
				"country": country,
			},
			"businessDetails": map[string]any{
				"doingBusinessAs":    doing_business_as,
				"legalBusinessName":  legal_business_name,
				"registrationNumber": registration_number,
			},
			"shareholders": []map[string]any{
				{
					"shareholderType": shareholder_type,
					"jobTitle":        job_title,
					"name": map[string]any{
						"firstName": first_name,
						"gender":    gender,
						"lastName":  last_name,
					},
					"address": map[string]any{
						"country": address_country,
					},
					"email": shareholder_email,
				}},
			"webAddress": web_address,
			"email":      email},
		"processingTier": 1,
		"legalEntity":    "Business"}

	json_data, _ := json.Marshal(formatted_json)
	json_data_string := strings.NewReader(string(json_data))

	client := &http.Client{}
	req, err := http.NewRequest(method, url, json_data_string)

	if err != nil {
		log.Println(err)
		return
	}
	req.Header.Add("x-API-key", "") //! Add your API key here
	req.Header.Add("Content-Type", "application/json")

	res, err := client.Do(req)
	if err != nil {
		log.Println(err)
		return
	}
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		log.Println(err)
		return
	}
	log.Println(string(body))
	log.Println(res.StatusCode)

	//TODO - return response to client (JSON)

	var Adyen_response models.Adyen_account_holder_response
	// write body as json in response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.Unmarshal(body, &Adyen_response)

	log.Print(Adyen_response)
}
