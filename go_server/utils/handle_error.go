package utils

import (
	"log"
)

func Error(err error) {
	if err != nil {
		log.Printf("Error message: %v", err)
		return
	}
}
