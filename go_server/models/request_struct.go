package models

type Create_account_holder_request struct {
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

type Adyen_account_holder_response struct {
	Invalid_fields []string `json:"invalidFields"`
}

type Create_store_request struct {
	Store_code string `json:"storeCode"`
}
