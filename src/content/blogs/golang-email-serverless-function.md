---
title: Golang email serverless function
description: How to set up a Vercel serverless function to send emails using GoLang.
pubDate: "Jun 26 2024"
heroImage: "/blog-placeholder-4.jpg"
tags:
  - Golang
---

This will a quick post of mostly code that you can use to set up an email endpoint with Vercel. This is a continuation of my previous post that went through how to set up your email. Feel free to clean it up if you are more experience with GoLang, but it has worked for my use case so I'm happy. Written code is better than none, so give it a try and have fun!

```env
GMAIL_EMAIL="<your-email>"
GMAIL_PASSWORD="<your-email-password>"
API_SECRET="<your-api-secret>"
```

```go
// api/mail/index.go
package handler

import (
	"encoding/json"
	"errors"
	"io"
	"log"
	"net/http"
	"net/smtp"
	"os"
)

type MailResponse struct {
	FailedEmails []Mail `json:"failedEmails"`
}

type Mail struct {
	To      string `json:"to"`
	Subject string `json:"subject"`
	Body    string `json:"body"`
}

type MailBody struct {
	Mail      []Mail `json:"mail"`
	ApiSecret string `json:"apiSecret"`
}

func send(to string, subject string, body string) error {
	from := os.Getenv("GMAIL_EMAIL")
	password := os.Getenv("GMAIL_PASSWORD")
	if from == "" || password == "" {
		log.Fatal("GMAIL_EMAIL and GMAIL_PASSWORD env vars must be set")
		return errors.New("GMAIL_EMAIL and GMAIL_PASSWORD env vars must be set")
	}

	msg := "From: " + from + "\n" +
		"To: " + to + "\n" +
		"Subject: " + subject + "\n\n" +
		body

	err := smtp.SendMail("smtp.gmail.com:587",
		smtp.PlainAuth("", from, password, "smtp.gmail.com"),
		from, []string{to}, []byte(msg))

	if err != nil {
		log.Printf("smtp error: %s", err)
		return err
	}
	return nil
}

func Handler(w http.ResponseWriter, r *http.Request) {
	log.Printf("Request received: %s", r.Method)
	if r.Method != "POST" {
		log.Printf("Invalid request method: %s", r.Method)
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}
	body, _ := io.ReadAll(r.Body)
	var mailBody MailBody
	if err := json.Unmarshal(body, &mailBody); err != nil {
		http.Error(w, "Invalid request body", http.StatusMethodNotAllowed)
		return
	}

	if mailBody.ApiSecret != os.Getenv("API_SECRET") || os.Getenv("API_SECRET") == "" {
		http.Error(w, "Permission denied", http.StatusMethodNotAllowed)
		return
	}

	var failedEmails []Mail

	for _, mail := range mailBody.Mail {

		err := send(mail.To, mail.Subject, mail.Body)
		if err != nil {
			log.Printf("Error sending email: %s", err)
			failedEmails = append(failedEmails, mail)
		}
	}

	json.Marshal(&MailResponse{FailedEmails: failedEmails})
	json.NewEncoder(w).Encode(&MailResponse{FailedEmails: failedEmails})
}

```
