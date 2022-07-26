package api

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
)

type Response struct {
	Account_holder_code string `json:"accountHolderCode"`
	Country             string `json:"countryAccount"`
	Doing_business_as   string `json:"doingBusinessAs"`
	Legal_business_name string `json:"legalBusinessName"`
	Registration_number string `json:"registrationNumber"`
	Shareholder_type    string `json:"shareholderType"`
	Job_title           string `json:"jobTitle"`
	First_name          string `json:"firstName"`
	Gender              string `json:"gender"`
	Last_name           string `json:"lastName"`
	Shareholder_email   string `json:"shareholderEmail"`
	Email               string `json:"email"`
	Address_country     string `json:"addressCountry"`
	Web_address         string `json:"webAddress"`
}

func Create_account_holder(w http.ResponseWriter, r *http.Request) {

	EnableCors(&w)

	if r.Method == "GET" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Only POST requests are allowed"))
		log.Fatalf("Received %s request", r.Method)
	}
	r.Body = http.MaxBytesReader(w, r.Body, 1048576)

	if r.Method == "POST" {
		req_body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			log.Println(err)
			w.Write([]byte("Error reading request body"))
			return
		}

		var response Response
		err = json.Unmarshal(req_body, &response)
		if err != nil {
			log.Println(err)
			w.Write([]byte("Error unmarshalling request body"))
			return
		}

		// url := "https://cal-test.adyen.com/cal/services/Account/v6/createAccountHolder"
		url := "https://httpbin.org/post"
		method := "POST"

		account_holder_code := response.Account_holder_code
		country := response.Country
		doing_business_as := response.Doing_business_as
		legal_business_name := response.Legal_business_name
		registration_number := response.Registration_number
		shareholder_type := response.Shareholder_type
		job_title := response.Job_title
		first_name := response.First_name
		gender := response.Gender
		last_name := response.Last_name
		shareholder_email := response.Shareholder_email
		email := response.Email
		address_country := response.Address_country
		web_address := response.Web_address

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
			fmt.Println(err)
			return
		}
		req.Header.Add("x-API-key", "") //! Add your API key here
		req.Header.Add("Content-Type", "application/json")

		res, err := client.Do(req)
		if err != nil {
			fmt.Println(err)
			return
		}
		defer res.Body.Close()

		body, err := ioutil.ReadAll(res.Body)
		if err != nil {
			fmt.Println(err)
			return
		}
		fmt.Println(string(body))
		fmt.Println(res.StatusCode)

		w.Write(([]byte("Successfully created account holder")))
	}

}
