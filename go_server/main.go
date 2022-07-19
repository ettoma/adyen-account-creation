package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"strings"
)

func handler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Adyen FE"))

	data := url.Values{}
	data.Set("merchantAccount", "")

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

	// r.Header.Add("Content-Type", "application/json")
	// r.Header.Add("Access-Control-Allow-Origin", "*")
	r.Header.Add("x-API-Key", "")

	resp, err := client.Do(r)

	if err != nil {
		log.Fatal(err)
	}

	body, _ := io.ReadAll(resp.Body)

	fmt.Println(resp.Status)
	fmt.Println(string(body))

}

func main() {
	port := ":8080"

	http.HandleFunc("/", handler)
	log.Printf("Server started at http://localhost%s", port)
	http.ListenAndServe(port, nil)
}
