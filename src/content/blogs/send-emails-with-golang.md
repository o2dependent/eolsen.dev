---
title: Send emails with golang
description: How to send emails easy and cheap with golang.
pubDate: "Jun 25 2024"
heroImage: "/blog-placeholder-2.jpg"
tags:
  - Golang
---

I recently needed to send emails and chose Golang to send them since I've been enjoying the language. It's pretty easy to set up and free if you aren't sending thousands a day. I have another post going over how to make a serverless endpoint for sending your emails in an upcoming blog post.

## Setup

First you will need a GMail account and Golang installed on your machine.

Make sure you have 2FA enabled on your GMail account or you will get an error.

![Manage account option to get to 2FA settings](/send-emails-with-golang/manage-account-2fa.png "Manage account option to get to 2FA settings")
![2FA setting](/send-emails-with-golang/2fa.png "2FA setting")

After enabling 2FA we will enabled IMAP.

![Setting select to get to pop/imap settings](/send-emails-with-golang/setting-to-pop-imap.png "Setting select to get to pop/imap settings")
![Pop/imap settings](/send-emails-with-golang/pop-imap.png "Pop/imap settings")

Then search "App" and select "App Passwords". Then create your app using whatever name you'd like and save the password in the modal.

![Search for app passwords](/send-emails-with-golang/search-app-passwords.png "Search for app passwords")
![App passwords page](/send-emails-with-golang/app-password.png "App passwords page")

## Code

Finally we can move onto making and testing our Golang program. I will be using `os.Getenv()` to get our email and password, but you can just put these in plain variables to make sure you configured your account properly.

```go
package main

import (
	"fmt"
	"log"
	"net/smtp"
	"os"
)

func main() {
	send("<your-testing-email>", "testing", "hello there")
}

func send(to string, subject string, body string) {
	from := os.Getenv("GMAIL_EMAIL")
	password := os.Getenv("GMAIL_PASSWORD")
	if from == "" || password == "" {
		log.Fatal("GMAIL_EMAIL and GMAIL_PASSWORD env vars must be set")
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
		return
	}
	log.Printf("sent")
}

```

If you are interested in how to make your own serverless function for sending emails check out my other blog post about that!
