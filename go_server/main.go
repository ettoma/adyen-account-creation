package main

import (
	"log"
	"net/http"

	"github.com/ettoma/adyen_fe/api"
)

func main() {
	port := ":8080"

	http.HandleFunc("/createAccountHolder", api.Create_account_holder)
	log.Printf("Server started at http://localhost%s", port)
	http.ListenAndServe(port, nil)
}
