package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
)

func handler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Adyen FE"))

	// url := "https://cal-test.adyen.com/cal/services/Account/v6/createAccountHolder"
	url := "https://httpbin.org/post"
	method := "POST"

	account_holder_code := "convious_demo"
	country := "GB"
	doing_business_as := "Convious"
	legal_business_name := "Convious BV"
	registration_number := "123415"
	shareholder_type := "Controller"
	job_title := "COO"
	first_name := "John"
	gender := "MALE"
	last_name := "Kohn"
	shareholder_email := "testshareholder@convious.com"
	email := "test@convious.com"
	address_country := "NL"
	web_address := "https://www.convious.com"

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
	req.Header.Add("x-API-key", "")
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
}

func main() {
	port := ":8080"

	http.HandleFunc("/", handler)
	log.Printf("Server started at http://localhost%s", port)
	http.ListenAndServe(port, nil)
}
