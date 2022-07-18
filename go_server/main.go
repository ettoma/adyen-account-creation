package main

import (
	"fmt"
	"log"
	"net/http"
	"net/url"
	"strings"
)

func handler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Adyen FE"))

	data := url.Values{}
	data.Set("merchantAccount", "")

	// client := &http.Client{}

	r, err := http.NewRequest(http.MethodPost, "https://cal-test.adyen.com/cal/services/Account/v6/createAccountHolder", strings.NewReader((data.Encode())))

	if err != nil {
		log.Fatal(err)
	}

	r.Header.Add("Content-Type", "application/json")
	r.Header.Add("Access-Control-Allow-Origin", "*")
	r.Header.Add("x-API-Key", "")

	resp, _ := http.DefaultClient.Do(r)

	fmt.Println(r.Header)
	fmt.Println(resp.Body)

}

func main() {
	port := ":8080"

	http.HandleFunc("/", handler)
	log.Printf("Server started at http://localhost%s", port)
	http.ListenAndServe(port, nil)
}
