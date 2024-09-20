package function

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"cloud.google.com/go/firestore"
	"github.com/GoogleCloudPlatform/functions-framework-go/functions"
)

func init() {
	functions.HTTP("SubmitLeetcodeData", submitLeetcodeData)
}

type SubmissionData struct {
	Hours             int     `json:"hours"`
	PercentageWasted  float64 `json:"percentageWasted"`
	YearsExperience   int     `json:"yearsExperience"`
	Alternative       string  `json:"alternative"`
	CustomAlternative *string `json:"customAlternative,omitempty"`
}

func submitLeetcodeData(w http.ResponseWriter, r *http.Request) {
	// Set CORS headers to allow all origins
	w.Header().Set("Access-Control-Allow-Origin", "https://ericxing.com, https://www.ericxing.com, https://legitpanda.github.io")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// Handle preflight requests
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}
	if r.Method != http.MethodPost {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	var data SubmissionData
	if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
		log.Printf("Error decoding request body: %v", err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	ctx := context.Background()
	client, err := firestore.NewClient(ctx, "portfolio-436119")
	if err != nil {
		log.Printf("Error creating Firestore client: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	defer client.Close()

	_, _, err = client.Collection("leetcodeSubmissions").Add(ctx, map[string]interface{}{
		"hours":             data.Hours,
		"percentageWasted":  data.PercentageWasted,
		"yearsExperience":   data.YearsExperience,
		"alternative":       data.Alternative,
		"customAlternative": data.CustomAlternative,
		"timestamp":         time.Now(),
		"ipAddress":         r.Header.Get("X-Forwarded-For"),
	})

	if err != nil {
		log.Printf("Error adding document: %v", err)
		http.Error(w, "Failed to submit data", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Data submitted successfully"})
}
