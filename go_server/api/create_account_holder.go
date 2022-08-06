package api

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"

	"github.com/ettoma/adyen_fe/models"
	"github.com/ettoma/adyen_fe/utils"
)

func Create_account_holder(w http.ResponseWriter, r *http.Request) {

	utils.EnableCors(&w)

	if r.Method == "OPTIONS" {
		return
	}

	if r.Method != "POST" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Only POST requests are allowed"))
		log.Printf("Received %s request", r.Method)
	}
	r.Body = http.MaxBytesReader(w, r.Body, 1048576) // 1MB max, prevent malicious requests

	req_body, err := io.ReadAll(r.Body)
	utils.Error(err)

	var Create_r models.Create_account_holder_request
	err = json.Unmarshal(req_body, &Create_r)
	utils.Error(err)

	url := "https://cal-test.adyen.com/cal/services/Account/v6/createAccountHolder" //! Test environment
	method := "POST"

	account_holder_code := Create_r.Account_holder_code
	country := Create_r.Country
	doing_business_as := Create_r.Doing_business_as
	legal_business_name := Create_r.Legal_business_name
	registration_number := Create_r.Registration_number
	shareholder_type := Create_r.Shareholder_type
	job_title := Create_r.Job_title
	first_name := Create_r.First_name
	gender := Create_r.Gender
	last_name := Create_r.Last_name
	shareholder_email := Create_r.Shareholder_email
	email := Create_r.Email
	address_country := Create_r.Address_country
	web_address := Create_r.Web_address

	formatted_json := map[string]any{
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
		"legalEntity":    "Business",
	}

	parsed_json, err := json.Marshal(formatted_json)

	utils.Error(err)
	json_request := strings.NewReader(string(parsed_json))

	client := &http.Client{}
	req, err := http.NewRequest(method, url, json_request)

	utils.Error(err)

	req.Header.Add("x-API-key", utils.Get_env("TEST_API_KEY")) //! API key from .env
	req.Header.Add("Content-Type", "application/json")

	res, err := client.Do(req)
	utils.Error(err)

	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	utils.Error(err)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(res.StatusCode)

	if res.StatusCode == 200 {
		// Valid request
		log.Printf("Request status: %v", res.Status)
		log.Print(string(body))
		var Adyen_response models.Adyen_account_holder_response_valid
		err = json.Unmarshal(body, &Adyen_response)

		utils.Error(err)

		json_response := map[string]any{
			"success":              true,
			"message":              "Account holder created",
			"pspReference":         Adyen_response.Psp_reference,
			"accountCode":          Adyen_response.Account_code,
			"accountHolderCode":    Adyen_response.Account_holder_code,
			"accountHolderDetails": Adyen_response.Account_holder_details,
			"accountHolderStatus":  Adyen_response.Account_holder_status,
		}

		json_data, err := json.Marshal(json_response)
		utils.Error(err)

		w.Write(json_data)
		log.Printf("Response status: %v \nAccount Holder Created: %v", res.StatusCode, Adyen_response.Account_holder_code)
	}
	// Invalid request
	if res.StatusCode != 200 {
		var Adyen_response models.Adyen_account_holder_response_invalid
		err = json.Unmarshal(body, &Adyen_response)

		utils.Error(err)

		var json_response []map[string]any

		for _, field := range Adyen_response.Invalid_fields {
			error_code := fmt.Sprintf("%d", field.Error_code)
			error_message := field.Error_description
			field_name := fmt.Sprintf("%v", field.FieldType.Field_name)

			json_format := map[string]any{
				"success":      false,
				"errorCode":    error_code,
				"errorMessage": error_message,
				"fieldName":    field_name,
			}

			json_response = append(json_response, json_format)
		}
		json_data, err := json.Marshal(json_response)

		utils.Error(err)

		w.Write(json_data)
		log.Printf("Request failed: %v \nReason: %v", res.StatusCode, Adyen_response.Invalid_fields[0].Error_description)

	}

}
